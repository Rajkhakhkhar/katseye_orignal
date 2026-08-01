import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

function createLaraTextureCanvases() {
  const canvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  const roughnessCanvas = document.createElement('canvas');
  canvas.width = bumpCanvas.width = 640;
  canvas.height = bumpCanvas.height = 640;
  roughnessCanvas.width = canvas.width;
  roughnessCanvas.height = canvas.height;
  const context = canvas.getContext('2d');
  const bump = bumpCanvas.getContext('2d');
  const roughness = roughnessCanvas.getContext('2d');
  const random = (seed) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };

  const fibers = context.createImageData(canvas.width, canvas.height);
  const heightMap = bump.createImageData(canvas.width, canvas.height);
  const roughnessMap = roughness.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4;
      const weave = (Math.sin((x / canvas.width) * Math.PI * 94 + Math.sin((y / canvas.height) * Math.PI * 8) * .9) + 1) * .5;
      const crossFiber = (Math.sin((y / canvas.height) * Math.PI * 126) + 1) * .5;
      const variation = (weave * .65 + crossFiber * .35);
      fibers.data[index] = 45 + variation * 28;
      fibers.data[index + 1] = 25 + variation * 17;
      fibers.data[index + 2] = 16 + variation * 10;
      fibers.data[index + 3] = 255;
      const height = 92 + variation * 48;
      heightMap.data[index] = height;
      heightMap.data[index + 1] = height;
      heightMap.data[index + 2] = height;
      heightMap.data[index + 3] = 255;
      const softness = 175 + variation * 55;
      roughnessMap.data[index] = softness;
      roughnessMap.data[index + 1] = softness;
      roughnessMap.data[index + 2] = softness;
      roughnessMap.data[index + 3] = 255;
    }
  }
  context.putImageData(fibers, 0, 0);
  bump.putImageData(heightMap, 0, 0);
  roughness.putImageData(roughnessMap, 0, 0);

  const drawRosette = (target, x, y, radiusX, radiusY, angle, innerColor) => {
    target.save();
    target.translate(x, y);
    target.rotate(angle);
    target.fillStyle = '#180f0a';
    target.beginPath();
    target.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    target.fill();
    target.fillStyle = innerColor;
    target.beginPath();
    target.ellipse(0, 0, radiusX * .55, radiusY * .48, 0, 0, Math.PI * 2);
    target.fill();
    target.restore();
  };

  for (let index = 0; index < 58; index += 1) {
    const seed = index + 1;
    const x = random(seed * 2) * canvas.width;
    const y = random(seed * 3) * canvas.height;
    const radiusX = 20 + random(seed * 5) * 26;
    const radiusY = 14 + random(seed * 7) * 20;
    const angle = random(seed * 11) * Math.PI;
    [-canvas.width, 0, canvas.width].forEach((offsetX) => [-canvas.height, 0, canvas.height].forEach((offsetY) => {
      drawRosette(context, x + offsetX, y + offsetY, radiusX, radiusY, angle, index % 3 ? '#9d6838' : '#6f4326');
      drawRosette(bump, x + offsetX, y + offsetY, radiusX, radiusY, angle, index % 3 ? '#9a9a9a' : '#727272');
    }));
  }

  for (let index = 0; index < 110; index += 1) {
    const seed = index + 91;
    const x = random(seed * 2) * canvas.width;
    const y = random(seed * 3) * canvas.height;
    const radius = 3 + random(seed * 4) * 8;
    [-canvas.width, 0, canvas.width].forEach((offsetX) => [-canvas.height, 0, canvas.height].forEach((offsetY) => {
      context.fillStyle = random(seed * 5) > .5 ? '#160d09' : '#704225';
      context.beginPath();
      context.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      context.fill();
      bump.fillStyle = '#343434';
      bump.beginPath();
      bump.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      bump.fill();
      roughness.fillStyle = '#b7b7b7';
      roughness.beginPath();
      roughness.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      roughness.fill();
    }));
  }

  return { canvas, bumpCanvas, roughnessCanvas };
}

function createTexture(canvas, repeat, colorTexture = false) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.colorSpace = colorTexture ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return texture;
}

export function useLaraSurfaceMaps(enabled) {
  const maps = useMemo(() => {
    if (!enabled) return null;
    const { canvas, bumpCanvas, roughnessCanvas } = createLaraTextureCanvases();
    const surface = (repeat) => ({ color: createTexture(canvas, repeat, true), bump: createTexture(bumpCanvas, repeat), roughness: createTexture(roughnessCanvas, repeat) });
    return {
      floor: surface([3.5, 9]),
      ceiling: surface([3.5, 9]),
      sideWall: surface([8.5, 2.25]),
      backWall: surface([3.5, 2.25]),
    };
  }, [enabled]);
  useEffect(() => () => maps && Object.values(maps).forEach(({ color, bump, roughness }) => { color.dispose(); bump.dispose(); roughness.dispose(); }), [maps]);
  return maps;
}
