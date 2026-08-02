import { useMemo } from 'react';
import * as THREE from 'three';

const ROSE_GOLD = '#b77b67';
const BLACK_METAL = '#111111';
const LED_GOLD = '#d49a50';

function RoseGoldMetal() {
  return <meshPhysicalMaterial color={ROSE_GOLD} metalness={.86} roughness={.27} clearcoat={.08} />;
}

function LedStrip({ position, size }) {
  return <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={LED_GOLD} emissive={LED_GOLD} emissiveIntensity={.42} roughness={.52} />
  </mesh>;
}

function MuseumLabel({ text, position, rotation = [0, 0, 0], width = .9 }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 160;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '600 54px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#d0a56d';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    result.needsUpdate = true;
    return result;
  }, [text]);

  return <group position={position} rotation={rotation}>
    <mesh><boxGeometry args={[.025, .19, width]} /><meshStandardMaterial color="#151312" metalness={.35} roughness={.64} /></mesh>
    <mesh position={[.016, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[width * .84, .1]} /><meshBasicMaterial map={texture} transparent depthWrite={false} /></mesh>
  </group>;
}

/** A self-contained, configurable smoke-glass cabinet that may be reused by any member theme. */
export function LuxuryGlassDisplayCabinet({
  position,
  rotation = [0, 0, 0],
  label = 'PRIVATE COLLECTION',
  width = 1.55,
  height = 2.15,
  depth = .44,
}) {
  const shelves = [-height * .17, height * .16];
  return <group position={position} rotation={rotation}>
    <mesh position={[-depth * .43, height / 2, 0]}><boxGeometry args={[.025, height, width]} /><meshStandardMaterial color="#171516" metalness={.42} roughness={.68} /></mesh>
    {[-width / 2, width / 2].map((z) => <mesh key={z} position={[0, height / 2, z]}><boxGeometry args={[depth, height, .055]} /><RoseGoldMetal /></mesh>)}
    <mesh position={[0, .035, 0]}><boxGeometry args={[depth, .07, width]} /><meshStandardMaterial color={BLACK_METAL} metalness={.55} roughness={.48} /></mesh>
    <mesh position={[0, height - .035, 0]}><boxGeometry args={[depth, .07, width]} /><meshStandardMaterial color={BLACK_METAL} metalness={.55} roughness={.48} /></mesh>
    {shelves.map((y) => <mesh key={y} position={[.02, y + height / 2, 0]}><boxGeometry args={[depth * .78, .03, width - .14]} /><RoseGoldMetal /></mesh>)}
    <mesh position={[depth / 2 + .012, height / 2, 0]}><boxGeometry args={[.016, height - .15, width - .13]} /><meshPhysicalMaterial color="#1b2022" transparent opacity={.27} roughness={.16} metalness={.08} clearcoat={.36} /></mesh>
    <LedStrip position={[depth / 2 + .023, height * .76, -width * .42]} size={[.015, height * .42, .018]} />
    <LedStrip position={[depth / 2 + .023, height * .76, width * .42]} size={[.015, height * .42, .018]} />
    <LedStrip position={[depth / 2 + .023, height * .52, 0]} size={[.015, .014, width * .76]} />

    {/* Minimal jewellery/accessory placeholders, intentionally leaving most of the cabinet open. */}
    <group position={[depth * .28, height * .54, 0]}>
      {[-.36, 0, .36].map((z) => <mesh key={z} position={[0, 0, z]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.12, .014, 8, 20]} /><RoseGoldMetal /></mesh>)}
    </group>
    <mesh position={[depth * .28, height * .25, 0]}><boxGeometry args={[.06, .18, .4]} /><meshStandardMaterial color="#221919" roughness={.82} /></mesh>
    <MuseumLabel text={label} position={[depth / 2 + .03, height * .1, 0]} rotation={[0, Math.PI / 2, 0]} width={width * .72} />
  </group>;
}

/** Open boutique rail with two carefully limited fashion placeholders. */
export function LuxuryFashionDisplay({ position, rotation = [0, 0, 0], label = 'FASHION STUDY' }) {
  const railLength = 2.05;
  const height = 2.22;
  return <group position={position} rotation={rotation}>
    {[-railLength / 2, railLength / 2].map((z) => <mesh key={z} position={[0, height / 2, z]}><cylinderGeometry args={[.035, .035, height, 14]} /><meshStandardMaterial color={BLACK_METAL} metalness={.7} roughness={.38} /></mesh>)}
    <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.04, .04, railLength, 16]} /><RoseGoldMetal /></mesh>
    <mesh position={[0, .035, 0]} rotation={[Math.PI / 2, 0, 0]}><boxGeometry args={[.52, .07, railLength + .18]} /><meshStandardMaterial color={BLACK_METAL} metalness={.66} roughness={.44} /></mesh>

    {/* Black faux-fur coat: layered, matte blocks rather than a dense mesh. */}
    <group position={[.05, 1.36, -.38]}>
      <mesh position={[0, -.32, 0]}><boxGeometry args={[.16, .78, .42]} /><meshStandardMaterial color="#100f10" roughness={.97} /></mesh>
      <mesh position={[.01, -.1, 0]}><boxGeometry args={[.19, .12, .5]} /><meshStandardMaterial color="#1a1718" roughness={.98} /></mesh>
      <mesh position={[.01, -.48, 0]}><boxGeometry args={[.2, .09, .47]} /><meshStandardMaterial color="#191617" roughness={.98} /></mesh>
      <mesh position={[.02, .18, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.13, .014, 6, 16]} /><RoseGoldMetal /></mesh>
    </group>

    {/* One editorial outfit placeholder. */}
    <group position={[.05, 1.42, .42]}>
      <mesh position={[0, -.25, 0]}><boxGeometry args={[.12, .62, .3]} /><meshStandardMaterial color="#3d2426" roughness={.88} /></mesh>
      <mesh position={[0, .11, 0]}><sphereGeometry args={[.07, 12, 10]} /><meshStandardMaterial color="#b77b67" metalness={.25} roughness={.55} /></mesh>
      <mesh position={[.01, .22, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.105, .012, 6, 16]} /><RoseGoldMetal /></mesh>
    </group>
    <MuseumLabel text={label} position={[.24, .29, 0]} rotation={[0, Math.PI / 2, 0]} width={.86} />
  </group>;
}

/** Compact music archive with a turntable, a vinyl display, and restrained record stack. */
export function MusicExhibit({ position, rotation = [0, 0, 0], label = 'MUSIC ARCHIVE' }) {
  const width = 1.7;
  const height = .76;
  const depth = .5;
  return <group position={position} rotation={rotation}>
    <mesh position={[0, height / 2, 0]}><boxGeometry args={[depth, height, width]} /><meshStandardMaterial color="#141313" metalness={.48} roughness={.55} /></mesh>
    <mesh position={[0, height + .035, 0]}><boxGeometry args={[depth + .04, .07, width + .04]} /><RoseGoldMetal /></mesh>
    <mesh position={[0, height + .09, -.22]}><boxGeometry args={[depth * .7, .05, .62]} /><meshStandardMaterial color="#1b1819" metalness={.48} roughness={.43} /></mesh>
    <mesh position={[0, height + .125, -.22]}><cylinderGeometry args={[.22, .22, .024, 32]} /><meshStandardMaterial color="#0d0d0e" metalness={.38} roughness={.42} /></mesh>
    <mesh position={[0, height + .143, -.22]}><cylinderGeometry args={[.045, .045, .03, 18]} /><RoseGoldMetal /></mesh>
    <mesh position={[.12, height + .26, .02]} rotation={[0, 0, -.42]}><boxGeometry args={[.018, .29, .018]} /><RoseGoldMetal /></mesh>
    <mesh position={[.18, height + .39, .13]}><sphereGeometry args={[.028, 8, 8]} /><RoseGoldMetal /></mesh>

    {[-.46, -.39, -.32].map((z, index) => <mesh key={z} position={[depth * .29, .22 + index * .035, z]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.2, .2, .026, 28]} /><meshStandardMaterial color={index === 1 ? '#3c2227' : '#111112'} metalness={.28} roughness={.46} /></mesh>)}
    <LedStrip position={[depth / 2 + .016, height * .73, 0]} size={[.015, .018, width * .78]} />
    <MuseumLabel text={label} position={[depth / 2 + .03, .2, .35]} rotation={[0, Math.PI / 2, 0]} width={.76} />
  </group>;
}