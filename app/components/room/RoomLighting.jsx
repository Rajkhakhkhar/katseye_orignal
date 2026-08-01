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

function LaraGalleryLighting() {
  return <>
    <ambientLight color="#8b755b" intensity={.72} />
    <hemisphereLight args={['#d6b98e', '#201a14', .72]} />
    <pointLight position={[0, 4.26, 5.35]} color="#fff0d6" intensity={1.35} distance={10.7} decay={2} />
    <pointLight position={[0, 4.2, -.2]} color="#e9d9c2" intensity={1.12} distance={10.4} decay={2} />
    <pointLight position={[-3.1, 2.85, 3.3]} color="#f0dcc1" intensity={.82} distance={7.5} decay={2} />
    <pointLight position={[3.1, 2.85, 3.3]} color="#f0dcc1" intensity={.82} distance={7.5} decay={2} />
    <pointLight position={[-3.06, 2.65, -2.4]} color="#d6c1a5" intensity={.66} distance={6.9} decay={2} />
    <pointLight position={[3.06, 2.65, -2.4]} color="#d6c1a5" intensity={.66} distance={6.9} decay={2} />
    <pointLight position={[-2.98, 2.45, -6.75]} color="#cbb493" intensity={.6} distance={6.4} decay={2} />
    <pointLight position={[2.98, 2.45, -6.75]} color="#cbb493" intensity={.6} distance={6.4} decay={2} />
    <pointLight position={[0, 3.48, ROOM.backWallZ + 1.16]} color="#fff5e4" intensity={1.52} distance={8.2} decay={2} />
    <pointLight position={[-2.38, 2.55, ROOM.backWallZ + 1.23]} color="#ddc8aa" intensity={.58} distance={5.6} decay={2} />
    <pointLight position={[2.38, 2.55, ROOM.backWallZ + 1.23]} color="#ddc8aa" intensity={.58} distance={5.6} decay={2} />
  </>;
}

export default function RoomLighting({ preset = 'base-gallery' }) {
  return preset === 'lara-cheetah' ? <LaraGalleryLighting /> : <BaseGalleryLighting />;
}
