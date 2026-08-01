import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import laraCheetahBaseColor from '../../assets/room/lara/lara-cheetah-textile-temp.png';

const MAP_SIZE = 384;

const surfaceProfiles = {
  floor: { base: [102, 109, 117], variation: 17, roughness: 138, repeat: [3.2, 8.5] },
  ceiling: { base: [146, 151, 156], variation: 9, roughness: 194, repeat: [3.4, 8.5] },
  wall: { base: [120, 127, 135], variation: 14, roughness: 180, repeat: [7.8, 2.2] },
};

const laraProfiles = {
  floor: { repeat: [2.25, 6.4], color: '#604b37', roughness: .88, bumpScale: .024 },
  ceiling: { repeat: [2.65, 6.7], color: '#483a2b', roughness: .96, bumpScale: .018 },
  wall: { repeat: [5.85, 1.85], color: '#755d43', roughness: .91, bumpScale: .027 },
};

function configureTexture(texture, repeat, colorSpace = THREE.NoColorSpace) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.anisotropy = 4;
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

function createLaraSurface(source, kind) {
  const profile = laraProfiles[kind];
  const color = configureTexture(source.clone(), profile.repeat, THREE.SRGBColorSpace);
  const bump = configureTexture(source.clone(), profile.repeat);
  const roughness = configureTexture(source.clone(), profile.repeat);
  return { color, bump, roughness, material: profile };
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
    backWall: createLaraSurface(laraSource, 'wall'),
  } : null), [laraSource]);

  useEffect(() => () => disposeSurfaceMaps(neutralMaps), [neutralMaps]);
  useEffect(() => () => {
    if (laraMaps) disposeSurfaceMaps(laraMaps);
  }, [laraMaps]);

  return surfacePreset === 'lara-cheetah-temp' && laraMaps ? laraMaps : neutralMaps;
}

// The generated base-color image is intentionally temporary. Drop production
// PBR maps into app/assets/room/lara/ and replace this source when supplied.
export const LARA_TEXTURE_SLOTS = Object.freeze({
  baseColor: 'app/assets/room/lara/lara-cheetah-basecolor.webp',
  normal: 'app/assets/room/lara/lara-cheetah-normal.webp',
  roughness: 'app/assets/room/lara/lara-cheetah-roughness.webp',
});
