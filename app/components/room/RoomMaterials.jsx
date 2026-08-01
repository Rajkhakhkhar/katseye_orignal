import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const MAP_SIZE = 384;

const surfaceProfiles = {
  floor: { base: [102, 109, 117], variation: 17, roughness: 138, repeat: [3.2, 8.5] },
  ceiling: { base: [146, 151, 156], variation: 9, roughness: 194, repeat: [3.4, 8.5] },
  wall: { base: [120, 127, 135], variation: 14, roughness: 180, repeat: [7.8, 2.2] },
};

function createTexture(canvas, repeat, colorTexture = false) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.colorSpace = colorTexture ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.anisotropy = 4;
  return texture;
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

export function useRoomSurfaceMaps() {
  const maps = useMemo(() => ({
    floor: createRoomSurface('floor'),
    ceiling: createRoomSurface('ceiling'),
    sideWall: createRoomSurface('wall'),
    backWall: createRoomSurface('wall'),
  }), []);

  useEffect(() => () => Object.values(maps).forEach(({ color, bump, roughness }) => {
    color.dispose();
    bump.dispose();
    roughness.dispose();
  }), [maps]);

  return maps;
}

// Compatibility alias while member themes are still empty.
export const useLaraSurfaceMaps = () => useRoomSurfaceMaps();
