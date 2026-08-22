import { useLayoutEffect, useRef } from 'react';
import { ROOM } from './roomConfig';

function BaseGalleryLighting() {
  return <>
    <ambientLight color="#dce2e7" intensity={.96} />
    <hemisphereLight args={['#f3f6f8', '#29323a', .76]} />
    <pointLight position={[0, 4.3, 5.35]} color="#fff8ed" intensity={1.46} distance={10.4} decay={2} />
    <pointLight position={[0, 4.3, .05]} color="#f8fafb" intensity={1.26} distance={9.8} decay={2} />
    <pointLight position={[0, 4.15, -5.1]} color="#f4f6f7" intensity={1.18} distance={9.4} decay={2} />
    <pointLight position={[-3.28, 2.65, 3.15]} color="#dfe8ed" intensity={.66} distance={7.1} decay={2} />
    <pointLight position={[3.28, 2.65, 3.15]} color="#dfe8ed" intensity={.66} distance={7.1} decay={2} />
    <pointLight position={[-3.28, 2.6, -2.4]} color="#d8e0e5" intensity={.5} distance={6.6} decay={2} />
    <pointLight position={[3.28, 2.6, -2.4]} color="#d8e0e5" intensity={.5} distance={6.6} decay={2} />
    <pointLight position={[-3.12, 2.5, -6.9]} color="#d9e1e6" intensity={.48} distance={6.2} decay={2} />
    <pointLight position={[3.12, 2.5, -6.9]} color="#d9e1e6" intensity={.48} distance={6.2} decay={2} />
    <pointLight position={[0, 3.55, ROOM.backWallZ + 1.2]} color="#fffaf2" intensity={1.46} distance={8.1} decay={2} />
    <pointLight position={[-2.5, 2.75, ROOM.backWallZ + 1.32]} color="#e6edf0" intensity={.52} distance={5.5} decay={2} />
    <pointLight position={[2.5, 2.75, ROOM.backWallZ + 1.32]} color="#e6edf0" intensity={.52} distance={5.5} decay={2} />
    <DisplaySpotlight position={[0, 4.72, -6.85]} target={[0, 3.4, ROOM.backWallZ + .34]} color="#fff4df" intensity={4.4} />
  </>;
}

const MEMBER_LIGHTING = Object.freeze({
  'sophia-luxury': { ambient: 1.08, sky: '#fff3da', ground: '#5a3520', hemisphere: 1.14, wall: '#ffe3ae', accent: '#d4a352', stage: '#fff1d5', spots: 6.3, wallRuns: [5.85, 1.05, -3.7, -6.45] },
  'sophia-museum': { ambient: .72, sky: '#fff2de', ground: '#352218', hemisphere: .9, wall: '#f1c991', accent: '#c58a45', stage: '#f7d7a3', spots: 4.6, wallRuns: [5.1, -.2, -5.1] },
  'daniela-performance': { ambient: .42, sky: '#8e2e3e', ground: '#070609', hemisphere: .72, wall: '#a73042', accent: '#f0a068', stage: '#d34a54', spots: 7.1, wallRuns: [5.6, 1.4, -3.3] },
  'megan-studio': { ambient: .52, sky: '#d3d8de', ground: '#111317', hemisphere: .8, wall: '#b8c0c8', accent: '#77838f', stage: '#edf0f1', spots: 5.6, wallRuns: [4.9, -.4, -5.35] },
  'manon-industrial': { ambient: .4, sky: '#9ba0a6', ground: '#08090b', hemisphere: .7, wall: '#8d949a', accent: '#d1a475', stage: '#d7d9db', spots: 7.1, wallRuns: [5.55, -.15, -4.7] },
  'yoonchae-daylight': { ambient: .78, sky: '#fff0db', ground: '#765343', hemisphere: .92, wall: '#ffd3aa', accent: '#eca875', stage: '#fff6e9', spots: 3.55, wallRuns: [5.15, .05, -4.9] },
});

function MemberGalleryLighting({ preset }) {
  const mood = MEMBER_LIGHTING[preset];
  if (!mood) return <BaseGalleryLighting />;

  return <>
    <ambientLight color={mood.sky} intensity={mood.ambient} />
    <hemisphereLight args={[mood.sky, mood.ground, mood.hemisphere]} />
    {[-1, 1].flatMap((side) => mood.wallRuns.map((z) => <pointLight key={`${preset}-wall-${side}-${z}`} position={[side * 3.42, 3.08, z]} color={mood.wall} intensity={mood.spots * .52} distance={4.7} decay={2} />))}
    {[-1, 1].flatMap((side) => [5.15, -4.5].map((z) => <DisplaySpotlight key={`${preset}-frame-${side}-${z}`} position={[side * 2.45, 4.6, z + .75]} target={[side * 3.78, 2.5, z]} color={mood.accent} intensity={mood.spots} />))}
    <DisplaySpotlight position={[0, 4.72, -6.85]} target={[0, 3.4, ROOM.backWallZ + .34]} color={mood.stage} intensity={mood.spots * 1.22} />
    <pointLight position={[0, 4.35, 1.1]} color={mood.sky} intensity={mood.spots * .5} distance={7.4} decay={2} />
    <pointLight position={[0, 2.68, ROOM.backWallZ + 1.05]} color={mood.stage} intensity={mood.spots * 1.34} distance={5.7} decay={2} />
    <pointLight position={[0, .65, ROOM.backWallZ + 1.05]} color={mood.accent} intensity={mood.spots * .62} distance={4.8} decay={2} />
  </>;
}

const AMBER = '#d29a57';
const CHAMPAGNE = '#e6c48b';
const ROSE_GOLD = '#b78966';

function PerimeterLighting() {
  const runs = [-6.5, -2.25, 2.05, 6.35];
  return <>
    {[-1, 1].flatMap((side) => runs.map((z) => <pointLight key={`${side}-${z}`} position={[side * 3.57, 4.68, z]} color={AMBER} intensity={.52} distance={4.9} decay={2} />))}
    <pointLight position={[0, 4.66, 8.52]} color={AMBER} intensity={.48} distance={5.1} decay={2} />
    <pointLight position={[0, 4.66, ROOM.backWallZ + .5]} color={AMBER} intensity={.56} distance={5.2} decay={2} />
    {[-1, 1].flatMap((side) => [-5, 0, 5].map((z) => <pointLight key={`kick-${side}-${z}`} position={[side * 3.54, .18, z]} color="#c5843f" intensity={.19} distance={3.15} decay={2} />))}
  </>;
}

function WallWashLighting() {
  const zones = [5.15, .55, -4.2];
  return <>
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`wash-${side}-${z}`} position={[side * 3.52, 2.95, z]} color={CHAMPAGNE} intensity={1.88} distance={5.35} decay={2} />))}
  </>;
}

function BronzeEdgeLighting() {
  const frameZones = [5.05, 1.02, -5.48];
  return <>
    {[-1, 1].flatMap((side) => frameZones.map((z) => <pointLight key={`bronze-edge-${side}-${z}`} position={[side * 3.54, 3.86, z]} color="#d6a264" intensity={.64} distance={3.2} decay={2} />))}
    {[-1, 1].flatMap((side) => frameZones.map((z) => <pointLight key={`bronze-kick-${side}-${z}`} position={[side * 3.58, .52, z]} color="#9c6438" intensity={.26} distance={2.5} decay={2} />))}
  </>;
}

function IndirectWallBounceLighting() {
  const zones = [4.2, -1.4, -6.1];
  return <>
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`wall-bounce-${side}-${z}`} position={[side * 3.42, 1.5, z]} color="#b98c61" intensity={.52} distance={4.3} decay={2} />))}
  </>;
}

function NicheAccentLighting() {
  const left = [[3.1, 5.45, .48], [3.55, 1.65, .38], [2.35, -1.45, .42]];
  const right = [[3.08, 5.35, .48], [2.8, 1.95, .4], [2.85, -1.35, .42]];
  return <>
    {left.map(([y, z, intensity]) => <pointLight key={`left-niche-${z}`} position={[-3.62, y, z]} color={ROSE_GOLD} intensity={intensity} distance={1.95} decay={2} />)}
    {right.map(([y, z, intensity]) => <pointLight key={`right-niche-${z}`} position={[3.62, y, z]} color={ROSE_GOLD} intensity={intensity} distance={1.95} decay={2} />)}
  </>;
}

function DisplaySpotlight({ position, target, intensity = 1, color = '#f0c27d' }) {
  const light = useRef(null);
  const focus = useRef(null);

  useLayoutEffect(() => {
    if (light.current && focus.current) light.current.target = focus.current;
  }, []);

  return <group>
    <object3D ref={focus} position={target} />
    <spotLight ref={light} position={position} color={color} intensity={intensity} distance={7.8} angle={.56} penumbra={.76} decay={2} />
  </group>;
}

function DisplayClusterLighting() {
  const displays = [
    { id: 'left-portrait', position: [-2.65, 4.46, 6.05], target: [-3.56, 2.65, 5.02], intensity: 3.48 },
    { id: 'left-fashion', position: [-2.72, 4.32, 1.3], target: [-3.56, 2.45, .62], intensity: 3.08 },
    { id: 'left-glass-cabinet', position: [-2.72, 4.36, -4.62], target: [-3.72, 2.35, -5.45], intensity: 2.94, color: '#e9c98f' },
    { id: 'right-fashion-cabinet', position: [2.65, 4.46, 6.0], target: [3.72, 2.42, 5.02], intensity: 3.48 },
    { id: 'right-music-cabinet', position: [2.62, 4.3, .92], target: [3.74, 2.42, .12], intensity: 3.16, color: '#e5b56e' },
    { id: 'right-sculptural-cabinet', position: [2.62, 4.34, -4.58], target: [3.72, 2.34, -5.5], intensity: 3.24, color: '#dbad6a' },
  ];

  return <>{displays.map((display) => <DisplaySpotlight key={display.id} {...display} />)}</>;
}

function CabinetInteriorLighting() {
  const cabinets = [
    { id: 'left-glass', side: -1, z: -5.48, height: 2.42 },
    { id: 'right-fashion', side: 1, z: 5.02, height: 2.42 },
    { id: 'right-music', side: 1, z: .12, height: 2.48 },
    { id: 'right-sculptural', side: 1, z: -5.5, height: 2.38 },
  ];

  return <>
    {cabinets.map(({ id, side, z, height }) => <pointLight key={`${id}-interior-led`} position={[side * 3.66, height + .28, z]} color="#e9bd78" intensity={.52} distance={2.05} decay={2} />)}
  </>;
}

function FloorPropRimLighting() {
  return <>
    <pointLight position={[-3.3, .24, -4.94]} color="#cf8f4c" intensity={.72} distance={2.45} decay={2} />
    <pointLight position={[2.62, .28, -4.92]} color="#c98a4e" intensity={.36} distance={2.05} decay={2} />
    <pointLight position={[-3.26, .28, 6.72]} color="#d39b62" intensity={.34} distance={1.95} decay={2} />
  </>;
}

function StageLighting() {
  const corners = [[-2.14, 3.66], [2.14, 3.66], [-2.14, 1.04], [2.14, 1.04]];
  return <>
    {corners.map(([x, y]) => <pointLight key={`${x}-${y}`} position={[x, y, ROOM.backWallZ + .73]} color={CHAMPAGNE} intensity={1.52} distance={4.85} decay={2} />)}
    <pointLight position={[0, 2.64, ROOM.backWallZ + 1.1]} color="#efbf79" intensity={4.05} distance={5.75} decay={2} />
    <pointLight position={[0, .62, ROOM.backWallZ + 1.1]} color={AMBER} intensity={1.72} distance={5.35} decay={2} />
    <pointLight position={[0, 1.62, ROOM.backWallZ + .95]} color={ROSE_GOLD} intensity={.3} distance={2.8} decay={2} />
  </>;
}

function LaraGalleryLighting() {
  return <>
    <ambientLight color="#756553" intensity={.46} />
    <hemisphereLight args={['#cdbb9f', '#151416', .6]} />
    <PerimeterLighting />
    <WallWashLighting />
    <BronzeEdgeLighting />
    <IndirectWallBounceLighting />
    <NicheAccentLighting />
    <DisplayClusterLighting />
    <CabinetInteriorLighting />
    <FloorPropRimLighting />
    <StageLighting />
  </>;
}

export default function RoomLighting({ preset = 'base-gallery' }) {
  if (preset === 'lara-cheetah') return <LaraGalleryLighting />;
  return MEMBER_LIGHTING[preset] ? <MemberGalleryLighting preset={preset} /> : <BaseGalleryLighting />;
}
