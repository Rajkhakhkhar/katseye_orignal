import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const MAP_SIZE = 512;

function createCanvasSet() {
  const color = document.createElement('canvas');
  const bump = document.createElement('canvas');
  const roughness = document.createElement('canvas');
  [color, bump, roughness].forEach((canvas) => {
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
  });
  return { color, bump, roughness };
}

function createTexture(canvas, repeat, colorTexture = false) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.colorSpace = colorTexture ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return texture;
}

function createLuxurySurface(kind, repeat) {
  const { color, bump, roughness } = createCanvasSet();
  const colorContext = color.getContext('2d');
  const bumpContext = bump.getContext('2d');
  const roughnessContext = roughness.getContext('2d');
  const colorMap = colorContext.createImageData(MAP_SIZE, MAP_SIZE);
  const bumpMap = bumpContext.createImageData(MAP_SIZE, MAP_SIZE);
  const roughnessMap = roughnessContext.createImageData(MAP_SIZE, MAP_SIZE);
  const isFloor = kind === 'floor';
  const isCeiling = kind === 'ceiling';

  for (let y = 0; y < MAP_SIZE; y += 1) {
    for (let x = 0; x < MAP_SIZE; x += 1) {
      const index = (y * MAP_SIZE + x) * 4;
      const fineFiber = Math.sin(x * .39 + Math.sin(y * .055) * 1.35) * .5 + .5;
      const crossFiber = Math.sin(y * .21 + Math.sin(x * .035) * .85) * .5 + .5;
      const broadPile = Math.sin((x + y) * .018) * .5 + .5;
      const directionalPile = isFloor
        ? Math.sin(x * .075 + y * .018) * .5 + .5
        : Math.sin(y * .07 + x * .015) * .5 + .5;
      const texture = fineFiber * .24 + crossFiber * .16 + broadPile * .26 + directionalPile * .34;
      const base = isFloor ? 172 : isCeiling ? 191 : 184;
      const range = isFloor ? 38 : isCeiling ? 24 : 30;
      const value = Math.round(base + (texture - .5) * range);
      const pileShadow = Math.round(106 + texture * (isFloor ? 74 : 62));
      const surfaceRoughness = Math.round((isFloor ? 150 : isCeiling ? 186 : 171) + (1 - texture) * 38);

      colorMap.data[index] = value + (isFloor ? 8 : 4);
      colorMap.data[index + 1] = value;
      colorMap.data[index + 2] = value - 8;
      colorMap.data[index + 3] = 255;
      bumpMap.data[index] = pileShadow;
      bumpMap.data[index + 1] = pileShadow;
      bumpMap.data[index + 2] = pileShadow;
      bumpMap.data[index + 3] = 255;
      roughnessMap.data[index] = surfaceRoughness;
      roughnessMap.data[index + 1] = surfaceRoughness;
      roughnessMap.data[index + 2] = surfaceRoughness;
      roughnessMap.data[index + 3] = 255;
    }
  }

  colorContext.putImageData(colorMap, 0, 0);
  bumpContext.putImageData(bumpMap, 0, 0);
  roughnessContext.putImageData(roughnessMap, 0, 0);

  return {
    color: createTexture(color, repeat, true),
    bump: createTexture(bump, repeat),
    roughness: createTexture(roughness, repeat),
  };
}

export function useLaraSurfaceMaps(enabled) {
  const maps = useMemo(() => {
    if (!enabled) return null;
    return {
      floor: createLuxurySurface('floor', [3.5, 9]),
      ceiling: createLuxurySurface('ceiling', [3.5, 9]),
      sideWall: createLuxurySurface('wall', [8.5, 2.25]),
      backWall: createLuxurySurface('wall', [3.5, 2.25]),
    };
  }, [enabled]);

  useEffect(() => () => maps && Object.values(maps).forEach(({ color, bump, roughness }) => {
    color.dispose();
    bump.dispose();
    roughness.dispose();
  }), [maps]);

  return maps;
}
