import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useState } from 'react';
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
  const outerDepth = Math.max(style.depth, .06);
  const innerInset = Math.max(style.borderThickness * .46, .026);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  return <group position={position} rotation={rotation} renderOrder={2}>
    {/* A shallow architectural standoff keeps the art clear of cabinet depth. */}
    <mesh position={[0, 0, -outerDepth * 2.5]} castShadow receiveShadow>
      <boxGeometry args={[outerWidth * .62, outerHeight * .55, outerDepth * 4.4]} />
      <meshPhysicalMaterial color={style.backingColor} metalness={.38} roughness={.44} />
    </mesh>
    <mesh position={[0, 0, -outerDepth * .15]}>
      <boxGeometry args={[outerWidth, outerHeight, outerDepth * .34]} />
      <meshPhysicalMaterial color={style.backingColor} metalness={.26} roughness={.58} />
    </mesh>
    {[-1, 1].map((direction) => <mesh key={`horizontal-${direction}`} position={[0, direction * (size.height / 2 + style.borderThickness / 2), outerDepth * .23]} castShadow receiveShadow>
      <boxGeometry args={[outerWidth, style.borderThickness, outerDepth]} />
      <meshPhysicalMaterial color={style.borderColor} metalness={style.borderMetalness} roughness={style.borderRoughness} clearcoat={.16} />
    </mesh>)}
    {[-1, 1].map((direction) => <mesh key={`vertical-${direction}`} position={[direction * (size.width / 2 + style.borderThickness / 2), 0, outerDepth * .23]} castShadow receiveShadow>
      <boxGeometry args={[style.borderThickness, size.height, outerDepth]} />
      <meshPhysicalMaterial color={style.borderColor} metalness={style.borderMetalness} roughness={style.borderRoughness} clearcoat={.16} />
    </mesh>)}
    {[-1, 1].map((direction) => <mesh key={`bevel-h-${direction}`} position={[0, direction * (size.height / 2 + innerInset / 2), outerDepth * .76]}>
      <boxGeometry args={[size.width + innerInset, innerInset, innerInset * .72]} />
      <meshPhysicalMaterial color={style.borderColor} metalness={Math.min(1, style.borderMetalness + .08)} roughness={Math.max(.08, style.borderRoughness - .1)} />
    </mesh>)}
    {[-1, 1].map((direction) => <mesh key={`bevel-v-${direction}`} position={[direction * (size.width / 2 + innerInset / 2), 0, outerDepth * .76]}>
      <boxGeometry args={[innerInset, size.height, innerInset * .72]} />
      <meshPhysicalMaterial color={style.borderColor} metalness={Math.min(1, style.borderMetalness + .08)} roughness={Math.max(.08, style.borderRoughness - .1)} />
    </mesh>)}
    <mesh position={[0, 0, outerDepth * .88]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshStandardMaterial map={texture} roughness={.66} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
    </mesh>
  </group>;
}

const FEATURE_WALL_PROFILES = Object.freeze({
  lara: Object.freeze({ panel: '#15100e', well: '#08090a', accent: '#9a7147', detail: '#2c211b', style: 'strata' }),
  sophia: Object.freeze({ panel: '#e8ddc8', well: '#4a3828', accent: '#c6a267', detail: '#f5ead8', style: 'fluted' }),
  daniela: Object.freeze({ panel: '#2b171b', well: '#110c0f', accent: '#b68157', detail: '#672738', style: 'rhythm' }),
  megan: Object.freeze({ panel: '#1b1e20', well: '#080a0c', accent: '#aeb6b8', detail: '#30373a', style: 'grid' }),
  manon: Object.freeze({ panel: '#231d1a', well: '#0e1011', accent: '#9e7751', detail: '#4a3326', style: 'slats' }),
  yoonchae: Object.freeze({ panel: '#f3dfcc', well: '#e9c3ae', accent: '#d2a56f', detail: '#f9eee1', style: 'soft' }),
});

function FeatureWallFinish({ profile, artWidth, artHeight, featureWidth, featureHeight }) {
  const edge = artWidth / 2 + .18;
  const sideWidth = Math.max(.12, featureWidth / 2 - edge);
  const topY = featureHeight / 2 - .18;

  if (profile.style === 'strata') {
    return <>
      {[-1, 1].flatMap((side) => [-.78, -.26, .26, .78].map((offset) => <mesh key={`lara-strata-${side}-${offset}`} position={[side * (edge + sideWidth * .5), offset, .055]}>
        <boxGeometry args={[sideWidth - .11, .08, .024]} />
        <meshPhysicalMaterial color={profile.detail} metalness={.4} roughness={.48} />
      </mesh>))}
      {[-1, 1].map((side) => <mesh key={`lara-claw-${side}`} position={[side * (featureWidth / 2 - .18), 0, .067]} rotation={[0, 0, side * .08]}>
        <boxGeometry args={[.018, featureHeight - .36, .02]} />
        <meshPhysicalMaterial color={profile.accent} metalness={.85} roughness={.25} />
      </mesh>)}
    </>;
  }
  if (profile.style === 'fluted') {
    const xs = Array.from({ length: 12 }, (_, index) => -featureWidth / 2 + .24 + index * .45).filter((x) => Math.abs(x) > edge + .06);
    return <>
      {xs.map((x) => <mesh key={`sofia-flute-${x}`} position={[x, 0, .055]}>
        <boxGeometry args={[.075, featureHeight - .28, .026]} />
        <meshPhysicalMaterial color={profile.detail} metalness={.06} roughness={.62} />
      </mesh>)}
      {[-1, 1].map((side) => <mesh key={`sofia-crown-line-${side}`} position={[side * (edge + .06), topY, .07]}>
        <boxGeometry args={[.12, .022, .02]} />
        <meshPhysicalMaterial color={profile.accent} metalness={.84} roughness={.2} />
      </mesh>)}
    </>;
  }
  if (profile.style === 'rhythm') {
    return <>
      {[-1, 1].flatMap((side) => [-.76, -.38, 0, .38, .76].map((y, index) => <mesh key={`daniela-rhythm-${side}-${y}`} position={[side * (edge + sideWidth * .5), y, .068]} rotation={[0, 0, side * (index % 2 ? -.22 : .22)]}>
        <boxGeometry args={[sideWidth - .12, .026, .022]} />
        <meshPhysicalMaterial color={index % 2 ? profile.detail : profile.accent} metalness={.78} roughness={.25} />
      </mesh>))}
      <mesh position={[0, -featureHeight / 2 + .17, .068]}><boxGeometry args={[featureWidth - .42, .025, .02]} /><meshStandardMaterial color={profile.accent} emissive={profile.accent} emissiveIntensity={.26} /></mesh>
    </>;
  }
  if (profile.style === 'grid') {
    return <>
      {[-1, 1].map((side) => <group key={`megan-grid-${side}`} position={[side * (edge + sideWidth * .5), 0, .055]}>
        {[-.72, -.24, .24, .72].map((y) => <mesh key={y} position={[0, y, 0]}><boxGeometry args={[sideWidth - .1, .014, .018]} /><meshPhysicalMaterial color={profile.detail} metalness={.8} roughness={.25} /></mesh>)}
        <mesh position={[side * .08, 0, .01]}><boxGeometry args={[.024, featureHeight - .3, .02]} /><meshPhysicalMaterial color={profile.accent} metalness={.82} roughness={.2} /></mesh>
      </group>)}
      <mesh position={[0, topY, .06]}><boxGeometry args={[featureWidth - .4, .02, .02]} /><meshPhysicalMaterial color={profile.accent} metalness={.78} roughness={.24} /></mesh>
    </>;
  }
  if (profile.style === 'slats') {
    const xs = Array.from({ length: 18 }, (_, index) => -featureWidth / 2 + .18 + index * .3).filter((x) => Math.abs(x) > edge + .035);
    return <>
      {xs.map((x) => <mesh key={`manon-slat-${x}`} position={[x, 0, .055]}><boxGeometry args={[.11, featureHeight - .28, .026]} /><meshPhysicalMaterial color={profile.detail} metalness={.12} roughness={.46} /></mesh>)}
      {[-1, 1].map((side) => <mesh key={`manon-trim-${side}`} position={[side * (edge + .055), 0, .07]}><boxGeometry args={[.024, featureHeight - .38, .02]} /><meshPhysicalMaterial color={profile.accent} metalness={.82} roughness={.22} /></mesh>)}
    </>;
  }
  return <>
    {[-1, 1].map((side) => <mesh key={`yoonchae-soft-column-${side}`} position={[side * (edge + sideWidth * .5), 0, .055]}>
      <boxGeometry args={[sideWidth - .12, featureHeight - .3, .025]} />
      <meshPhysicalMaterial color={profile.detail} metalness={.03} roughness={.62} />
    </mesh>)}
    {[-1, 1].map((side) => <mesh key={`yoonchae-gold-line-${side}`} position={[side * (edge + .055), 0, .073]}><boxGeometry args={[.018, featureHeight - .42, .02]} /><meshPhysicalMaterial color={profile.accent} metalness={.78} roughness={.25} /></mesh>)}
    <mesh position={[0, topY, .064]}><boxGeometry args={[artWidth * .64, .016, .018]} /><meshPhysicalMaterial color={profile.accent} metalness={.7} roughness={.3} /></mesh>
  </>;
}

// This is deliberately an architectural wall opening, not a framed picture.
// The four surround panels create a physical recessed aperture; the image sits
// inside it and every decorative finish remains outside the art's clear area.
export function FeatureWallInstallation({ frame }) {
  const texture = useLoader(THREE.TextureLoader, frame.src);
  const member = frame.id.split('-')[0];
  const profile = FEATURE_WALL_PROFILES[member] || FEATURE_WALL_PROFILES.megan;
  // The gallery field is intentionally low and generous: the portrait centre
  // lands close to the visitor's natural sightline, never in the ceiling band.
  // Its 2.45 m image aperture is 73% of the 3.35 m presentation wall.
  const imageSize = useMemo(() => getFrameSize(texture, 3.3, 2.45, 1), [texture]);
  const featureWidth = 5.52;
  const featureHeight = 3.35;
  const sideWidth = (featureWidth - imageSize.width) / 2;
  const topHeight = (featureHeight - imageSize.height) / 2;
  const wallZ = frame.position[2];

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  return <group name={`${frame.id}-integrated-feature-wall`} position={frame.position} rotation={frame.rotation} renderOrder={4}>
    {/* Deep well: set back into the existing stage wall, with no projection into
        the aisle or the art sightline. */}
    <mesh position={[0, 0, -.12]} castShadow receiveShadow>
      <boxGeometry args={[featureWidth, featureHeight, .14]} />
      <meshPhysicalMaterial color={profile.well} metalness={.26} roughness={.5} clearcoat={.12} />
    </mesh>

    {/* Four flush wall segments form the aperture itself; they are not a frame. */}
    <mesh position={[0, featureHeight / 2 - topHeight / 2, -.035]} castShadow receiveShadow>
      <boxGeometry args={[featureWidth, topHeight, .08]} />
      <meshPhysicalMaterial color={profile.panel} metalness={.16} roughness={.48} clearcoat={.08} />
    </mesh>
    <mesh position={[0, -featureHeight / 2 + topHeight / 2, -.035]} castShadow receiveShadow>
      <boxGeometry args={[featureWidth, topHeight, .08]} />
      <meshPhysicalMaterial color={profile.panel} metalness={.16} roughness={.48} clearcoat={.08} />
    </mesh>
    {[-1, 1].map((side) => <mesh key={`feature-surround-${side}`} position={[side * (imageSize.width / 2 + sideWidth / 2), 0, -.035]} castShadow receiveShadow>
      <boxGeometry args={[sideWidth, imageSize.height, .08]} />
      <meshPhysicalMaterial color={profile.panel} metalness={.16} roughness={.48} clearcoat={.08} />
    </mesh>)}

    <FeatureWallFinish profile={profile} artWidth={imageSize.width} artHeight={imageSize.height} featureWidth={featureWidth} featureHeight={featureHeight} />

    {/* Only a 12 mm brushed reveal defines the image edge. */}
    {[-1, 1].map((side) => <mesh key={`reveal-v-${side}`} position={[side * (imageSize.width / 2 + .006), 0, .028]}>
      <boxGeometry args={[.012, imageSize.height + .02, .015]} />
      <meshPhysicalMaterial color={profile.accent} metalness={.85} roughness={.24} />
    </mesh>)}
    {[-1, 1].map((side) => <mesh key={`reveal-h-${side}`} position={[0, side * (imageSize.height / 2 + .006), .028]}>
      <boxGeometry args={[imageSize.width + .02, .012, .015]} />
      <meshPhysicalMaterial color={profile.accent} metalness={.85} roughness={.24} />
    </mesh>)}
    {/* The illuminated reveal sits behind the image plane, producing a quiet
        wall wash rather than a visible LED object across the artwork. */}
    <mesh position={[0, 0, .02]}>
      <planeGeometry args={[imageSize.width + .055, imageSize.height + .055]} />
      <meshStandardMaterial color={profile.accent} emissive={profile.accent} emissiveIntensity={.32} transparent opacity={.34} />
    </mesh>
    <mesh position={[0, 0, .035]} castShadow receiveShadow>
      <planeGeometry args={[imageSize.width, imageSize.height]} />
      <meshStandardMaterial map={texture} roughness={.56} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
    </mesh>
    <pointLight position={[0, 0, .12]} color={profile.accent} intensity={.5} distance={3.8} decay={2} />
    <mesh position={[0, -featureHeight / 2 + .105, .018]}>
      <boxGeometry args={[featureWidth - .35, .014, .012]} />
      <meshStandardMaterial color={profile.accent} emissive={profile.accent} emissiveIntensity={.16} />
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
  // The entrance portrait and first pair of wall images are available
  // immediately. Remaining images are introduced in small batches so a room
  // opens promptly instead of decoding every gallery texture at once.
  const orderedFrames = useMemo(() => [...frames].sort((a, b) => (a.priority ?? 2) - (b.priority ?? 2)), [frames]);
  const [visibleCount, setVisibleCount] = useState(() => Math.min(5, orderedFrames.length));

  useEffect(() => {
    setVisibleCount(Math.min(5, orderedFrames.length));
    if (orderedFrames.length <= 5) return undefined;
    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        const next = Math.min(current + 2, orderedFrames.length);
        if (next === orderedFrames.length) window.clearInterval(timer);
        return next;
      });
    }, 220);
    return () => window.clearInterval(timer);
  }, [orderedFrames]);

  return <>
    {orderedFrames.slice(0, visibleCount).map((frame, index) => <Suspense key={frame.id || frame.src || index} fallback={null}>
      <AdaptiveGalleryFrame {...frame} frameStyle={{ ...frameStyle, ...frame.frameStyle }} />
    </Suspense>)}
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
