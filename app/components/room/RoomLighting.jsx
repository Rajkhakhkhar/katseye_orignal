import { ROOM } from './roomConfig';

export default function RoomLighting({ isLara }) {
  if (isLara) return <>
    <ambientLight color="#b28f71" intensity={.82} />
    <hemisphereLight args={['#f4cfaa', '#241915', .62]} />

    <pointLight position={[0, 4.35, 5.4]} color="#f5d0a5" intensity={1.35} distance={9.2} decay={2} />
    <pointLight position={[0, 4.35, .15]} color="#edbe8e" intensity={1.15} distance={8.6} decay={2} />
    <pointLight position={[0, 4.35, -5.1]} color="#e8b888" intensity={1.08} distance={8.2} decay={2} />

    <pointLight position={[-3.35, 2.45, 3.1]} color="#dca673" intensity={.72} distance={5.8} decay={2} />
    <pointLight position={[3.35, 2.45, -.7]} color="#d9a476" intensity={.66} distance={5.8} decay={2} />
    <pointLight position={[-3.25, 2.25, -5.25]} color="#c99469" intensity={.54} distance={5.2} decay={2} />
    <pointLight position={[3.25, 2.25, -5.25]} color="#c99469" intensity={.54} distance={5.2} decay={2} />

    <pointLight position={[0, 3.55, ROOM.backWallZ + 1.05]} color="#f0c493" intensity={1.28} distance={6.4} decay={2} />
    <pointLight position={[-2.45, 2.75, ROOM.backWallZ + 1.25]} color="#c99469" intensity={.46} distance={4.3} decay={2} />
    <pointLight position={[2.45, 2.75, ROOM.backWallZ + 1.25]} color="#c99469" intensity={.46} distance={4.3} decay={2} />
  </>;

  return <>
    <ambientLight color="#c7c4d0" intensity={0.55} />
    <spotLight position={[0, 4.65, 5.6]} target-position={[0, 0, -3]} color="#fff6e8" intensity={6} angle={0.7} penumbra={0.8} distance={20} />
    <spotLight position={[-2.8, 4.45, -4]} target-position={[-2.8, 1.5, -4]} color="#ecebff" intensity={2.1} angle={0.55} penumbra={0.9} distance={8} />
    <spotLight position={[2.8, 4.45, -4]} target-position={[2.8, 1.5, -4]} color="#ecebff" intensity={2.1} angle={0.55} penumbra={0.9} distance={8} />
  </>;
}
