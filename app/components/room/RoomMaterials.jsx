import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import laraCheetahBaseColor from '../../assets/room/lara/lara-cheetah-carpet-reference.jpg';

const MAP_SIZE = 384;

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
  floor: { repeat: [.94, 2.04], offset: [.13, .19], rotation: -.018, color: '#765845', roughness: .985, bumpScale: .024, detail: .56 },
  ceiling: { repeat: [.94, 2.04], offset: [.41, .27], rotation: .012, color: '#66503c', roughness: .99, bumpScale: .016, detail: .34 },
  wall: { repeat: [1.48, .64], offset: [.31, .26], rotation: -.009, color: '#efd4aa', roughness: .965, bumpScale: .016, detail: .42 },
  backWall: { repeat: [.82, .9], offset: [.2, .12], rotation: 0, color: '#72543c', roughness: .985, bumpScale: .018, detail: .4 },
};

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

function createRoomSurface(kind) {
  const profile = surfaceProfiles[kind];
  const canvases = ['color', 'bump', 'roughness'].reduce((set, key) => {
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

      images.color.data[index] = profile.base[0] + tone;
      images.color.data[index + 1] = profile.base[1] + tone;
      images.color.data[index + 2] = profile.base[2] + tone;
      images.color.data[index + 3] = 255;
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
    color: createTexture(canvases.color, profile.repeat, true),
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
  const size = 512;
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

function useLaraTexture(enabled) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setTexture(null);
      return undefined;
    }

    let active = true;
    const loader = new THREE.TextureLoader();
    const requested = loader.load(laraCheetahBaseColor, (loaded) => {
      if (active) setTexture(loaded);
    });

    return () => {
      active = false;
      requested.dispose();
    };
  }, [enabled]);

  return texture;
}

export function useRoomSurfaceMaps(surfacePreset = 'base-neutral') {
  const neutralMaps = useMemo(() => ({
    floor: createRoomSurface('floor'),
    ceiling: createRoomSurface('ceiling'),
    sideWall: createRoomSurface('wall'),
    backWall: createRoomSurface('wall'),
  }), []);
  const laraSource = useLaraTexture(surfacePreset === 'lara-cheetah-temp');
  const laraMaps = useMemo(() => (laraSource ? {
    floor: createLaraSurface(laraSource, 'floor'),
    ceiling: createLaraSurface(laraSource, 'ceiling'),
    sideWall: createLaraSurface(laraSource, 'wall'),
    backWall: createLaraSurface(laraSource, 'backWall'),
  } : null), [laraSource]);

  useEffect(() => () => disposeSurfaceMaps(neutralMaps), [neutralMaps]);
  useEffect(() => () => {
    if (laraMaps) disposeSurfaceMaps(laraMaps);
  }, [laraMaps]);

  return surfacePreset === 'lara-cheetah-temp' && laraMaps ? laraMaps : neutralMaps;
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
