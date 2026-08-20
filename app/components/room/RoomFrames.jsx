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

function LuxuryFrameRim({ width, height, depth }) {
  const gold = <meshPhysicalMaterial color="#ad7c45" metalness={.82} roughness={.34} clearcoat={.05} />;
  const z = depth / 2 + .017;
  return <>
    <mesh position={[0, height / 2 + .035, z]}><boxGeometry args={[width + .14, .07, .028]} />{gold}</mesh>
    <mesh position={[0, -height / 2 - .035, z]}><boxGeometry args={[width + .14, .07, .028]} />{gold}</mesh>
    <mesh position={[-width / 2 - .035, 0, z]}><boxGeometry args={[.07, height + .14, .028]} />{gold}</mesh>
    <mesh position={[width / 2 + .035, 0, z]}><boxGeometry args={[.07, height + .14, .028]} />{gold}</mesh>
    <mesh position={[0, height / 2 - .045, z + .017]}><boxGeometry args={[width * .84, .012, .01]} /><meshStandardMaterial color="#d89b4c" emissive="#b86f2b" emissiveIntensity={.18} roughness={.62} /></mesh>
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
    {/* Editorial portrait placeholder: a calm silhouette rather than a decorative symbol. */}
    <mesh position={[0, height * .17, 0]}><circleGeometry args={[Math.min(width, height) * .15, 24]} /><meshStandardMaterial color="#b77b67" metalness={.18} roughness={.64} /></mesh>
    <mesh position={[0, -height * .17, -.001]}><boxGeometry args={[width * .36, height * .38, .012]} /><meshStandardMaterial color="#4b2b29" roughness={.8} /></mesh>
    <mesh position={[0, -height * .39, .005]}><boxGeometry args={[width * .48, .018, .01]} /><meshStandardMaterial color="#c79768" roughness={.62} /></mesh>
  </group>;
}

function LaraPrimaryPortrait({ width, height, depth }) {
  const texture = useLoader(THREE.TextureLoader, '/hero-lara-hq.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return <group position={[0, 0, depth / 2 + .014]}>
    <mesh position={[0, 0, -.005]}><planeGeometry args={[width * .92, height * .92]} /><meshStandardMaterial color="#211614" roughness={.9} /></mesh>
    <mesh position={[0, -.02, .006]}><planeGeometry args={[width * .84, height * .9]} /><meshStandardMaterial map={texture} transparent alphaTest={.04} roughness={.72} /></mesh>
  </group>;
}

function PlaceholderFrame({ position, rotation, width, height, style, tone = '#2b1d19', mark = 'portrait', empty = false, artwork = 'placeholder' }) {
  const borderThickness = style.borderThickness || .075;
  const depth = style.depth || .06;
  return <group position={position} rotation={rotation}>
    <mesh><boxGeometry args={[width + borderThickness * 2, height + borderThickness * 2, depth]} /><meshPhysicalMaterial color={style.borderColor} metalness={style.borderMetalness} roughness={style.borderRoughness} /></mesh>
    <mesh position={[0, 0, depth / 2 + .004]}><planeGeometry args={[width, height]} /><meshStandardMaterial color={tone} roughness={.88} /></mesh>
    <LuxuryFrameRim width={width} height={height} depth={depth} />
    {artwork === 'lara-primary' ? <LaraPrimaryPortrait width={width} height={height} depth={depth} /> : !empty && <PlaceholderArtwork width={width} height={height} depth={depth} mark={mark} />}
  </group>;
}

function LaraLayoutFrames() {
  // Both exhibition walls are intentionally rendered by LaraExhibitionWalls as continuous recessed architecture.
  return null;
}
export function AdaptiveFrameGallery({ frames = [], frameStyle }) {
  return <>
    {frames.map((frame, index) => <AdaptiveGalleryFrame key={frame.id || frame.src || index} {...frame} frameStyle={{ ...frameStyle, ...frame.frameStyle }} />)}
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
