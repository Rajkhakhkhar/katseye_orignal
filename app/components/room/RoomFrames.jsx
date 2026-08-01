import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

const DEFAULT_STYLE = Object.freeze({
  borderColor: '#9ca5ad',
  borderMetalness: .7,
  borderRoughness: .36,
  backingColor: '#171b20',
  borderThickness: .075,
  depth: .055,
});

function getFrameSize(texture, maxWidth, maxHeight, scale) {
  const image = texture.image;
  const aspect = image?.width && image?.height ? image.width / image.height : 1;
  let width = maxWidth;
  let height = width / aspect;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }
  return { width: width * scale, height: height * scale };
}

export function AdaptiveGalleryFrame({
  src,
  position = [0, 2, 0],
  rotation = [0, 0, 0],
  maxWidth = 2.25,
  maxHeight = 1.75,
  scale = 1,
  frameStyle = {},
}) {
  const texture = useLoader(THREE.TextureLoader, src);
  const size = useMemo(() => getFrameSize(texture, maxWidth, maxHeight, scale), [texture, maxWidth, maxHeight, scale]);
  const style = { ...DEFAULT_STYLE, ...frameStyle };
  const outerWidth = size.width + style.borderThickness * 2;
  const outerHeight = size.height + style.borderThickness * 2;

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  return <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[outerWidth, outerHeight, style.depth]} />
      <meshPhysicalMaterial color={style.borderColor} metalness={style.borderMetalness} roughness={style.borderRoughness} />
    </mesh>
    <mesh position={[0, 0, style.depth / 2 + .004]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshStandardMaterial map={texture} roughness={.7} />
    </mesh>
    <mesh position={[0, 0, -style.depth / 2 - .002]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshStandardMaterial color={style.backingColor} roughness={.82} />
    </mesh>
  </group>;
}

export function AdaptiveFrameGallery({ frames = [], frameStyle }) {
  return frames.map((frame, index) => <AdaptiveGalleryFrame key={frame.id || frame.src || index} {...frame} frameStyle={{ ...frameStyle, ...frame.frameStyle }} />);
}

// Retained for any legacy configuration that still imports the old primitive.
export default function EmptyFrame({ position, rotation, accent = '#737a82', hero = false }) {
  const width = hero ? 2.8 : 2.2;
  const height = hero ? 2 : 1.6;
  return <group position={position} rotation={rotation}>
    <mesh><planeGeometry args={[width + .3, height + .3]} /><meshStandardMaterial color={accent} metalness={.32} roughness={.48} /></mesh>
    <mesh position={[0, 0, .012]}><planeGeometry args={[width, height]} /><meshStandardMaterial color="#3c3c40" roughness={.8} /></mesh>
  </group>;
}
