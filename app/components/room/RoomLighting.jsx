import { ROOM } from './roomConfig';

export default function RoomLighting({ isLara }) {
  if (isLara) return <>
    <ambientLight color="#76513a" intensity={.58} />
    <hemisphereLight args={['#d9a768', '#130b08', .48]} />
    <pointLight position={[-3.45, .5, 4.2]} color="#c98b4e" intensity={.95} distance={6.8} decay={2} />
    <pointLight position={[3.45, .5, -.8]} color="#b76e79" intensity={.82} distance={6.1} decay={2} />
    <pointLight position={[-3.45, .55, -6.4]} color="#9b5e31" intensity={.72} distance={5.6} decay={2} />
    <pointLight position={[3.3, 3.85, -7.1]} color="#f4bd7c" intensity={.7} distance={4.4} decay={2} />
    <spotLight position={[0, 4.72, 2.8]} target-position={[0, 1.7, -4.2]} color="#f8c98f" intensity={1.7} angle={.62} penumbra={1} distance={15} />
    <spotLight position={[0, 4.62, -7.8]} target-position={[0, 1.9, ROOM.backWallZ]} color="#dca070" intensity={1.05} angle={.5} penumbra={1} distance={6.2} />
  </>;

  return <>
    <ambientLight color="#c7c4d0" intensity={0.55} />
    <spotLight position={[0, 4.65, 5.6]} target-position={[0, 0, -3]} color="#fff6e8" intensity={6} angle={0.7} penumbra={0.8} distance={20} />
    <spotLight position={[-2.8, 4.45, -4]} target-position={[-2.8, 1.5, -4]} color="#ecebff" intensity={2.1} angle={0.55} penumbra={0.9} distance={8} />
    <spotLight position={[2.8, 4.45, -4]} target-position={[2.8, 1.5, -4]} color="#ecebff" intensity={2.1} angle={0.55} penumbra={0.9} distance={8} />
  </>;
}
