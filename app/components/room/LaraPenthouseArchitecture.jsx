import { useLayoutEffect, useRef } from 'react';
import { ROOM } from './roomConfig';
import LaraRoomDecor from './RoomDecor';

const MATTE_BLACK = '#101113';
const CHARCOAL = '#1b1d20';
const WALNUT = '#3c261b';
const MARBLE = '#121315';
const BRONZE = '#8c6348';
const GOLD = '#b8925c';
const WARM = '#ffe0b4';

function LaraMuseumSpot({ position, target, intensity = 2.25 }) {
  const light = useRef(null);
  const focus = useRef(null);
  useLayoutEffect(() => {
    if (light.current && focus.current) light.current.target = focus.current;
  }, []);
  return <group>
    <object3D ref={focus} position={target} />
    <spotLight ref={light} position={position} color={WARM} intensity={intensity} distance={8.2} angle={.43} penumbra={.9} decay={2} />
  </group>;
}

function LaraBlackMarbleFloor() {
  const veinRuns = [
    [-2.8, 5.1, 4.7, -.17],
    [1.1, 2.8, 5.8, .12],
    [-.4, -3.4, 4.4, -.08],
  ];
  return <group name="lara-polished-black-marble-floor">
    <mesh position={[0, .052, -.5]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.84, 18.9]} /><meshPhysicalMaterial color={MARBLE} metalness={.52} roughness={.2} clearcoat={.68} clearcoatRoughness={.1} /></mesh>
    {[-2.8, -.95, .95, 2.8].map((x, index) => <mesh key={x} position={[x, .058, -.5]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.66, 18.7]} /><meshPhysicalMaterial color={index % 2 ? '#17191c' : '#0d0f11'} metalness={.5} roughness={.22} clearcoat={.62} clearcoatRoughness={.1} /></mesh>)}
    {veinRuns.map(([x, z, length, rotation], index) => <mesh key={index} position={[x, .064, z]} rotation={[-Math.PI / 2, 0, rotation]}><planeGeometry args={[.018, length]} /><meshBasicMaterial color={index === 1 ? '#6e4a37' : '#9a7656'} transparent opacity={.24} /></mesh>)}
  </group>;
}

function LaraLayeredCeiling() {
  return <group name="lara-layered-black-wood-ceiling">
    <mesh position={[0, 4.91, -.5]}><boxGeometry args={[6.86, .12, 16.9]} /><meshPhysicalMaterial color={MATTE_BLACK} metalness={.5} roughness={.28} clearcoat={.12} /></mesh>
    <mesh position={[-.76, 4.76, -1.35]} rotation={[0, -.075, 0]}><boxGeometry args={[4.9, .2, 13.35]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.3} clearcoat={.2} /></mesh>
    <mesh position={[.75, 4.61, -.65]} rotation={[0, .055, 0]}><boxGeometry args={[3.42, .18, 10.35]} /><meshPhysicalMaterial color={CHARCOAL} metalness={.42} roughness={.24} clearcoat={.15} /></mesh>
    <mesh position={[-2.9, 4.67, -.85]} rotation={[0, -.075, 0]}><boxGeometry args={[.055, .03, 12.84]} /><meshStandardMaterial color={WARM} emissive="#bd7d43" emissiveIntensity={1.42} /></mesh>
    <mesh position={[2.38, 4.53, -.65]} rotation={[0, .055, 0]}><boxGeometry args={[.045, .025, 9.84]} /><meshStandardMaterial color={WARM} emissive="#bd7d43" emissiveIntensity={1.2} /></mesh>
    {[-5.5, -.85, 3.95].map((z, index) => <mesh key={z} position={[-.8 + index * .52, 4.59, z]} rotation={[0, -.075, 0]}><boxGeometry args={[4.35, .035, .05]} /><meshPhysicalMaterial color={BRONZE} metalness={.9} roughness={.14} /></mesh>)}
  </group>;
}

function LaraWallArchitecture() {
  const rightGrooves = [6.8, 4.55, 2.28, -.22, -2.75, -5.25, -7.35];
  return <group name="lara-asymmetrical-black-fashion-wall-architecture">
    <group name="lara-left-marble-velvet-feature-wall" position={[-3.94, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[-.35, 2.55, -.37]}><boxGeometry args={[16.25, 4.2, .06]} /><meshPhysicalMaterial color="#151316" metalness={.24} roughness={.7} clearcoat={.08} /></mesh>
      <mesh position={[-1.85, 2.56, -.335]}><boxGeometry args={[6.55, 3.9, .09]} /><meshPhysicalMaterial color={MARBLE} metalness={.64} roughness={.19} clearcoat={.7} clearcoatRoughness={.1} /></mesh>
      <mesh position={[-1.15, 2.56, -.275]}><boxGeometry args={[5.1, 3.48, .045]} /><meshPhysicalMaterial color="#211914" metalness={.04} roughness={.97} /></mesh>
      <mesh position={[-4.78, 2.56, -.27]}><boxGeometry args={[1.15, 3.75, .04]} /><meshPhysicalMaterial color="#30231c" metalness={.03} roughness={.98} /></mesh>
      <mesh position={[-4.2, 2.56, -.23]}><boxGeometry args={[.04, 3.48, .03]} /><meshPhysicalMaterial color={BRONZE} metalness={.93} roughness={.1} /></mesh>
      <mesh position={[1.58, 2.56, -.27]}><boxGeometry args={[2.12, 3.78, .055]} /><meshPhysicalMaterial color={WALNUT} metalness={.12} roughness={.28} clearcoat={.18} /></mesh>
      {[-.65, -.22, .22, .65].map((offset) => <mesh key={offset} position={[1.58 + offset, 2.56, -.225]}><boxGeometry args={[.045, 3.48, .024]} /><meshPhysicalMaterial color="#221611" metalness={.12} roughness={.38} /></mesh>)}
      <mesh position={[-1.85, 4.13, -.22]}><boxGeometry args={[6.04, .025, .018]} /><meshStandardMaterial color={WARM} emissive="#b9793e" emissiveIntensity={1.0} /></mesh>
      <mesh position={[-1.85, .99, -.22]}><boxGeometry args={[6.04, .022, .018]} /><meshStandardMaterial color="#cf9b5d" emissive="#8f552a" emissiveIntensity={.42} /></mesh>
      <mesh position={[0, .34, -.38]}><boxGeometry args={[17.0, .46, .05]} /><meshPhysicalMaterial color={MARBLE} metalness={.56} roughness={.2} clearcoat={.58} /></mesh>
      <mesh position={[0, 4.42, -.38]}><boxGeometry args={[17.0, .5, .05]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.3} clearcoat={.16} /></mesh>
    </group>
    <group name="lara-right-grooved-gallery-wall" position={[3.94, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[-.35, 2.55, -.37]}><boxGeometry args={[16.25, 4.2, .06]} /><meshPhysicalMaterial color="#17181b" metalness={.42} roughness={.34} clearcoat={.16} /></mesh>
      <mesh position={[0, .34, -.38]}><boxGeometry args={[17.0, .46, .05]} /><meshPhysicalMaterial color={MARBLE} metalness={.56} roughness={.2} clearcoat={.58} /></mesh>
      <mesh position={[0, 4.42, -.38]}><boxGeometry args={[17.0, .5, .05]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.3} clearcoat={.16} /></mesh>
      <mesh position={[0, 4.13, -.22]}><boxGeometry args={[16.5, .022, .018]} /><meshStandardMaterial color={WARM} emissive="#b9793e" emissiveIntensity={.8} /></mesh>
      {rightGrooves.map((z, index) => <group key={z} position={[z, 2.55, -.27]}>
        <mesh><boxGeometry args={[.14, 3.5 + (index % 3) * .16, .065]} /><meshPhysicalMaterial color={index % 2 ? WALNUT : CHARCOAL} metalness={index % 2 ? .13 : .66} roughness={index % 2 ? .3 : .2} clearcoat={.15} /></mesh>
        <mesh position={[.075, 0, .037]}><boxGeometry args={[.018, 3.24 + (index % 3) * .16, .018]} /><meshPhysicalMaterial color={BRONZE} metalness={.94} roughness={.1} /></mesh>
      </group>)}
    </group>
    <mesh position={[0, 2.48, ROOM.backWallZ + .22]}><boxGeometry args={[6.0, 3.9, .055]} /><meshPhysicalMaterial color="#171416" metalness={.48} roughness={.32} clearcoat={.16} /></mesh>
    <mesh position={[-2.6, 2.48, ROOM.backWallZ + .27]}><boxGeometry args={[.42, 3.48, .07]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.3} clearcoat={.16} /></mesh>
    <mesh position={[2.6, 2.48, ROOM.backWallZ + .27]}><boxGeometry args={[.42, 3.48, .07]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.3} clearcoat={.16} /></mesh>
    <mesh position={[0, 4.1, ROOM.backWallZ + .28]}><boxGeometry args={[5.08, .045, .025]} /><meshStandardMaterial color={WARM} emissive="#bc7c42" emissiveIntensity={1.08} /></mesh>
  </group>;
}

function LaraCinematicLighting() {
  return <group name="lara-penthouse-cinematic-lighting">
    <ambientLight color="#f0d0aa" intensity={.62} />
    <hemisphereLight args={['#ffe3c0', '#2a2020', .64]} />
    {[-1, 1].flatMap((side) => [5.75, .65, -5.15].map((z) => <pointLight key={`wall-wash-${side}-${z}`} position={[side * 3.42, 2.82, z]} color="#ffd7a5" intensity={1.18} distance={5.35} decay={2} />))}
    {[-1, 1].flatMap((side) => [5.75, .65, -5.15].map((z) => <pointLight key={`floor-uplight-${side}-${z}`} position={[side * 3.55, .28, z]} color="#d79b5d" intensity={.52} distance={3.9} decay={2} />))}
    <pointLight position={[0, 4.25, 4.9]} color={WARM} intensity={2.75} distance={9.2} decay={2} />
    <pointLight position={[0, 4.0, -4.2]} color="#ffe0ba" intensity={2.42} distance={8.6} decay={2} />
    <pointLight position={[0, 2.8, -7.4]} color="#f6c998" intensity={1.28} distance={5.5} decay={2} />
    <LaraMuseumSpot position={[-2.75, 4.35, 4.9]} target={[-3.55, 2.65, 5.0]} intensity={2.85} />
    <LaraMuseumSpot position={[2.75, 4.32, 4.9]} target={[3.55, 2.5, 5.0]} intensity={2.65} />
    <LaraMuseumSpot position={[-2.65, 4.15, .35]} target={[-3.55, 2.55, .95]} intensity={2.3} />
    <LaraMuseumSpot position={[2.65, 4.16, -.2]} target={[3.55, 2.48, .1]} intensity={2.35} />
  </group>;
}

function LaraPenthouseSurfaces() {
  return <group name="lara-premium-penthouse-surfaces">
    <LaraBlackMarbleFloor />
    <LaraLayeredCeiling />
    <LaraWallArchitecture />
    <LaraCinematicLighting />
  </group>;
}

export default function LaraPenthouseArchitecture({ preset = 'lara' }) {
  return <>
    <LaraRoomDecor preset={preset} />
    <LaraPenthouseSurfaces />
  </>;
}
