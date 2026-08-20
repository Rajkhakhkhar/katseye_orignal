import { useLayoutEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ROOM } from './roomConfig';

const BLACK = '#0a0c0e';
const OAK = '#302019';
const BRONZE = '#906447';
const GOLD = '#c99a61';
const WARM = '#ffe1bc';

function Metal({ color = BRONZE, roughness = .16 }) {
  return <meshPhysicalMaterial color={color} metalness={.92} roughness={roughness} clearcoat={.28} clearcoatRoughness={.1} />;
}

function Marble({ color = BLACK }) {
  return <meshPhysicalMaterial color={color} metalness={.62} roughness={.14} clearcoat={.82} clearcoatRoughness={.075} reflectivity={.9} />;
}

function LeopardLeather() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3a281b';
    ctx.fillRect(0, 0, 512, 512);
    [[72, 70, 31], [198, 54, 23], [328, 104, 39], [447, 64, 28], [111, 201, 29], [251, 190, 42], [409, 219, 32], [53, 342, 38], [190, 323, 26], [324, 350, 45], [457, 371, 32], [109, 454, 27], [256, 447, 35], [390, 468, 24]].forEach(([x, y, radius], index) => {
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fillStyle = index % 2 ? '#17110e' : '#0d0b0a'; ctx.fill();
      ctx.beginPath(); ctx.arc(x + radius * .18, y - radius * .12, radius * .53, 0, Math.PI * 2); ctx.fillStyle = '#8c623e'; ctx.fill();
    });
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    result.wrapS = result.wrapT = THREE.RepeatWrapping;
    result.repeat.set(1.45, 2.2);
    return result;
  }, []);
  return <meshPhysicalMaterial map={texture} bumpMap={texture} bumpScale={.026} color="#a07a50" roughness={.82} metalness={.03} clearcoat={.05} />;
}

function Spot({ position, target, intensity = 5.8, angle = .5 }) {
  const lamp = useRef(null);
  const focus = useRef(null);
  useLayoutEffect(() => { if (lamp.current && focus.current) lamp.current.target = focus.current; }, []);
  return <group><object3D ref={focus} position={target} /><spotLight ref={lamp} castShadow position={position} color={WARM} intensity={intensity} distance={11} decay={1.8} angle={angle} penumbra={.84} /></group>;
}

function BrightHotelGalleryLighting() {
  const bays = [6.6, 2.4, -1.8, -5.9];
  return <group name="lara-daytime-luxury-gallery-lighting">
    <ambientLight color="#ffe1c2" intensity={1.24} />
    <hemisphereLight args={['#fff0de', '#6a5141', 1.28]} />
    <directionalLight castShadow position={[0, 7.4, 3]} color="#fff0da" intensity={2.25} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    {[-1, 1].flatMap((side) => bays.map((z) => <pointLight key={`${side}-${z}`} position={[side * 3.3, 2.72, z]} color="#ffdbad" intensity={3.2} distance={5.6} decay={1.75} />))}
    {bays.map((z) => <pointLight key={z} position={[0, 4.35, z]} color="#ffe9d0" intensity={2.55} distance={6.7} decay={1.8} />)}
    <Spot position={[-2.7, 4.45, 4.8]} target={[-3.55, 2.45, 4.8]} intensity={6.8} />
    <Spot position={[-2.7, 4.45, -.65]} target={[-3.55, 2.4, -.7]} intensity={6.2} />
    <Spot position={[2.7, 4.45, 3.3]} target={[3.55, 2.45, 3.1]} intensity={6.0} />
    <Spot position={[2.7, 4.4, -4.7]} target={[3.55, 2.35, -4.8]} intensity={5.7} />
    <Spot position={[-2.65, 4.35, -5.35]} target={[-3.5, 2.25, -5.45]} intensity={5.7} />
    <Spot position={[2.68, 4.38, 6.1]} target={[3.5, 2.55, 5.05]} intensity={5.8} />
    <Spot position={[0, 4.48, -7.45]} target={[0, 1.1, -8.75]} intensity={7.1} angle={.62} />
    <pointLight position={[2.65, .62, -5.0]} color="#edb170" intensity={2.4} distance={4.1} decay={1.7} />
    {[-1, 1].flatMap((side) => [6.55, 1.3, -3.15, -7.05].map((z) => <pointLight key={`floor-${side}-${z}`} position={[side * 3.47, .32, z]} color="#d99a59" intensity={1.08} distance={3.45} decay={1.65} />))}
  </group>;
}

function MarbleSlabFloor() {
  const veins = [[-2.3, 5.3, 5.0, -.12], [.95, 2.1, 6.6, .1], [-.45, -4.0, 5.6, -.18], [2.35, -7, 2.8, .07]];
  return <group name="lara-new-oversized-black-marble-slab-floor">
    <mesh position={[0, .075, -.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7.94, 19.12]} /><Marble /></mesh>
    {[-2, 0, 2].map((x, index) => <mesh key={x} position={[x, .081, -.5]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.985, 19]} /><Marble color={index === 1 ? '#15181a' : '#0d1012'} /></mesh>)}
    {[-6.7, -2.1, 2.55, 6.95].map((z) => <mesh key={z} position={[0, .09, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.8, .025]} /><meshBasicMaterial color="#956b4b" transparent opacity={.42} /></mesh>)}
    {veins.map(([x, z, length, turn], index) => <mesh key={index} position={[x, .095, z]} rotation={[-Math.PI / 2, 0, turn]}><planeGeometry args={[.029, length]} /><meshBasicMaterial color={index % 2 ? '#a9794e' : '#d8a970'} transparent opacity={.4} /></mesh>)}
  </group>;
}

function FloatingCeiling() {
  const panels = [
    [-1.12, 4.68, 2.85, 4.55, 10.6, -.055],
    [1.04, 4.47, -1.85, 3.92, 11.4, .04],
    [-.12, 4.27, -6.25, 4.7, 4.2, -.02],
  ];
  return <group name="lara-new-multi-depth-black-oak-ceiling">
    <mesh position={[0, 4.94, -.5]}><boxGeometry args={[7.98, .14, 19.14]} /><meshPhysicalMaterial color="#101113" metalness={.4} roughness={.38} /></mesh>
    {panels.map(([x, y, z, width, depth, turn], index) => <group key={index} position={[x, y, z]} rotation={[0, turn, 0]}>
      <mesh><boxGeometry args={[width, .24, depth]} /><meshPhysicalMaterial color={index === 1 ? '#15171a' : OAK} metalness={.24} roughness={.3} clearcoat={.16} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[0, -.14, side * (depth / 2 - .13)]}><boxGeometry args={[width - .22, .027, .04]} /><meshStandardMaterial color={WARM} emissive="#dc9349" emissiveIntensity={2.55} /></mesh>)}
      {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 - .13), -.14, 0]}><boxGeometry args={[.04, .027, depth - .24]} /><Metal /></mesh>)}
    </group>)}
  </group>;
}

function WallStrip({ length, y = 1.85, depth = .31 }) {
  return <mesh position={[0, y, depth]}><boxGeometry args={[length, .055, .03]} /><Metal /></mesh>;
}

function SideWall({ side }) {
  const feature = side < 0;
  return <group name={feature ? 'lara-leopard-marble-feature-wall' : 'lara-bronze-groove-gallery-wall'} position={[side * 3.95, 2.5, -.5]} rotation={[0, feature ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh><boxGeometry args={[19.12, 4.9, .2]} /><meshPhysicalMaterial color={feature ? '#131114' : '#17191b'} metalness={.4} roughness={.36} clearcoat={.12} /></mesh>
    <mesh position={[0, -2.16, .13]}><boxGeometry args={[18.9, .45, .13]} /><Marble color="#1a1d20" /></mesh>
    <mesh position={[0, 2.16, .13]}><boxGeometry args={[18.9, .43, .13]} /><meshPhysicalMaterial color={OAK} metalness={.2} roughness={.3} clearcoat={.16} /></mesh>
    {feature ? <>
      <mesh position={[-3.35, .04, .14]}><boxGeometry args={[6.4, 3.74, .18]} /><Marble /></mesh>
      <mesh position={[-3.35, .04, .25]}><boxGeometry args={[5.68, 3.1, .045]} /><LeopardLeather /></mesh>
      {[-1.6, 1.6].map((y) => <mesh key={y} position={[-3.35, y, .285]}><boxGeometry args={[5.84, .035, .025]} /><meshStandardMaterial color={WARM} emissive="#dc9349" emissiveIntensity={y > 0 ? 2.4 : .9} /></mesh>)}
      <mesh position={[2.25, .04, .15]}><boxGeometry args={[3.95, 3.78, .19]} /><meshPhysicalMaterial color="#181619" metalness={.42} roughness={.42} /></mesh>
      <mesh position={[2.25, .04, .255]}><boxGeometry args={[3.35, 3.17, .045]} /><meshPhysicalMaterial color={OAK} metalness={.16} roughness={.3} clearcoat={.16} /></mesh>
      {[-1.15, -.38, .38, 1.15].map((offset) => <mesh key={offset} position={[2.25 + offset, .04, .292]}><boxGeometry args={[.045, 3.15, .025]} /><Metal /></mesh>)}
      <mesh position={[6.0, .04, .15]}><boxGeometry args={[2.2, 3.78, .18]} /><meshPhysicalMaterial color="#201916" metalness={.08} roughness={.93} /></mesh>
      <mesh position={[6.0, .04, .255]}><boxGeometry args={[1.72, 3.2, .045]} /><meshPhysicalMaterial color="#241911" metalness={.1} roughness={.97} /></mesh>
      <group name="lara-claw-mark-bronze-inlays" position={[6.0, .08, .292]} rotation={[0, 0, -.2]}>
        {[-.34, 0, .34].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[.035, 2.16, .024]} /><Metal color={GOLD} roughness={.12} /></mesh>)}
      </group>
    </> : <>
      {[7, 4.2, 1.3, -1.5, -4.35, -7.25].map((x, index) => <group key={x} position={[x, .04, .16]}>
        <mesh><boxGeometry args={[index % 2 ? .27 : .17, 3.75 - (index % 3) * .18, .15]} /><meshPhysicalMaterial color={index % 2 ? OAK : '#1d2023'} metalness={index % 2 ? .17 : .74} roughness={index % 2 ? .3 : .19} clearcoat={.16} /></mesh>
        <mesh position={[index % 2 ? .145 : .095, 0, .09]}><boxGeometry args={[.03, 3.48 - (index % 3) * .18, .022]} /><Metal /></mesh>
      </group>)}
      <mesh position={[3.04, .04, .17]}><boxGeometry args={[2.05, 3.82, .16]} /><meshPhysicalMaterial color="#191517" metalness={.32} roughness={.48} /></mesh>
      <mesh position={[3.04, .04, .26]}><boxGeometry args={[1.58, 3.18, .03]} /><meshPhysicalMaterial color="#34251b" metalness={.08} roughness={.8} /></mesh>
    </>}
    <WallStrip length={18.45} />
  </group>;
}

function BackStage() {
  const stageZ = ROOM.backWallZ + 1.2;
  return <group name="lara-rebuilt-marble-performance-stage">
    <mesh position={[0, 2.47, ROOM.backWallZ + .17]}><boxGeometry args={[7.86, 4.72, .25]} /><Marble color="#1a1d20" /></mesh>
    <mesh position={[0, 2.48, ROOM.backWallZ + .32]}><boxGeometry args={[5.84, 3.58, .08]} /><meshPhysicalMaterial color="#191114" metalness={.18} roughness={.84} /></mesh>
    <mesh position={[0, 2.48, ROOM.backWallZ + .38]}><boxGeometry args={[4.98, 2.78, .04]} /><LeopardLeather /></mesh>
    {[-2.8, 2.8].map((x) => <mesh key={x} position={[x, 2.47, ROOM.backWallZ + .44]}><boxGeometry args={[.09, 3.72, .08]} /><Metal /></mesh>)}
    {[-1.85, 1.85].map((x) => <mesh key={x} position={[x, 2.47, ROOM.backWallZ + .45]}><boxGeometry args={[.03, 3.22, .04]} /><Metal color={GOLD} /></mesh>)}
    <mesh position={[0, 4.13, ROOM.backWallZ + .45]}><boxGeometry args={[5.72, .052, .04]} /><meshStandardMaterial color={WARM} emissive="#dc9349" emissiveIntensity={2.15} /></mesh>
    <mesh position={[0, .2, stageZ]} receiveShadow><boxGeometry args={[6.68, .35, 2.42]} /><Marble /></mesh>
    <mesh position={[0, .31, stageZ + .04]}><cylinderGeometry args={[2.28, 2.46, .14, 72]} /><Marble color="#151719" /></mesh>
    <mesh position={[0, .405, stageZ + .04]}><cylinderGeometry args={[1.88, 2.12, .08, 72]} /><Metal color="#4d3426" roughness={.18} /></mesh>
    <mesh position={[0, .48, stageZ + .04]}><cylinderGeometry args={[1.54, 1.72, .12, 72]} /><Marble color="#1b1d20" /></mesh>
    <mesh position={[0, .55, stageZ + .04]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.44, .03, 10, 72]} /><Metal color={GOLD} /></mesh>
    <pointLight position={[0, .76, stageZ + .35]} color="#f2b76d" intensity={1.75} distance={4.2} decay={1.8} />
  </group>;
}

function StageMicrophone() {
  const stageZ = ROOM.backWallZ + 1.2;
  return <group name="lara-vocal-microphone" position={[0, .47, stageZ]}>
    <mesh position={[0, .05, 0]}><cylinderGeometry args={[.31, .36, .1, 40]} /><Marble color="#1a1c1e" /></mesh>
    <mesh position={[0, .8, 0]}><cylinderGeometry args={[.035, .052, 1.45, 22]} /><Metal /></mesh>
    <mesh position={[0, 1.55, 0]}><capsuleGeometry args={[.12, .24, 8, 18]} /><meshPhysicalMaterial color="#d7cec3" metalness={.82} roughness={.25} /></mesh>
  </group>;
}

function FashionMannequin() {
  return <group name="lara-hero-fashion-mannequin" position={[-3.52, 1.95, 2.35]} rotation={[0, Math.PI / 2, 0]}>
    <mesh position={[0, .05, 0]}><boxGeometry args={[.66, .13, .72]} /><Marble /></mesh>
    <mesh position={[0, 1.02, 0]} scale={[.28, .78, .37]}><capsuleGeometry args={[1, 1, 10, 20]} /><meshPhysicalMaterial color="#151215" metalness={.28} roughness={.52} clearcoat={.1} /></mesh>
    <mesh position={[0, 1.92, 0]}><sphereGeometry args={[.2, 28, 20]} /><meshPhysicalMaterial color="#c49a79" metalness={.5} roughness={.3} /></mesh>
    <mesh position={[0, 1.12, .02]} scale={[.34, .85, .45]}><capsuleGeometry args={[1, 1, 10, 20]} /><LeopardLeather /></mesh>
    <mesh position={[0, .75, .39]}><boxGeometry args={[.13, 1.45, .05]} /><Metal color={GOLD} /></mesh>
  </group>;
}

function PantherSculpture() {
  return <group name="lara-black-panther-sculpture" position={[2.52, .12, -4.75]} rotation={[0, -.42, 0]}>
    <mesh position={[0, .16, 0]}><cylinderGeometry args={[.68, .8, .32, 48]} /><Marble /></mesh>
    <mesh position={[0, .35, 0]}><cylinderGeometry args={[.61, .67, .06, 48]} /><Metal /></mesh>
    <mesh position={[0, .66, 0]} scale={[.7, .26, .34]}><sphereGeometry args={[1, 32, 20]} /><meshPhysicalMaterial color="#040507" metalness={.72} roughness={.2} clearcoat={.34} clearcoatRoughness={.08} /></mesh>
    <mesh position={[-.58, .72, -.03]} scale={[.26, .2, .22]}><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#040507" metalness={.72} roughness={.2} clearcoat={.34} /></mesh>
    <mesh position={[.65, .62, .04]} rotation={[0, -.48, .2]}><capsuleGeometry args={[.07, .68, 8, 16]} /><meshPhysicalMaterial color="#040507" metalness={.72} roughness={.2} clearcoat={.34} /></mesh>
  </group>;
}

function PerfumeMonolith() {
  return <group name="lara-luxury-perfume-sculpture" position={[-3.55, .2, 6.65]} rotation={[0, Math.PI / 2, 0]}>
    <mesh position={[0, .12, 0]}><boxGeometry args={[1.08, .24, 1.08]} /><Marble /></mesh>
    <mesh position={[0, .68, 0]}><cylinderGeometry args={[.35, .44, .95, 40]} /><meshPhysicalMaterial color="#241710" metalness={.3} roughness={.18} clearcoat={.65} clearcoatRoughness={.1} /></mesh>
    <mesh position={[0, 1.22, 0]}><cylinderGeometry args={[.22, .22, .2, 32]} /><Metal color={GOLD} /></mesh>
    <mesh position={[0, .72, .37]}><torusGeometry args={[.27, .026, 10, 32]} /><Metal color={GOLD} /></mesh>
  </group>;
}

function ArchiveLabel({ title, subtitle = 'PRIVATE COLLECTION' }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#171114';
    ctx.fillRect(0, 0, 900, 1200);
    ctx.strokeStyle = '#bb8957';
    ctx.lineWidth = 18;
    ctx.strokeRect(38, 38, 824, 1124);
    ctx.fillStyle = '#d7ad76';
    ctx.font = '700 120px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('LARA', 450, 430);
    ctx.font = '500 54px Arial';
    ctx.fillStyle = '#f1d3a1';
    ctx.fillText(title, 450, 525);
    ctx.font = '28px Arial';
    ctx.fillStyle = '#9c7451';
    ctx.fillText(subtitle, 450, 602);
    ctx.fillStyle = '#7b5337';
    ctx.fillRect(150, 770, 600, 2);
    ctx.font = 'italic 38px Georgia';
    ctx.fillStyle = '#cba06d';
    ctx.fillText('L / R', 450, 850);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return result;
  }, [title, subtitle]);
  return <mesh position={[.285, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.05, 1.48]} /><meshStandardMaterial map={texture} roughness={.52} /></mesh>;
}

function MuseumCase({ side, z, width, height = 3.65, title, children }) {
  const rotation = side < 0 ? [0, 0, 0] : [0, Math.PI, 0];
  return <group name={`lara-${title.toLowerCase().replaceAll(' ', '-')}-museum-case`} position={[side * 3.68, height / 2 + .3, z]} rotation={rotation}>
    <mesh><boxGeometry args={[.52, height, width]} /><meshPhysicalMaterial color="#141518" metalness={.72} roughness={.24} clearcoat={.24} /></mesh>
    <mesh position={[.276, 0, 0]}><boxGeometry args={[.035, height - .28, width - .28]} /><meshPhysicalMaterial color="#39251b" metalness={.16} roughness={.66} /></mesh>
    <mesh position={[.302, 0, 0]}><boxGeometry args={[.018, height - .2, width - .16]} /><meshPhysicalMaterial color="#654e44" transparent opacity={.24} transmission={.45} thickness={.08} ior={1.45} metalness={.08} roughness={.055} clearcoat={.58} clearcoatRoughness={.06} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[.318, direction * (height / 2 - .12), 0]}><boxGeometry args={[.025, .035, width - .22]} /><meshStandardMaterial color={WARM} emissive="#d99046" emissiveIntensity={1.7} /></mesh>)}
    <mesh position={[.31, -height / 2 + .18, 0]}><boxGeometry args={[.05, .06, width - .18]} /><Metal color={GOLD} /></mesh>
    <ArchiveLabel title={title} />
    <group position={[.34, 0, 0]}>{children}</group>
  </group>;
}

function PortraitFrame({ side, z, title, height = 3.15, width = 2.05 }) {
  const portrait = useLoader(THREE.TextureLoader, '/hero-lara-hq.png');
  portrait.colorSpace = THREE.SRGBColorSpace;
  const rotation = side < 0 ? [0, 0, 0] : [0, Math.PI, 0];
  return <group name={`lara-${title.toLowerCase().replaceAll(' ', '-')}-portrait`} position={[side * 3.64, 2.6, z]} rotation={rotation}>
    <mesh><boxGeometry args={[.2, height + .34, width + .34]} /><meshPhysicalMaterial color="#201714" metalness={.64} roughness={.22} clearcoat={.18} /></mesh>
    <mesh position={[.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[width + .12, height + .12]} /><Metal color={GOLD} roughness={.13} /></mesh>
    <mesh position={[.126, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[width, height]} /><meshStandardMaterial map={portrait} roughness={.48} /></mesh>
    <mesh position={[.142, -height / 2 + .22, 0]}><boxGeometry args={[.026, .05, width - .18]} /><meshStandardMaterial color={WARM} emissive="#bf7134" emissiveIntensity={1.1} /></mesh>
  </group>;
}

function VinylSet() {
  return <group name="lara-vinyl-and-album-memorabilia" position={[.34, -.58, 0]}>
    {[-.66, -.22, .22, .66].map((z, index) => <group key={z} position={[0, .22 + (index % 2) * .62, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh><cylinderGeometry args={[.33, .33, .042, 40]} /><meshPhysicalMaterial color={index === 2 ? '#432129' : '#090a0c'} metalness={.45} roughness={.28} clearcoat={.1} /></mesh>
      <mesh position={[0, .024, 0]}><cylinderGeometry args={[.1, .1, .048, 24]} /><Metal color={GOLD} /></mesh>
    </group>)}
    <mesh position={[-.03, -1.14, 0]}><boxGeometry args={[.1, .08, 1.7]} /><meshPhysicalMaterial color={OAK} metalness={.18} roughness={.32} /></mesh>
  </group>;
}

function JewelryAndSunglasses() {
  return <group name="lara-jewelry-sunglasses-and-perfume" position={[.34, -.55, 0]}>
    <mesh position={[0, -.95, 0]}><boxGeometry args={[.12, .16, 1.72]} /><meshPhysicalMaterial color="#181114" metalness={.3} roughness={.62} /></mesh>
    <mesh position={[0, .18, -.48]} scale={[.17, .34, .21]}><sphereGeometry args={[1, 22, 16]} /><meshStandardMaterial color="#161316" roughness={.88} /></mesh>
    <mesh position={[.035, .34, -.48]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.29, .018, 10, 30]} /><Metal color={GOLD} /></mesh>
    <mesh position={[.035, -.04, -.48]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.11, .014, 8, 24]} /><Metal color="#e3bb78" /></mesh>
    {[-.2, .2].map((z) => <mesh key={z} position={[.02, .45, z + .37]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.16, .026, 8, 24]} /><meshPhysicalMaterial color="#0b0c0f" metalness={.7} roughness={.2} clearcoat={.2} /></mesh>)}
    <mesh position={[.02, .42, .37]}><boxGeometry args={[.035, .028, .42]} /><Metal color={GOLD} /></mesh>
    <mesh position={[0, -.37, .5]}><cylinderGeometry args={[.14, .18, .44, 28]} /><meshPhysicalMaterial color="#2b1810" metalness={.3} roughness={.18} clearcoat={.6} /></mesh>
    <mesh position={[0, -.1, .5]}><cylinderGeometry args={[.09, .09, .12, 24]} /><Metal color={GOLD} /></mesh>
  </group>;
}

function DesignerBootPair() {
  return <group name="lara-designer-boots-and-handbag" position={[.34, -.62, 0]}>
    {[-.42, .12].map((z) => <group key={z} position={[0, -.25, z]}>
      <mesh position={[0, .09, .12]}><boxGeometry args={[.22, .18, .52]} /><meshPhysicalMaterial color="#0d0f11" metalness={.3} roughness={.5} clearcoat={.15} /></mesh>
      <mesh position={[0, .53, -.06]}><boxGeometry args={[.18, .74, .25]} /><meshPhysicalMaterial color="#141316" metalness={.24} roughness={.58} /></mesh>
      <mesh position={[0, .1, -.2]}><boxGeometry args={[.18, .06, .14]} /><Metal color={GOLD} /></mesh>
    </group>)}
    <mesh position={[0, .16, .54]}><boxGeometry args={[.16, .46, .48]} /><meshPhysicalMaterial color="#291a16" metalness={.2} roughness={.36} clearcoat={.26} /></mesh>
    <mesh position={[0, .46, .54]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.16, .025, 8, 22, Math.PI]} /><Metal color={GOLD} /></mesh>
  </group>;
}

function AwardsAndConcertMemorabilia() {
  return <group name="lara-awards-and-concert-memorabilia" position={[.34, -.52, 0]}>
    {[-.45, .1, .55].map((z, index) => <group key={z} position={[0, -.38 + index * .28, z]}>
      <mesh><cylinderGeometry args={[.19, .24, .12, 28]} /><Marble color="#17191c" /></mesh>
      <mesh position={[0, .32, 0]}><capsuleGeometry args={[.11, .35, 8, 16]} /><Metal color={index === 1 ? '#d9b16f' : GOLD} /></mesh>
    </group>)}
    <mesh position={[0, .78, -.6]}><cylinderGeometry args={[.045, .06, .78, 20]} /><Metal /></mesh>
    <mesh position={[0, 1.25, -.6]}><capsuleGeometry args={[.12, .24, 8, 16]} /><meshPhysicalMaterial color="#ded6cd" metalness={.82} roughness={.25} /></mesh>
  </group>;
}

function FoldedStageOutfits() {
  return <group name="lara-folded-performance-outfits" position={[.34, -.7, 0]}>
    {[-.58, 0, .58].map((z, index) => <group key={z} position={[0, index * .48 - .2, z]}>
      <mesh><boxGeometry args={[.12, .22, .42]} /><meshPhysicalMaterial color={index === 1 ? '#422229' : '#191116'} metalness={.16} roughness={.7} /></mesh>
      <mesh position={[.07, .13, 0]}><boxGeometry args={[.025, .03, .34]} /><Metal color={index === 1 ? GOLD : BRONZE} /></mesh>
    </group>)}
  </group>;
}

function LaraMuseumCollections() {
  return <group name="lara-complete-curated-museum-collections">
    <PortraitFrame side={-1} z={5.0} title="editorial portrait" height={3.7} width={2.35} />
    <PortraitFrame side={-1} z={-.9} title="performance photograph" height={3.1} width={1.85} />
    <MuseumCase side={-1} z={-5.55} width={2.1} height={3.9} title="stage wardrobe"><FoldedStageOutfits /></MuseumCase>
    <MuseumCase side={1} z={5.05} width={2.45} height={4.05} title="fashion archive"><DesignerBootPair /></MuseumCase>
    <MuseumCase side={1} z={.55} width={2.65} height={3.72} title="music archive"><VinylSet /></MuseumCase>
    <MuseumCase side={1} z={-4.85} width={2.38} height={3.9} title="awards archive"><AwardsAndConcertMemorabilia /></MuseumCase>
    <MuseumCase side={-1} z={-2.9} width={1.75} height={3.25} title="jewelry archive"><JewelryAndSunglasses /></MuseumCase>
    <group name="lara-handwritten-lyric-display" position={[-3.58, 2.44, -7.75]} rotation={[0, 0, 0]}><ArchiveLabel title="LYRICS / VOL. 01" subtitle="HANDWRITTEN ARCHIVE" /></group>
  </group>;
}

function FinalCeilingCoffers() {
  const coffers = [[-1.14, 4.53, 2.85, 4.14, 9.95, -.055], [1.04, 4.32, -1.85, 3.52, 10.78, .04], [-.12, 4.12, -6.25, 4.3, 3.58, -.02]];
  return <group name="lara-velvet-coffered-ceiling-final-polish">
    {coffers.map(([x, y, z, width, depth, turn], index) => <group key={index} position={[x, y, z]} rotation={[0, turn, 0]}>
      <mesh><boxGeometry args={[width, .055, depth]} /><meshPhysicalMaterial color={index === 1 ? '#131416' : '#211712'} metalness={.08} roughness={.94} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[side * (width / 2 - .09), -.04, 0]}><boxGeometry args={[.022, .025, depth - .18]} /><Metal color="#755037" roughness={.25} /></mesh>)}
      {[-1, 1].map((side) => <mesh key={side} position={[0, -.04, side * (depth / 2 - .09)]}><boxGeometry args={[width - .18, .025, .022]} /><meshStandardMaterial color={WARM} emissive="#cc8340" emissiveIntensity={1.35} /></mesh>)}
      {[-depth * .22, 0, depth * .22].map((offset) => <mesh key={offset} position={[0, -.05, offset]}><boxGeometry args={[width - .44, .02, .026]} /><Metal color="#6c4a34" roughness={.24} /></mesh>)}
    </group>)}
  </group>;
}

function ArchitecturalInfill({ side, z, width, finish = 'marble' }) {
  const facing = side < 0 ? [0, 0, 0] : [0, Math.PI, 0];
  const material = finish === 'velvet'
    ? <LeopardLeather />
    : finish === 'glass'
      ? <meshPhysicalMaterial color="#252427" metalness={.62} roughness={.14} clearcoat={.5} />
      : <Marble color="#171a1d" />;
  return <group name={`lara-${finish}-architectural-infill-${side}-${z}`} position={[side * 3.69, 2.5, z]} rotation={facing}>
    <mesh><boxGeometry args={[.16, 3.92, width]} />{material}</mesh>
    <mesh position={[.095, 1.7, 0]}><boxGeometry args={[.028, .04, width - .2]} /><Metal color={GOLD} /></mesh>
    <mesh position={[.096, -1.72, 0]}><boxGeometry args={[.028, .04, width - .2]} /><Metal color={BRONZE} /></mesh>
    {finish === 'glass' && <mesh position={[.107, 0, 0]}><boxGeometry args={[.012, 3.58, width - .18]} /><meshPhysicalMaterial color="#634d42" transparent opacity={.17} transmission={.42} roughness={.06} /></mesh>}
  </group>;
}

function WallCompletion() {
  return <group name="lara-no-empty-wall-completion">
    <ArchitecturalInfill side={-1} z={7.75} width={1.52} finish="velvet" />
    <ArchitecturalInfill side={-1} z={-7.72} width={1.62} finish="marble" />
    <ArchitecturalInfill side={1} z={7.65} width={1.68} finish="glass" />
    <ArchitecturalInfill side={1} z={-7.4} width={1.95} finish="marble" />
  </group>;
}

function ArchiveTableDetails({ position, mirrored = false }) {
  return <group name={mirrored ? 'lara-right-curated-detail-plinth' : 'lara-left-curated-detail-plinth'} position={position} rotation={[0, mirrored ? Math.PI : 0, 0]}>
    <mesh position={[0, .11, 0]}><boxGeometry args={[.42, .2, 1.08]} /><Marble color="#181a1c" /></mesh>
    <mesh position={[.05, .25, 0]}><boxGeometry args={[.36, .045, .92]} /><Metal color="#5f402e" roughness={.22} /></mesh>
    {[-.3, -.05, .22].map((z, index) => <mesh key={z} position={[.05, .4 + index * .045, z]}><boxGeometry args={[.2, .075, .22]} /><meshPhysicalMaterial color={index === 1 ? '#2b1716' : '#161518'} metalness={.18} roughness={.66} /></mesh>)}
    <mesh position={[.03, .49, .42]}><cylinderGeometry args={[.11, .13, .26, 24]} /><meshPhysicalMaterial color="#2b1c13" metalness={.3} roughness={.22} clearcoat={.5} /></mesh>
    <mesh position={[.03, .67, .42]}><cylinderGeometry args={[.07, .07, .11, 20]} /><Metal color={GOLD} /></mesh>
    <mesh position={[.02, .45, -.46]}><sphereGeometry args={[.11, 20, 14]} /><meshPhysicalMaterial color="#090a0c" metalness={.56} roughness={.26} clearcoat={.42} /></mesh>
  </group>;
}

function StageAtmosphere() {
  const stageZ = ROOM.backWallZ + 1.2;
  return <group name="lara-stage-ambient-mist-and-spotlight">
    {[[-.68, .63, -.1], [.2, .66, .06], [.72, .62, -.06]].map(([x, y, z], index) => <mesh key={index} position={[x, y, stageZ + z]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.72 - index * .11, 32]} /><meshBasicMaterial color="#f4c188" transparent opacity={.025} depthWrite={false} /></mesh>)}
    <pointLight position={[0, 2.52, stageZ + .4]} color="#ffe0bc" intensity={2.3} distance={4.8} decay={1.8} />
  </group>;
}

function CuratedFinishingDetails() {
  return <group name="lara-small-curated-luxury-details">
    <ArchiveTableDetails position={[-3.43, .08, -7.12]} />
    <ArchiveTableDetails position={[3.43, .08, -7.12]} mirrored />
    <StageAtmosphere />
  </group>;
}

export default function LaraGalleryRebuild() {
  return <group name="lara-complete-luxury-fashion-museum-rebuild">
    <MarbleSlabFloor />
    <FloatingCeiling />
    <SideWall side={-1} />
    <SideWall side={1} />
    <BackStage />
    <StageMicrophone />
    <FashionMannequin />
    <PantherSculpture />
    <PerfumeMonolith />
    <LaraMuseumCollections />
    <WallCompletion />
    <FinalCeilingCoffers />
    <CuratedFinishingDetails />
    <BrightHotelGalleryLighting />
  </group>;
}
