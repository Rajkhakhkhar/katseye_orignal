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

function ArchitecturalMetal({ color = '#af8463' }) {
  return <meshPhysicalMaterial color={color} metalness={.84} roughness={.3} clearcoat={.18} clearcoatRoughness={.22} />;
}

function SideWallPanel({ side, z }) {
  const x = side * (ROOM.width / 2 - .015);
  const trimX = side * (ROOM.width / 2 - .055);
  return <group>
    <mesh position={[x, 2.52, z]}>
      <boxGeometry args={[.03, 3.82, 3.75]} />
      <meshStandardMaterial color="#271f1b" metalness={.12} roughness={.86} />
    </mesh>
    <mesh position={[trimX, 2.52, z - 1.84]}><boxGeometry args={[.045, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[trimX, 2.52, z + 1.84]}><boxGeometry args={[.045, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[trimX, .61, z]}><boxGeometry args={[.045, .055, 3.74]} /><ArchitecturalMetal /></mesh>
    <mesh position={[trimX, 4.43, z]}><boxGeometry args={[.045, .055, 3.74]} /><ArchitecturalMetal /></mesh>
  </group>;
}

function LuxuryArchitecturalShell({ roomCenterZ }) {
  const panelCenters = [ROOM.entranceZ - 3.3, ROOM.entranceZ - 8.05, ROOM.entranceZ - 12.8];
  return <>
    <mesh position={[-ROOM.width / 2 + .065, .19, roomCenterZ]}><boxGeometry args={[.12, .22, ROOM.length]} /><ArchitecturalMetal color="#8f6b52" /></mesh>
    <mesh position={[ROOM.width / 2 - .065, .19, roomCenterZ]}><boxGeometry args={[.12, .22, ROOM.length]} /><ArchitecturalMetal color="#8f6b52" /></mesh>
    <mesh position={[0, .19, ROOM.backWallZ + .045]}><boxGeometry args={[ROOM.width, .22, .12]} /><ArchitecturalMetal color="#8f6b52" /></mesh>

    {panelCenters.map((z) => <group key={z}>
      <SideWallPanel side={-1} z={z} />
      <SideWallPanel side={1} z={z} />
    </group>)}

    <mesh position={[0, 2.55, ROOM.backWallZ + .02]}>
      <boxGeometry args={[5.9, 3.75, .035]} />
      <meshStandardMaterial color="#251d19" metalness={.14} roughness={.82} />
    </mesh>
    <mesh position={[-2.96, 2.55, ROOM.backWallZ + .065]}><boxGeometry args={[.06, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[2.96, 2.55, ROOM.backWallZ + .065]}><boxGeometry args={[.06, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[0, .62, ROOM.backWallZ + .065]}><boxGeometry args={[5.96, .055, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[0, 4.48, ROOM.backWallZ + .065]}><boxGeometry args={[5.96, .055, .055]} /><ArchitecturalMetal /></mesh>

    <mesh position={[0, ROOM.height - .035, roomCenterZ]}><boxGeometry args={[6.75, .07, ROOM.length - 1.1]} /><meshStandardMaterial color="#201917" metalness={.2} roughness={.8} /></mesh>
    <mesh position={[-3.42, ROOM.height - .08, roomCenterZ]}><boxGeometry args={[.055, .08, ROOM.length - 1.1]} /><ArchitecturalMetal /></mesh>
    <mesh position={[3.42, ROOM.height - .08, roomCenterZ]}><boxGeometry args={[.055, .08, ROOM.length - 1.1]} /><ArchitecturalMetal /></mesh>
    {[ROOM.entranceZ - 2.2, ROOM.entranceZ - 7.5, ROOM.entranceZ - 12.8, ROOM.entranceZ - 18.1].map((z) => <mesh key={z} position={[0, ROOM.height - .08, z]}><boxGeometry args={[6.9, .08, .06]} /><ArchitecturalMetal /></mesh>)}
  </>;
}

function BackWallCenterpiece() {
  const stageZ = ROOM.backWallZ + .95;
  const stageWidth = 6.2;
  const stageDepth = 1.6;
  const stageHeight = .18;
  const platformHeight = .12;
  return <>
    <group>
      <mesh position={[0, stageHeight / 2, stageZ]}>
        <boxGeometry args={[stageWidth, stageHeight, stageDepth]} />
        <meshPhysicalMaterial color="#2a201c" metalness={.36} roughness={.5} clearcoat={.12} />
      </mesh>
      <mesh position={[0, stageHeight + .03, stageZ - .04]}>
        <boxGeometry args={[5.55, .06, 1.18]} />
        <ArchitecturalMetal color="#8f6b52" />
      </mesh>
      <mesh position={[0, stageHeight + platformHeight / 2, stageZ]}>
        <cylinderGeometry args={[1.72, 1.82, platformHeight, 64]} />
        <meshPhysicalMaterial color="#211917" metalness={.5} roughness={.36} clearcoat={.22} clearcoatRoughness={.28} />
      </mesh>
      <mesh position={[0, stageHeight + platformHeight + .005, stageZ]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.57, .035, 8, 64]} />
        <ArchitecturalMetal color="#b88c67" />
      </mesh>
    </group>

    <group>
      <mesh position={[0, 2.35, ROOM.backWallZ + .075]}>
        <boxGeometry args={[4.65, 2.92, .08]} />
        <meshStandardMaterial color="#171211" metalness={.22} roughness={.83} />
      </mesh>
      <mesh position={[-2.32, 2.35, ROOM.backWallZ + .27]}><boxGeometry args={[.18, 3.12, .38]} /><ArchitecturalMetal color="#987456" /></mesh>
      <mesh position={[2.32, 2.35, ROOM.backWallZ + .27]}><boxGeometry args={[.18, 3.12, .38]} /><ArchitecturalMetal color="#987456" /></mesh>
      <mesh position={[0, 3.88, ROOM.backWallZ + .27]}><boxGeometry args={[4.82, .18, .38]} /><ArchitecturalMetal color="#987456" /></mesh>
      <mesh position={[0, .82, ROOM.backWallZ + .27]}><boxGeometry args={[4.82, .18, .38]} /><ArchitecturalMetal color="#987456" /></mesh>
    </group>
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

    <LuxuryArchitecturalShell roomCenterZ={roomCenterZ} />
    <BackWallCenterpiece />

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
