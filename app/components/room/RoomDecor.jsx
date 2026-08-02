import { useMemo } from 'react';
import * as THREE from 'three';
import { ROOM } from './roomConfig';

const ROSE_GOLD = '#b77b67';
const GOLD = '#c9924b';
const DARK_METAL = '#161513';

function RoseGoldMaterial() {
  return <meshPhysicalMaterial color={ROSE_GOLD} metalness={.84} roughness={.28} clearcoat={.08} />;
}

function GoldGlowMaterial({ intensity = .45 }) {
  return <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={intensity} roughness={.46} metalness={.38} />;
}

function CanvasWord({ text, width, height, font = 'italic 176px Georgia, serif', color = '#ffd2c1' }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = font;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = '#f0a38a';
    context.shadowBlur = 30;
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 4);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    result.needsUpdate = true;
    return result;
  }, [color, font, text]);

  return <mesh>
    <planeGeometry args={[width, height]} />
    <meshStandardMaterial map={texture} transparent emissive={color} emissiveIntensity={.62} depthWrite={false} />
  </mesh>;
}

function NeonLaraSign() {
  return <group position={[0, 4.22, ROOM.backWallZ + .34]}>
    <CanvasWord text="LARA" width={2.36} height={.62} />
  </group>;
}

function FeatureWallBorder() {
  const z = ROOM.backWallZ + .33;
  return <group>
    <mesh position={[0, 3.91, z]}><boxGeometry args={[4.76, .032, .035]} /><GoldGlowMaterial intensity={.42} /></mesh>
    <mesh position={[0, .79, z]}><boxGeometry args={[4.76, .032, .035]} /><GoldGlowMaterial intensity={.28} /></mesh>
    <mesh position={[-2.36, 2.35, z]}><boxGeometry args={[.032, 3.15, .035]} /><GoldGlowMaterial intensity={.36} /></mesh>
    <mesh position={[2.36, 2.35, z]}><boxGeometry args={[.032, 3.15, .035]} /><GoldGlowMaterial intensity={.36} /></mesh>
  </group>;
}

function StandingMicrophone() {
  const stageY = .37;
  const stageZ = ROOM.backWallZ + .95;
  return <group position={[0, stageY, stageZ]}>
    <mesh position={[0, .045, 0]}><cylinderGeometry args={[.34, .4, .09, 32]} /><RoseGoldMaterial /></mesh>
    <mesh position={[0, .72, 0]}><cylinderGeometry args={[.038, .052, 1.35, 20]} /><RoseGoldMaterial /></mesh>
    <mesh position={[0, 1.43, 0]}><cylinderGeometry args={[.092, .092, .18, 24]} /><RoseGoldMaterial /></mesh>
    <mesh position={[0, 1.62, 0]}><sphereGeometry args={[.15, 24, 16]} /><meshPhysicalMaterial color="#d7b4a4" metalness={.72} roughness={.26} /></mesh>
    <mesh position={[0, 1.62, .12]}><cylinderGeometry args={[.108, .108, .035, 24]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#392c28" metalness={.66} roughness={.38} /></mesh>
  </group>;
}

function DisplayCabinet({ position, width = 1.65, height = 1.02, shelves = 2 }) {
  const shelfOffsets = Array.from({ length: shelves }, (_, index) => (index + 1) * height / (shelves + 1) - height / 2);
  return <group position={position}>
    <mesh><boxGeometry args={[.36, height, width]} /><meshStandardMaterial color={DARK_METAL} metalness={.42} roughness={.52} /></mesh>
    {shelfOffsets.map((offset) => <mesh key={offset} position={[.2, offset, 0]}><boxGeometry args={[.03, .035, width * .88]} /><RoseGoldMaterial /></mesh>)}
    {[-height * .33, 0, height * .33].map((offset) => <mesh key={offset} position={[.214, offset, 0]}><boxGeometry args={[.014, .018, width * .8]} /><GoldGlowMaterial intensity={.32} /></mesh>)}
    <mesh position={[.2, 0, 0]}><boxGeometry args={[.018, height * .83, width * .84]} /><meshPhysicalMaterial color="#181a18" transparent opacity={.32} roughness={.13} metalness={.12} /></mesh>
  </group>;
}

function JewelryDisplay() {
  return <group position={[-3.54, .78, -1.55]}>
    <DisplayCabinet position={[0, 0, 0]} width={1.65} height={1.1} shelves={2} />
    {[-.48, 0, .48].map((offset) => <group key={offset} position={[.245, -.08, offset]}>
      <mesh><torusGeometry args={[.14, .018, 8, 18]} rotation={[Math.PI / 2, 0, 0]} /><RoseGoldMaterial /></mesh>
      <mesh position={[0, .29, 0]}><sphereGeometry args={[.04, 10, 8]} /><GoldGlowMaterial intensity={.25} /></mesh>
    </group>)}
    {[-.24, .24].map((offset) => <mesh key={offset} position={[.245, .35, offset]}><sphereGeometry args={[.045, 10, 8]} /><RoseGoldMaterial /></mesh>)}
  </group>;
}

function LuxuryAccessoryDisplay() {
  return <group position={[-3.54, .59, -5.85]}>
    <DisplayCabinet position={[0, 0, 0]} width={1.28} height={.76} shelves={1} />
    <mesh position={[.25, .18, 0]}><boxGeometry args={[.08, .2, .46]} /><meshStandardMaterial color="#211a18" roughness={.72} /></mesh>
    <mesh position={[.305, .3, 0]}><torusGeometry args={[.12, .02, 8, 16, Math.PI]} rotation={[0, Math.PI / 2, 0]} /><RoseGoldMaterial /></mesh>
  </group>;
}

function FashionDisplay() {
  return <group position={[3.53, 1.12, -1.35]}>
    <mesh position={[0, .38, 0]}><cylinderGeometry args={[.035, .035, 1.72, 14]} rotation={[Math.PI / 2, 0, 0]} /><RoseGoldMaterial /></mesh>
    <mesh position={[0, -.1, -.82]}><cylinderGeometry args={[.028, .028, .98, 14]} /><RoseGoldMaterial /></mesh>
    <mesh position={[0, -.1, .82]}><cylinderGeometry args={[.028, .028, .98, 14]} /><RoseGoldMaterial /></mesh>
    {[-.48, -.16, .16, .48].map((offset, index) => <group key={offset} position={[0, .02, offset]}>
      <mesh position={[.05, -.08, 0]}><boxGeometry args={[.15, .38, .17]} /><meshStandardMaterial color={index % 2 ? '#261b1c' : '#181719'} roughness={.86} /></mesh>
      <mesh position={[.04, .14, 0]}><torusGeometry args={[.11, .014, 6, 16]} rotation={[0, Math.PI / 2, 0]} /><RoseGoldMaterial /></mesh>
    </group>)}
  </group>;
}

function VinylDisplay() {
  return <group position={[3.53, .58, -5.85]}>
    <DisplayCabinet position={[0, 0, 0]} width={1.35} height={.76} shelves={1} />
    <mesh position={[.25, .2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.28, .28, .025, 32]} /><meshStandardMaterial color="#141313" metalness={.28} roughness={.4} /></mesh>
    <mesh position={[.27, .2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.065, .065, .03, 20]} /><RoseGoldMaterial /></mesh>
    <mesh position={[.31, .39, .15]} rotation={[0, 0, -.52]}><boxGeometry args={[.02, .26, .02]} /><RoseGoldMaterial /></mesh>
    <mesh position={[.31, .5, .26]}><sphereGeometry args={[.035, 10, 8]} /><RoseGoldMaterial /></mesh>
  </group>;
}

function ClawMarks({ side, y, z }) {
  const rotation = side < 0 ? Math.PI / 2 : -Math.PI / 2;
  return <group position={[side * 3.91, y, z]} rotation={[0, rotation, -.3]}>
    {[-.17, 0, .17].map((offset) => <mesh key={offset} position={[offset, 0, 0]} rotation={[0, 0, -.14]}><boxGeometry args={[.026, .72, .018]} /><meshStandardMaterial color="#0b0b0a" metalness={.1} roughness={.86} /></mesh>)}
  </group>;
}

function Vine({ side, z, height = 1.5 }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 3.88, .4, z + .32),
    new THREE.Vector3(side * 3.86, .9, z + .1),
    new THREE.Vector3(side * 3.87, 1.22, z - .22),
    new THREE.Vector3(side * 3.86, height, z - .06),
  ]), [height, side, z]);

  return <group>
    <mesh><tubeGeometry args={[curve, 32, .018, 6, false]} /><meshStandardMaterial color="#1f3022" roughness={.88} /></mesh>
    {[.72, 1.02, 1.3].filter((leafY) => leafY < height + .08).map((leafY) => <mesh key={leafY} position={[side * 3.83, leafY, z + (leafY % .2)]} rotation={[0, 0, side * -.55]}><sphereGeometry args={[.09, 10, 8]} /><meshStandardMaterial color="#263b28" roughness={.92} /></mesh>)}
  </group>;
}

function FeatureWallVines() {
  const makeCurve = (side) => new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 2.58, 4.4, ROOM.backWallZ + .38),
    new THREE.Vector3(side * 2.38, 4.15, ROOM.backWallZ + .4),
    new THREE.Vector3(side * 2.56, 3.86, ROOM.backWallZ + .4),
    new THREE.Vector3(side * 2.28, 3.55, ROOM.backWallZ + .4),
  ]);

  return <>
    {[-1, 1].map((side) => <group key={side}>
      <mesh><tubeGeometry args={[makeCurve(side), 28, .022, 6, false]} /><meshStandardMaterial color="#203126" roughness={.9} /></mesh>
      {[0, 1, 2].map((index) => <mesh key={index} position={[side * (2.43 + index * .035), 4.1 - index * .22, ROOM.backWallZ + .42]} rotation={[0, 0, side * (.42 + index * .12)]}><sphereGeometry args={[.085, 10, 8]} /><meshStandardMaterial color={index === 1 ? '#3a4a2c' : '#273724'} roughness={.9} /></mesh>)}
    </group>)}
  </>;
}

function MuseumLabel({ text, position, rotation }) {
  return <group position={position} rotation={rotation}>
    <CanvasWord text={text} width={.74} height={.19} font="600 44px Arial, sans-serif" color="#d1a56d" />
  </group>;
}

export default function LaraRoomDecor() {
  return <>
    <FeatureWallBorder />
    <StandingMicrophone />
    <NeonLaraSign />
    <FeatureWallVines />

    <JewelryDisplay />
    <LuxuryAccessoryDisplay />
    <FashionDisplay />
    <VinylDisplay />

    <MuseumLabel text="LUXURY COLLECTION" position={[-3.84, 1.65, -1.55]} rotation={[0, Math.PI / 2, 0]} />
    <MuseumLabel text="MUSIC ARCHIVE" position={[3.84, 1.44, -5.85]} rotation={[0, -Math.PI / 2, 0]} />

    <ClawMarks side={-1} y={3.02} z={-7.65} />
    <ClawMarks side={1} y={3.22} z={-6.9} />
    <Vine side={-1} z={-3.85} height={1.48} />
    <Vine side={1} z={-4.2} height={1.34} />
  </>;
}