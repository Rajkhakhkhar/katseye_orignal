import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import laraCheetahBaseColor from '../../assets/room/lara/lara-cheetah-carpet-reference.jpg';

// These are architectural detail maps, not close-up product textures. A
// smaller resolution materially reduces room-entry work while preserving the
// imperceptible grain visible at gallery viewing distances.
const MAP_SIZE = 256;

const surfaceProfiles = {
  floor: { base: [102, 109, 117], variation: 17, roughness: 138, repeat: [3.2, 8.5] },
  ceiling: { base: [146, 151, 156], variation: 9, roughness: 194, repeat: [3.4, 8.5] },
  wall: { base: [120, 127, 135], variation: 14, roughness: 180, repeat: [7.8, 2.2] },
};

// Each surface deliberately uses a different scale and UV transform. That
// keeps the same carpet family wrapping the room without reading as one flat
// repeated wallpaper tile.
const laraProfiles = {
  // One source material, adjusted per physical plane so it reads as continuous
  // upholstered short-pile carpet instead of a repeated wallpaper tile.
  floor: { repeat: [.94, 2.04], offset: [.13, .19], rotation: -.018, color: '#241c1d', roughness: .985, bumpScale: .024, detail: .56 },
  ceiling: { repeat: [.94, 2.04], offset: [.41, .27], rotation: .012, color: '#171316', roughness: .99, bumpScale: .016, detail: .34 },
  wall: { repeat: [1.48, .64], offset: [.31, .26], rotation: -.009, color: '#4a3328', roughness: .965, bumpScale: .016, detail: .42 },
  backWall: { repeat: [.82, .9], offset: [.2, .12], rotation: 0, color: '#261a17', roughness: .985, bumpScale: .018, detail: .4 },
};

const memberMaterialProfiles = Object.freeze({
  'sophia-luxury': Object.freeze({
    floor: { color: '#2c170e', roughness: .34 },
    ceiling: { color: '#4b2d1d', roughness: .5 },
    wall: { color: '#e8dbc4', roughness: .68 },
    backWall: { color: '#3a2419', roughness: .5 },
  }),
  'sophia-ivory': Object.freeze({
    floor: { color: '#3d281d', roughness: .52 },
    ceiling: { color: '#f4e6ce', roughness: .82 },
    wall: { color: '#ead8bb', roughness: .74 },
    backWall: { color: '#4a3023', roughness: .62 },
  }),
  'daniela-burgundy': Object.freeze({
    floor: { color: '#120c0e', roughness: .44 },
    ceiling: { color: '#231216', roughness: .66 },
    wall: { color: '#642631', roughness: .58 },
    backWall: { color: '#180d10', roughness: .52 },
  }),
  'megan-charcoal': Object.freeze({
    floor: { color: '#17191c', roughness: .42 },
    ceiling: { color: '#30343a', roughness: .54 },
    wall: { color: '#3b3f45', roughness: .48 },
    backWall: { color: '#16191d', roughness: .44 },
  }),
  'manon-concrete': Object.freeze({
    floor: { color: '#202124', roughness: .8 },
    ceiling: { color: '#2c2e31', roughness: .9 },
    wall: { color: '#494b4f', roughness: .86 },
    backWall: { color: '#1b1c1f', roughness: .72 },
  }),
  'yoonchae-peach': Object.freeze({
    floor: { color: '#9b654f', roughness: .58 },
    ceiling: { color: '#fff0dd', roughness: .86 },
    wall: { color: '#f4c9ad', roughness: .68 },
    backWall: { color: '#d89b78', roughness: .62 },
  }),
});

// These maps are architectural resources shared by the six galleries. Keeping
// them alive for the page session avoids rebuilding CanvasTextures every time a
// visitor exits and re-enters a room.
const roomSurfaceCache = new Map();
let cachedLaraSource = null;
let laraSourcePromise = null;
let cachedLaraFallbackMaps = null;
let cachedLaraMaps = null;

function configureTexture(texture, repeat, colorSpace = THREE.NoColorSpace, transform = {}) {
  texture.wrapS = transform.mirrored ? THREE.MirroredRepeatWrapping : THREE.RepeatWrapping;
  texture.wrapT = transform.mirrored ? THREE.MirroredRepeatWrapping : THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.offset.set(...(transform.offset || [0, 0]));
  texture.center.set(.5, .5);
  texture.rotation = transform.rotation || 0;
  texture.anisotropy = transform.anisotropy ?? 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = colorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createTexture(canvas, repeat, colorTexture = false) {
  return configureTexture(new THREE.CanvasTexture(canvas), repeat, colorTexture ? THREE.SRGBColorSpace : THREE.NoColorSpace);
}

function noise(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function createRoomSurface(kind, { includeColor = true } = {}) {
  const profile = surfaceProfiles[kind];
  const textureKinds = includeColor ? ['color', 'bump', 'roughness'] : ['bump', 'roughness'];
  const canvases = textureKinds.reduce((set, key) => {
    const canvas = document.createElement('canvas');
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
    set[key] = canvas;
    return set;
  }, {});
  const contexts = Object.fromEntries(Object.entries(canvases).map(([key, canvas]) => [key, canvas.getContext('2d')]));
  const images = Object.fromEntries(Object.entries(contexts).map(([key, context]) => [key, context.createImageData(MAP_SIZE, MAP_SIZE)]));

  for (let y = 0; y < MAP_SIZE; y += 1) {
    for (let x = 0; x < MAP_SIZE; x += 1) {
      const index = (y * MAP_SIZE + x) * 4;
      const broad = Math.sin(x * .024 + Math.sin(y * .012) * 1.4) * .5 + .5;
      const grain = Math.sin(x * .21 + y * .13) * .5 + .5;
      const fleck = noise(x * .5, y * .5);
      const depth = broad * .48 + grain * .17 + fleck * .35;
      const tone = Math.round((depth - .5) * profile.variation);
      const bump = Math.round(108 + depth * 46);
      const roughness = Math.round(profile.roughness + (1 - depth) * 34);

      if (includeColor) {
        images.color.data[index] = profile.base[0] + tone;
        images.color.data[index + 1] = profile.base[1] + tone;
        images.color.data[index + 2] = profile.base[2] + tone;
        images.color.data[index + 3] = 255;
      }
      images.bump.data[index] = bump;
      images.bump.data[index + 1] = bump;
      images.bump.data[index + 2] = bump;
      images.bump.data[index + 3] = 255;
      images.roughness.data[index] = roughness;
      images.roughness.data[index + 1] = roughness;
      images.roughness.data[index + 2] = roughness;
      images.roughness.data[index + 3] = 255;
    }
  }

  Object.entries(contexts).forEach(([key, context]) => context.putImageData(images[key], 0, 0));
  return {
    ...(includeColor ? { color: createTexture(canvases.color, profile.repeat, true) } : {}),
    bump: createTexture(canvases.bump, profile.repeat),
    roughness: createTexture(canvases.roughness, profile.repeat),
  };
}

function disposeSurfaceMaps(maps) {
  Object.values(maps).forEach(({ color, bump, roughness }) => {
    color?.dispose();
    bump?.dispose();
    roughness?.dispose();
  });
}

function clampByte(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function createFabricDetailMaps(source, profile) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(source.image, 0, 0, size, size);
  const sourcePixels = context.getImageData(0, 0, size, size);
  const bumpPixels = context.createImageData(size, size);
  const roughnessPixels = context.createImageData(size, size);
  const luminance = new Float32Array(size * size);

  for (let index = 0; index < luminance.length; index += 1) {
    const pixel = index * 4;
    luminance[index] = sourcePixels.data[pixel] * .2126 + sourcePixels.data[pixel + 1] * .7152 + sourcePixels.data[pixel + 2] * .0722;
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const pixel = index * 4;
      let neighborhood = 0;

      for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
        for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
          const sampleX = (x + offsetX + size) % size;
          const sampleY = (y + offsetY + size) % size;
          neighborhood += luminance[sampleY * size + sampleX];
        }
      }

      const highFrequency = (luminance[index] - neighborhood / 25) * profile.detail;
      const pileDirection = Math.sin((x * 1.57 + y * .36) * .15) * 1.15
        + Math.sin((x * .29 - y * 1.74) * .2) * .7;
      const height = clampByte(128 + highFrequency * 1.05 + pileDirection);
      const fabricRoughness = clampByte(247 - Math.abs(highFrequency) * .045 + pileDirection * .15);

      bumpPixels.data[pixel] = height;
      bumpPixels.data[pixel + 1] = height;
      bumpPixels.data[pixel + 2] = height;
      bumpPixels.data[pixel + 3] = 255;
      roughnessPixels.data[pixel] = fabricRoughness;
      roughnessPixels.data[pixel + 1] = fabricRoughness;
      roughnessPixels.data[pixel + 2] = fabricRoughness;
      roughnessPixels.data[pixel + 3] = 255;
    }
  }

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  bumpCanvas.getContext('2d').putImageData(bumpPixels, 0, 0);
  const roughnessCanvas = document.createElement('canvas');
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  roughnessCanvas.getContext('2d').putImageData(roughnessPixels, 0, 0);
  const transform = { mirrored: true, anisotropy: 4, offset: profile.offset, rotation: profile.rotation };

  return {
    bump: configureTexture(new THREE.CanvasTexture(bumpCanvas), profile.repeat, THREE.NoColorSpace, transform),
    roughness: configureTexture(new THREE.CanvasTexture(roughnessCanvas), profile.repeat, THREE.NoColorSpace, transform),
  };
}

function createLaraSurface(source, kind) {
  const profile = laraProfiles[kind];
  const transform = { mirrored: true, anisotropy: 4, offset: profile.offset, rotation: profile.rotation };
  const color = configureTexture(source.clone(), profile.repeat, THREE.SRGBColorSpace, transform);
  const fabricMaps = createFabricDetailMaps(source, profile);
  return { color, ...fabricMaps, material: profile };
}

function createGraphiteArchitecturalSurface(kind, material) {
  return {
    ...createRoomSurface(kind),
    material,
  };
}

function createMemberSurface(kind, material) {
  const source = createRoomSurface(kind === 'backWall' ? 'wall' : kind, { includeColor: false });
  return {
    bump: source.bump,
    roughness: source.roughness,
    material: { bumpScale: .055, ...material },
  };
}

function loadLaraTexture() {
  if (cachedLaraSource) return Promise.resolve(cachedLaraSource);
  if (laraSourcePromise) return laraSourcePromise;
  laraSourcePromise = new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(laraCheetahBaseColor, (texture) => {
      cachedLaraSource = texture;
      resolve(texture);
    }, undefined, reject);
  });
  return laraSourcePromise;
}

function getCachedLaraFallbackMaps() {
  if (!cachedLaraFallbackMaps) {
    cachedLaraFallbackMaps = {
      floor: createRoomSurface('floor'),
      ceiling: createRoomSurface('ceiling'),
      sideWall: createRoomSurface('wall'),
      backWall: createRoomSurface('wall'),
    };
  }
  return cachedLaraFallbackMaps;
}

function getCachedLaraMaps(source) {
  if (!cachedLaraMaps) {
    cachedLaraMaps = {
      floor: createLaraSurface(source, 'floor'),
      ceiling: createLaraSurface(source, 'ceiling'),
      sideWall: createLaraSurface(source, 'wall'),
      backWall: createLaraSurface(source, 'backWall'),
    };
  }
  return cachedLaraMaps;
}

function getCachedMemberMaps(surfacePreset) {
  const profile = memberMaterialProfiles[surfacePreset];
  if (!profile) return null;
  if (!roomSurfaceCache.has(surfacePreset)) {
    roomSurfaceCache.set(surfacePreset, {
      floor: createMemberSurface('floor', profile.floor),
      ceiling: createMemberSurface('ceiling', profile.ceiling),
      sideWall: createMemberSurface('wall', profile.wall),
      backWall: createMemberSurface('backWall', profile.backWall),
    });
  }
  return roomSurfaceCache.get(surfacePreset);
}

export function preloadRoomMaterialAssets() {
  if (typeof window === 'undefined') return;
  const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 80));
  schedule(() => {
    Object.keys(memberMaterialProfiles).forEach(getCachedMemberMaps);
    getCachedLaraFallbackMaps();
  });
  loadLaraTexture().then((source) => schedule(() => getCachedLaraMaps(source))).catch(() => {
    // The fallback maps already cover a temporary network miss.
  });
}

function useLaraTexture(enabled) {
  const [texture, setTexture] = useState(() => (enabled ? cachedLaraSource : null));

  useEffect(() => {
    if (!enabled) {
      setTexture(null);
      return undefined;
    }

    let active = true;
    if (cachedLaraSource) setTexture(cachedLaraSource);
    else loadLaraTexture().then((loaded) => {
      if (active) setTexture(loaded);
    }).catch(() => {
      if (active) setTexture(null);
    });

    return () => {
      active = false;
    };
  }, [enabled]);

  return texture;
}

export function useRoomSurfaceMaps(surfacePreset = 'base-neutral') {
  const isLara = surfacePreset === 'lara-cheetah-temp';
  const hasMemberProfile = Boolean(memberMaterialProfiles[surfacePreset]);
  const neutralMaps = useMemo(() => (!isLara && !hasMemberProfile ? {
    floor: createRoomSurface('floor'),
    ceiling: createRoomSurface('ceiling'),
    sideWall: createRoomSurface('wall'),
    backWall: createRoomSurface('wall'),
  } : null), [hasMemberProfile, isLara]);
  // Lara needs a lightweight neutral material only while its fabric source is
  // decoding; themed rooms no longer build an unused neutral map set.
  const laraFallbackMaps = useMemo(() => (isLara ? getCachedLaraFallbackMaps() : null), [isLara]);
  const laraSource = useLaraTexture(isLara);
  const laraMaps = useMemo(() => (laraSource ? getCachedLaraMaps(laraSource) : null), [laraSource]);
  const memberMaps = useMemo(() => getCachedMemberMaps(surfacePreset), [surfacePreset]);

  useEffect(() => () => {
    if (neutralMaps) disposeSurfaceMaps(neutralMaps);
  }, [neutralMaps]);
  if (isLara) return laraMaps || laraFallbackMaps;
  return memberMaps || neutralMaps;
}

// This generated base-color provides the current carpet pass. Production PBR
// maps can be added later without changing the room or its material contract.
export const LARA_TEXTURE_SLOTS = Object.freeze({
  activeBaseColor: 'app/assets/room/lara/lara-cheetah-carpet-reference.jpg',
  baseColor: 'app/assets/room/lara/lara-cheetah-basecolor.webp',
  normal: 'app/assets/room/lara/lara-cheetah-normal.webp',
  roughness: 'app/assets/room/lara/lara-cheetah-roughness.webp',
  ambientOcclusion: 'app/assets/room/lara/lara-cheetah-ao.webp',
});
