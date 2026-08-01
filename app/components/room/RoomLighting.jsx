import { ROOM } from './roomConfig';

// Layered neutral gallery lighting: low-level fill prevents crushed blacks,
// while the ceiling and back-wall lights preserve a cinematic falloff.
export default function RoomLighting() {
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
