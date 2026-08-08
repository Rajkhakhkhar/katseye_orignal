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
  const zones = [5.2, .45, -4.4];
  return <>
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`wash-${side}-${z}`} position={[side * 3.48, 2.85, z]} color={CHAMPAGNE} intensity={.56} distance={5.25} decay={2} />))}
  </>;
}

function NicheAccentLighting() {
  const left = [[3.1, 5.45, .3], [3.55, 1.65, .2], [2.35, -1.45, .24]];
  const right = [[3.08, 5.35, .3], [2.8, 1.95, .22], [2.85, -1.35, .24]];
  return <>
    {left.map(([y, z, intensity]) => <pointLight key={`left-niche-${z}`} position={[-3.62, y, z]} color={ROSE_GOLD} intensity={intensity} distance={1.95} decay={2} />)}
    {right.map(([y, z, intensity]) => <pointLight key={`right-niche-${z}`} position={[3.62, y, z]} color={ROSE_GOLD} intensity={intensity} distance={1.95} decay={2} />)}
  </>;
}

function StageLighting() {
  const corners = [[-2.14, 3.66], [2.14, 3.66], [-2.14, 1.04], [2.14, 1.04]];
  return <>
    {corners.map(([x, y]) => <pointLight key={`${x}-${y}`} position={[x, y, ROOM.backWallZ + .73]} color={CHAMPAGNE} intensity={.42} distance={4.15} decay={2} />)}
    <pointLight position={[0, 2.64, ROOM.backWallZ + 1.1]} color="#efbf79" intensity={.62} distance={5.1} decay={2} />
    <pointLight position={[0, .62, ROOM.backWallZ + 1.1]} color={AMBER} intensity={.5} distance={4.85} decay={2} />
    <pointLight position={[0, 1.62, ROOM.backWallZ + .95]} color={ROSE_GOLD} intensity={.3} distance={2.8} decay={2} />
  </>;
}

function LaraGalleryLighting() {
  return <>
    <ambientLight color="#756553" intensity={.54} />
    <hemisphereLight args={['#cdbb9f', '#151416', .68]} />
    <PerimeterLighting />
    <WallWashLighting />
    <NicheAccentLighting />
    <StageLighting />
  </>;
}

export default function RoomLighting({ preset = 'base-gallery' }) {
  return preset === 'lara-cheetah' ? <LaraGalleryLighting /> : <BaseGalleryLighting />;
}
