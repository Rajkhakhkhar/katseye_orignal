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

function HiddenPerimeterLeds() {
  const runs = [6.6, 2.1, -2.4, -6.9];
  return <>
    {[-1, 1].flatMap((side) => runs.map((z) => (
      <pointLight
        key={`${side}-${z}`}
        position={[side * 3.5, 4.66, z]}
        color="#e7ad64"
        intensity={.34}
        distance={4.3}
        decay={2}
      />
    )))}
    {[-2.35, 0, 2.35].map((x) => (
      <pointLight key={x} position={[x, 4.64, ROOM.backWallZ + .5]} color="#e7ad64" intensity={.28} distance={3.6} decay={2} />
    ))}
  </>;
}

function SoftWallWashes() {
  const zones = [4.4, -.55, -5.25];
  return <>
    {[-1, 1].flatMap((side) => zones.map((z) => (
      <pointLight
        key={`${side}-${z}`}
        position={[side * 3.18, 2.75, z]}
        color="#dcb47d"
        intensity={.42}
        distance={5.5}
        decay={2}
      />
    )))}
  </>;
}

function DisplayAccents() {
  return <>
    <pointLight position={[-3.14, 2.08, -1.9]} color="#e5ad65" intensity={.42} distance={3.25} decay={2} />
    <pointLight position={[3.14, 2.05, -1.45]} color="#e5ad65" intensity={.36} distance={3.2} decay={2} />
    <pointLight position={[3.12, 1.36, -5.85]} color="#dba461" intensity={.32} distance={2.9} decay={2} />
  </>;
}

function LaraGalleryLighting() {
  return <>
    {/* A quiet champagne fill preserves material detail without flattening the room. */}
    <ambientLight color="#d9c39d" intensity={.7} />
    <hemisphereLight args={['#f0d9b5', '#261b15', .64]} />

    {/* Hidden ceiling-edge fixtures: their source is never rendered, only their amber spill. */}
    <HiddenPerimeterLeds />

    {/* Low-intensity panel washes keep the gallery walls legible while retaining shadowed corners. */}
    <SoftWallWashes />

    {/* Two restrained layers make the stage the natural destination rather than a hard spotlight. */}
    <pointLight position={[0, 3.9, ROOM.backWallZ + 1.75]} color="#f1c27f" intensity={1.42} distance={8.6} decay={2} />
    <pointLight position={[0, 1.35, ROOM.backWallZ + 1.18]} color="#dba460" intensity={.58} distance={5.8} decay={2} />
    <pointLight position={[-2.16, 2.56, ROOM.backWallZ + 1.48]} color="#dcb278" intensity={.46} distance={5.3} decay={2} />
    <pointLight position={[2.16, 2.56, ROOM.backWallZ + 1.48]} color="#dcb278" intensity={.46} distance={5.3} decay={2} />

    <DisplayAccents />
  </>;
}

export default function RoomLighting({ preset = 'base-gallery' }) {
  return preset === 'lara-cheetah' ? <LaraGalleryLighting /> : <BaseGalleryLighting />;
}