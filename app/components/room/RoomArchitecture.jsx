import * as THREE from 'three';
import { useLaraSurfaceMaps } from './RoomMaterials';
import EmptyFrame from './RoomFrames';
import { ROOM } from './roomConfig';

function RoseGoldTrimMaterial() {
  return <meshPhysicalMaterial color="#b87976" metalness={.88} roughness={.24} clearcoat={.3} clearcoatRoughness={.18} />;
}

function RoseGoldArchitecturalTrim({ roomCenterZ }) {
  return <>
    <mesh position={[-ROOM.width / 2 + .035, .06, roomCenterZ]}><boxGeometry args={[.045, .045, ROOM.length]} /><RoseGoldTrimMaterial /></mesh>
    <mesh position={[ROOM.width / 2 - .035, .06, roomCenterZ]}><boxGeometry args={[.045, .045, ROOM.length]} /><RoseGoldTrimMaterial /></mesh>
    <mesh position={[-ROOM.width / 2 + .035, ROOM.height - .035, roomCenterZ]}><boxGeometry args={[.045, .045, ROOM.length]} /><RoseGoldTrimMaterial /></mesh>
    <mesh position={[ROOM.width / 2 - .035, ROOM.height - .035, roomCenterZ]}><boxGeometry args={[.045, .045, ROOM.length]} /><RoseGoldTrimMaterial /></mesh>
    <mesh position={[-ROOM.width / 2 + .035, ROOM.height / 2, ROOM.backWallZ + .035]}><boxGeometry args={[.045, ROOM.height, .045]} /><RoseGoldTrimMaterial /></mesh>
    <mesh position={[ROOM.width / 2 - .035, ROOM.height / 2, ROOM.backWallZ + .035]}><boxGeometry args={[.045, ROOM.height, .045]} /><RoseGoldTrimMaterial /></mesh>
  </>;
}

export default function RoomArchitecture({ member }) {
  const isLara = member.id === 'lara';
  const accent = isLara ? '#b76e79' : member.color || '#d6d6dc';
  const laraMaps = useLaraSurfaceMaps(isLara);
  const roomCenterZ = ROOM.entranceZ - ROOM.length / 2;
  const sideFrames = [
    [-1, ROOM.entranceZ - 2], [1, ROOM.entranceZ - 2],
    [-1, ROOM.entranceZ - 6.25], [1, ROOM.entranceZ - 6.25],
    [-1, ROOM.entranceZ - 10.5], [1, ROOM.entranceZ - 10.5],
  ];

  return <>
    <mesh position={[0, 0, roomCenterZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM.width, ROOM.length]} />
      <meshPhysicalMaterial color={isLara ? '#d6a462' : '#1a1a1c'} map={laraMaps?.floor.color} bumpMap={laraMaps?.floor.bump} bumpScale={isLara ? .18 : 0} roughnessMap={laraMaps?.floor.roughness} roughness={isLara ? .61 : .72} metalness={isLara ? .12 : .16} clearcoat={isLara ? .08 : 0} sheen={isLara ? .14 : 0} sheenColor="#d4a06d" sheenRoughness={.76} />
    </mesh>
    <mesh position={[0, ROOM.height, roomCenterZ]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[ROOM.width, ROOM.length]} />
      <meshPhysicalMaterial color={isLara ? '#d0a060' : '#171719'} map={laraMaps?.ceiling.color} bumpMap={laraMaps?.ceiling.bump} bumpScale={isLara ? .14 : 0} roughnessMap={laraMaps?.ceiling.roughness} roughness={isLara ? .69 : .95} metalness={isLara ? .06 : 0} sheen={isLara ? .12 : 0} sheenColor="#c98d5f" sheenRoughness={.82} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[-ROOM.width / 2, ROOM.height / 2, roomCenterZ]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[ROOM.length, ROOM.height]} />
      <meshPhysicalMaterial color={isLara ? '#d0a060' : '#202024'} map={laraMaps?.sideWall.color} bumpMap={laraMaps?.sideWall.bump} bumpScale={isLara ? .16 : 0} roughnessMap={laraMaps?.sideWall.roughness} roughness={isLara ? .68 : .92} metalness={isLara ? .06 : 0} sheen={isLara ? .14 : 0} sheenColor="#d7a46d" sheenRoughness={.8} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[ROOM.width / 2, ROOM.height / 2, roomCenterZ]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[ROOM.length, ROOM.height]} />
      <meshPhysicalMaterial color={isLara ? '#d0a060' : '#202024'} map={laraMaps?.sideWall.color} bumpMap={laraMaps?.sideWall.bump} bumpScale={isLara ? .16 : 0} roughnessMap={laraMaps?.sideWall.roughness} roughness={isLara ? .68 : .92} metalness={isLara ? .06 : 0} sheen={isLara ? .14 : 0} sheenColor="#d7a46d" sheenRoughness={.8} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, ROOM.height / 2, ROOM.backWallZ]}>
      <planeGeometry args={[ROOM.width, ROOM.height]} />
      <meshPhysicalMaterial color={isLara ? '#d0a060' : '#18181a'} map={laraMaps?.backWall.color} bumpMap={laraMaps?.backWall.bump} bumpScale={isLara ? .16 : 0} roughnessMap={laraMaps?.backWall.roughness} roughness={isLara ? .68 : .94} metalness={isLara ? .06 : 0} sheen={isLara ? .14 : 0} sheenColor="#d7a46d" sheenRoughness={.8} side={THREE.DoubleSide} />
    </mesh>

    {!isLara && sideFrames.map(([side, z], index) => <EmptyFrame
      key={`${side}-${z}`}
      position={[side * (ROOM.width / 2 - 0.025), 2.1, z]}
      rotation={[0, side === -1 ? Math.PI / 2 : -Math.PI / 2, 0]}
      accent={index % 2 ? '#73737a' : accent}
    />)}
    {!isLara && <EmptyFrame position={[0, 2.25, ROOM.backWallZ + 0.02]} rotation={[0, 0, 0]} accent={accent} hero />}
    {isLara && <RoseGoldArchitecturalTrim roomCenterZ={roomCenterZ} />}
  </>;
}
