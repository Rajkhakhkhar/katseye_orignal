import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import LaraRoomDecor from './RoomDecor';

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

function FrameAccent({ width, height, depth }) {
  return <>
    <mesh position={[0, height * .43, depth / 2 + .012]}><boxGeometry args={[width * .82, .018, .012]} /><meshStandardMaterial color="#bf8743" emissive="#bf8743" emissiveIntensity={.2} roughness={.48} /></mesh>
    <mesh position={[0, -height * .43, depth / 2 + .012]}><boxGeometry args={[width * .82, .012, .012]} /><meshStandardMaterial color="#bf8743" emissive="#bf8743" emissiveIntensity={.12} roughness={.52} /></mesh>
  </>;
}

function PlaceholderArtwork({ width, height, depth, mark }) {
  const z = depth / 2 + .011;
  if (mark === 'performance') {
    return <group position={[0, 0, z]}>
      <mesh position={[0, height * .03, 0]}><coneGeometry args={[Math.min(width, height) * .18, height * .54, 4]} /><meshStandardMaterial color="#b77b67" metalness={.4} roughness={.52} /></mesh>
      <mesh position={[width * .22, -height * .22, .004]}><circleGeometry args={[height * .09, 18]} /><meshStandardMaterial color="#d3a065" emissive="#a45f3c" emissiveIntensity={.12} roughness={.7} /></mesh>
    </group>;
  }
  if (mark === 'meme') {
    return <group position={[0, 0, z]}>
      <mesh position={[-width * .18, height * .15, 0]}><circleGeometry args={[height * .13, 18]} /><meshStandardMaterial color="#c69767" roughness={.72} /></mesh>
      <mesh position={[width * .18, height * .15, 0]}><circleGeometry args={[height * .13, 18]} /><meshStandardMaterial color="#c69767" roughness={.72} /></mesh>
      <mesh position={[0, -height * .18, 0]}><boxGeometry args={[width * .42, .025, .01]} /><meshStandardMaterial color="#c69767" roughness={.72} /></mesh>
    </group>;
  }
  if (mark === 'quote') {
    return <group position={[0, 0, z]}>
      {[-.18, -.04, .1, .24].map((offset, index) => <mesh key={offset} position={[0, height * offset, 0]}><boxGeometry args={[width * (index % 2 ? .65 : .78), .018, .01]} /><meshStandardMaterial color="#c79768" emissive="#7f4d2f" emissiveIntensity={.12} roughness={.72} /></mesh>)}
    </group>;
  }
  if (mark === 'magazine') {
    return <group position={[0, 0, z]}>
      <mesh position={[0, 0, 0]}><boxGeometry args={[width * .48, height * .68, .012]} /><meshStandardMaterial color="#5c3331" roughness={.72} /></mesh>
      <mesh position={[0, height * .12, .008]}><circleGeometry args={[Math.min(width, height) * .13, 18]} /><meshStandardMaterial color="#c79a63" metalness={.3} roughness={.5} /></mesh>
    </group>;
  }
  return <group position={[0, 0, z]}>
    <mesh><ringGeometry args={[Math.min(width, height) * .15, Math.min(width, height) * .25, 24]} /><meshStandardMaterial color="#b77b67" metalness={.65} roughness={.34} /></mesh>
    <mesh position={[0, -height * .24, .005]}><boxGeometry args={[width * .38, .02, .01]} /><meshStandardMaterial color="#c79768" roughness={.62} /></mesh>
  </group>;
}

function PlaceholderFrame({ position, rotation, width, height, style, tone = '#2b1d19', mark = 'portrait' }) {
  const borderThickness = style.borderThickness || .075;
  const depth = style.depth || .06;
  return <group position={position} rotation={rotation}>
    <mesh><boxGeometry args={[width + borderThickness * 2, height + borderThickness * 2, depth]} /><meshPhysicalMaterial color={style.borderColor} metalness={style.borderMetalness} roughness={style.borderRoughness} /></mesh>
    <mesh position={[0, 0, depth / 2 + .004]}><planeGeometry args={[width, height]} /><meshStandardMaterial color={tone} roughness={.88} /></mesh>
    <FrameAccent width={width} height={height} depth={depth} />
    <PlaceholderArtwork width={width} height={height} depth={depth} mark={mark} />
  </group>;
}

function LaraLayoutFrames({ frameStyle }) {
  const style = { ...DEFAULT_STYLE, ...frameStyle };
  return <>
    {/* Left wall: portrait sequence, a playful meme frame, and a restrained quote plaque. */}
    <PlaceholderFrame position={[-3.86, 2.76, 5.38]} rotation={[0, Math.PI / 2, 0]} width={1.48} height={2.16} style={style} tone="#251916" mark="portrait" />
    <PlaceholderFrame position={[-3.86, 2.42, 2.18]} rotation={[0, Math.PI / 2, 0]} width={1.08} height={1.5} style={style} tone="#31221d" mark="portrait" />
    <PlaceholderFrame position={[-3.86, 3.13, -3.88]} rotation={[0, Math.PI / 2, 0]} width={1.24} height={.88} style={style} tone="#2a1b18" mark="meme" />
    <PlaceholderFrame position={[-3.86, 2.05, -6.98]} rotation={[0, Math.PI / 2, 0]} width={1.12} height={.76} style={style} tone="#211614" mark="quote" />

    {/* Right wall: performance, editorial, and music archive placeholders. */}
    <PlaceholderFrame position={[3.86, 2.7, 5.3]} rotation={[0, -Math.PI / 2, 0]} width={1.54} height={2.18} style={style} tone="#271a17" mark="performance" />
    <PlaceholderFrame position={[3.86, 2.56, 2.14]} rotation={[0, -Math.PI / 2, 0]} width={1.22} height={1.52} style={style} tone="#32211c" mark="magazine" />
    <PlaceholderFrame position={[3.86, 3.04, -3.98]} rotation={[0, -Math.PI / 2, 0]} width={1.18} height={.84} style={style} tone="#281b18" mark="performance" />
  </>;
}

export function AdaptiveFrameGallery({ frames = [], frameStyle }) {
  const isLara = frameStyle?.borderColor === '#8f7658';
  return <>
    {frames.map((frame, index) => <AdaptiveGalleryFrame key={frame.id || frame.src || index} {...frame} frameStyle={{ ...frameStyle, ...frame.frameStyle }} />)}
    {isLara && <LaraLayoutFrames frameStyle={frameStyle} />}
    {isLara && <LaraRoomDecor />}
  </>;
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