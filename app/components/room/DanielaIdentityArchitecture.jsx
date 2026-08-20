import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ROOM } from './roomConfig';

const BLACK = '#0d0f11';
const WINE = '#32151e';
const WALNUT = '#3a241b';
const BRASS = '#b58a5b';
const WARM = '#ffe1ba';

function Brass({ color = BRASS, roughness = .18 }) { return <meshPhysicalMaterial color={color} metalness={.9} roughness={roughness} clearcoat={.28} clearcoatRoughness={.1} />; }
function Marble({ color = BLACK }) { return <meshPhysicalMaterial color={color} metalness={.62} roughness={.16} clearcoat={.78} clearcoatRoughness={.08} reflectivity={.88} />; }

function FocusSpot({ position, target, intensity = 4.4 }) {
  const light = useRef(null); const focus = useRef(null);
  useLayoutEffect(() => { if (light.current && focus.current) light.current.target = focus.current; }, []);
  return <group><object3D ref={focus} position={target} /><spotLight ref={light} castShadow position={position} color={WARM} intensity={intensity} distance={9.4} angle={.5} penumbra={.86} decay={1.9} /></group>;
}

function DanielaLuxuryLighting() {
  const bays = [6.1, 2.05, -2.1, -6.15];
  return <group name="daniela-warm-performance-gallery-lighting">
    <ambientLight color="#f5ddc5" intensity={.88} />
    <hemisphereLight args={['#fff0de', '#2d1718', .92]} />
    <directionalLight castShadow position={[0, 7.2, 4.5]} color="#fff0d9" intensity={1.8} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    {[-1, 1].flatMap((side) => bays.map((z) => <pointLight key={`${side}-${z}`} position={[side * 3.3, 2.8, z]} color="#ffd7a1" intensity={2.3} distance={5.3} decay={1.85} />))}
    {bays.map((z) => <pointLight key={`cove-${z}`} position={[0, 4.35, z]} color="#ffe8ca" intensity={1.85} distance={6.3} decay={1.85} />)}
    <FocusSpot position={[-2.65, 4.34, 5.15]} target={[-3.55, 2.5, 5.05]} intensity={5.2} />
    <FocusSpot position={[2.65, 4.34, 5.15]} target={[3.55, 2.5, 5.05]} intensity={5.2} />
    <FocusSpot position={[-2.65, 4.3, -2.25]} target={[-3.55, 2.42, -2.25]} intensity={4.6} />
    <FocusSpot position={[2.65, 4.3, -2.25]} target={[3.55, 2.42, -2.25]} intensity={4.6} />
    <FocusSpot position={[0, 4.48, -7.6]} target={[0, .95, -8.7]} intensity={5.9} />
    {[-1, 1].flatMap((side) => bays.map((z) => <pointLight key={`floor-${side}-${z}`} position={[side * 3.52, .28, z]} color="#c88952" intensity={.62} distance={3.3} decay={1.8} />))}
  </group>;
}

function DanielaPerformanceFloor() {
  const veins = [[-2.45, 5.0, 5.0, -.13], [.7, 2.0, 6.4, .1], [2.15, -4.2, 5.5, -.12]];
  return <group name="daniela-black-marble-burgundy-vein-floor">
    <mesh position={[0, .065, -.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7.92, 19.1]} /><Marble /></mesh>
    {[-2, 0, 2].map((x, index) => <mesh key={x} position={[x, .072, -.5]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.98, 18.96]} /><Marble color={index === 1 ? '#181416' : '#101114'} /></mesh>)}
    {[-6.55, -1.82, 2.9, 7.15].map((z) => <mesh key={z} position={[0, .08, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.74, .022]} /><meshBasicMaterial color="#6f353d" transparent opacity={.32} /></mesh>)}
    {veins.map(([x, z, length, rotation], index) => <mesh key={index} position={[x, .085, z]} rotation={[-Math.PI / 2, 0, rotation]}><planeGeometry args={[.024, length]} /><meshBasicMaterial color={index % 2 ? '#823a46' : '#ae7955'} transparent opacity={.36} /></mesh>)}
  </group>;
}

function DanielaLayeredCeiling() {
  const layers = [[0, 4.92, -.5, 7.96, 19.1], [-.74, 4.66, 1.75, 4.8, 10.9], [1.18, 4.45, -2.1, 3.22, 11.25], [0, 4.25, -6.25, 4.7, 4.35]];
  return <group name="daniela-layered-walnut-and-champagne-ceiling">
    {layers.map(([x, y, z, width, depth], index) => <group key={index} position={[x, y, z]}>
      <mesh><boxGeometry args={[width, .18, depth]} /><meshPhysicalMaterial color={index === 1 ? WALNUT : index === 2 ? '#171719' : '#131416'} metalness={.24} roughness={index === 1 ? .3 : .38} clearcoat={.14} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 - .1), -.11, 0]}><boxGeometry args={[.035, .028, depth - .2]} /><Brass /></mesh>)}
      {[-1, 1].map((side) => <mesh key={side} position={[0, -.11, side * (depth / 2 - .1)]}><boxGeometry args={[width - .2, .028, .035]} /><meshStandardMaterial color={WARM} emissive="#d58a45" emissiveIntensity={2.0} /></mesh>)}
    </group>)}
  </group>;
}

function FlowChandelier() {
  const ribbons = useMemo(() => [
    new THREE.CatmullRomCurve3([new THREE.Vector3(-1.35, .1, -.35), new THREE.Vector3(-.3, -.1, .15), new THREE.Vector3(.45, .18, -.15), new THREE.Vector3(1.35, -.12, .35)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-1.18, -.12, .35), new THREE.Vector3(-.35, .18, -.2), new THREE.Vector3(.48, -.08, .22), new THREE.Vector3(1.18, .14, -.32)]),
  ], []);
  return <group name="daniela-flowing-brass-performance-chandelier" position={[0, 4.1, -.65]}>
    <mesh position={[0, .42, 0]}><cylinderGeometry args={[.03, .03, .62, 18]} /><Brass /></mesh>
    {ribbons.map((curve, index) => <mesh key={index} rotation={[index ? .24 : -.2, index ? -.22 : .18, 0]}><tubeGeometry args={[curve, 56, .045, 10, false]} /><Brass color={index ? '#e0b377' : '#9c724f'} roughness={.13} /></mesh>)}
    {[-.94, -.28, .34, .98].map((x, index) => <group key={x} position={[x, -.36 - (index % 2) * .13, index % 2 ? .2 : -.18]}><mesh><sphereGeometry args={[.09, 22, 16]} /><meshStandardMaterial color="#fff2dc" emissive="#f2b66e" emissiveIntensity={.75} /></mesh><mesh position={[0, .3 + (index % 2) * .12, 0]}><cylinderGeometry args={[.012, .012, .58, 12]} /><Brass /></mesh></group>)}
  </group>;
}

function DanceWaveDetail({ side, z, width = 2.4 }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-width / 2 + .2, -1.25, .12), new THREE.Vector3(-.3, -.15, .16), new THREE.Vector3(.24, .65, .14), new THREE.Vector3(width / 2 - .18, 1.42, .12)]), [width]);
  return <group name={`daniela-dance-wave-${side}-${z}`} position={[side * 3.84, 2.48, z]} rotation={rotation}>
    <mesh><boxGeometry args={[width, 4.38, .12]} /><meshPhysicalMaterial color="#191619" metalness={.45} roughness={.4} clearcoat={.12} /></mesh>
    <mesh position={[0, 0, .076]}><boxGeometry args={[width - .28, 3.96, .038]} /><meshPhysicalMaterial color={WALNUT} metalness={.18} roughness={.32} clearcoat={.14} /></mesh>
    <mesh position={[0, 0, .112]}><tubeGeometry args={[curve, 56, .038, 10, false]} /><Brass color="#c09769" roughness={.17} /></mesh>
    <mesh position={[0, -1.72, .12]}><boxGeometry args={[width - .42, .03, .025]} /><meshStandardMaterial color={WARM} emissive="#c98142" emissiveIntensity={1.1} /></mesh>
  </group>;
}

function SmokedMirror({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`daniela-smoked-dance-mirror-${side}-${z}`} position={[side * 3.83, 2.48, z]} rotation={rotation}>
    <mesh><boxGeometry args={[1.72, 4.3, .13]} /><meshPhysicalMaterial color="#141417" metalness={.82} roughness={.18} /></mesh>
    <mesh position={[0, 0, .082]}><boxGeometry args={[1.38, 3.92, .03]} /><meshPhysicalMaterial color="#4d3635" metalness={.86} roughness={.045} clearcoat={.5} transmission={.08} transparent opacity={.82} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * .67, 0, .108]}><boxGeometry args={[.03, 4.0, .025]} /><Brass color="#c59a67" roughness={.15} /></mesh>)}
    <mesh position={[0, 1.79, .112]}><boxGeometry args={[1.34, .024, .02]} /><meshStandardMaterial color={WARM} emissive="#cd8242" emissiveIntensity={.78} /></mesh>
  </group>;
}

function PerformanceStage() {
  const z = ROOM.backWallZ + 1.16;
  return <group name="daniela-floating-layered-performance-stage">
    <mesh position={[0, 2.48, ROOM.backWallZ + .18]}><boxGeometry args={[7.8, 4.68, .24]} /><Marble color="#161518" /></mesh>
    <mesh position={[0, 2.48, ROOM.backWallZ + .34]}><boxGeometry args={[5.94, 3.58, .06]} /><meshPhysicalMaterial color="#29131a" metalness={.22} roughness={.72} /></mesh>
    {[-2.62, 2.62].map((x) => <mesh key={x} position={[x, 2.48, ROOM.backWallZ + .41]}><boxGeometry args={[.055, 3.72, .04]} /><Brass color="#9f754e" roughness={.17} /></mesh>)}
    <mesh position={[0, .18, z]}><boxGeometry args={[6.52, .3, 2.28]} /><Marble /></mesh>
    <mesh position={[0, .36, z + .02]}><boxGeometry args={[5.78, .07, 1.84]} /><Brass color="#62432f" roughness={.21} /></mesh>
    <mesh position={[0, .43, z + .02]}><boxGeometry args={[4.82, .12, 1.38]} /><Marble color="#1a171a" /></mesh>
    <mesh position={[0, .5, z - .75]}><boxGeometry args={[4.25, .025, .025]} /><meshStandardMaterial color={WARM} emissive="#d68b44" emissiveIntensity={1.35} /></mesh>
  </group>;
}

export default function DanielaIdentityArchitecture() {
  return <group name="daniela-luxury-dance-performance-identity">
    <DanielaPerformanceFloor />
    <DanielaLayeredCeiling />
    <FlowChandelier />
    <DanceWaveDetail side={-1} z={5.9} width={2.48} />
    <SmokedMirror side={-1} z={1.65} />
    <DanceWaveDetail side={-1} z={-3.25} width={3.1} />
    <DanceWaveDetail side={1} z={5.45} width={3.15} />
    <SmokedMirror side={1} z={.75} />
    <DanceWaveDetail side={1} z={-4.1} width={2.5} />
    <PerformanceStage />
    <DanielaLuxuryLighting />
  </group>;
}
