import { useMemo } from 'react';
import * as THREE from 'three';
import { ROOM } from './roomConfig';
import { LuxuryFashionDisplay, LuxuryGlassDisplayCabinet, MusicExhibit } from './LuxuryExhibits';

const ROSE_GOLD = '#b77b67';
const GOLD = '#c9924b';

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

export default function LaraRoomDecor() {
  return <>
    <FeatureWallBorder />
    <StandingMicrophone />
    <NeonLaraSign />
    <FeatureWallVines />

    <LuxuryGlassDisplayCabinet position={[-3.56, .08, -1.9]} label="LUXURY COLLECTION" />
    <LuxuryFashionDisplay position={[3.56, .08, -1.45]} rotation={[0, Math.PI, 0]} label="FASHION STUDY" />
    <MusicExhibit position={[3.56, .08, -5.85]} rotation={[0, Math.PI, 0]} label="MUSIC ARCHIVE" />

    <ClawMarks side={-1} y={3.02} z={-7.65} />
    <ClawMarks side={1} y={3.22} z={-6.9} />
    <Vine side={-1} z={-3.85} height={1.48} />
    <Vine side={1} z={-4.2} height={1.34} />
  </>;
}