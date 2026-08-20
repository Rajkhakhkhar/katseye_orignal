import { useMemo } from 'react';
import * as THREE from 'three';
import { useRoomSurfaceMaps } from './RoomMaterials';
import { AdaptiveFrameGallery } from './RoomFrames';
import RoomDecor from './RoomDecor';
import { LARA_NICHE_LAYOUT, ROOM } from './roomConfig';

function RoseGoldTrimMaterial() {
  return <meshPhysicalMaterial color="#9aa2aa" metalness={.76} roughness={.36} clearcoat={.16} clearcoatRoughness={.3} />;
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

function ArchitecturalMetal({ color = '#a8b0b8' }) {
  return <meshPhysicalMaterial color={color} metalness={.72} roughness={.38} clearcoat={.12} clearcoatRoughness={.34} />;
}

function SurfaceMaterial({ surface, fallbackColor, roughness, bumpScale, doubleSided = false }) {
  const profile = surface?.material;
  return <meshPhysicalMaterial
    color={profile?.color || fallbackColor}
    map={surface?.color}
    bumpMap={surface?.bump}
    bumpScale={profile?.bumpScale ?? bumpScale}
    roughnessMap={surface?.roughness}
    roughness={profile?.roughness ?? roughness}
    metalness={0}
    clearcoat={0}
    side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
  />;
}

function RecessedSideWall({ side, textureSurface, isTextile }) {
  const geometry = useMemo(() => {
    const zMin = ROOM.backWallZ + .18;
    const zMax = ROOM.entranceZ - .18;
    const shape = new THREE.Shape();
    // Local x maps to world z after the Y rotation below.
    shape.moveTo(-zMax, 0);
    shape.lineTo(-zMin, 0);
    shape.lineTo(-zMin, ROOM.height);
    shape.lineTo(-zMax, ROOM.height);
    shape.lineTo(-zMax, 0);

    LARA_NICHE_LAYOUT[side < 0 ? 'left' : 'right'].forEach(({ y, z, width, height }) => {
      const x0 = -(z + width / 2);
      const x1 = -(z - width / 2);
      const y0 = y - height / 2;
      const y1 = y + height / 2;
      const opening = new THREE.Path();
      // Opposite winding makes this an actual rectangular hole in the wall mesh.
      opening.moveTo(x0, y0);
      opening.lineTo(x0, y1);
      opening.lineTo(x1, y1);
      opening.lineTo(x1, y0);
      opening.lineTo(x0, y0);
      shape.holes.push(opening);
    });

    return new THREE.ShapeGeometry(shape);
  }, [side]);

  return <mesh position={[side * ROOM.width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} geometry={geometry} receiveShadow>
    <SurfaceMaterial surface={textureSurface} fallbackColor="#87919a" roughness={.8} bumpScale={.07} doubleSided />
  </mesh>;
}
function LuxuryArchitecturalShell({ roomCenterZ, surfaces, isTextile }) {
  return <>
    <mesh position={[-ROOM.width / 2 + .065, .19, roomCenterZ]}><boxGeometry args={[.12, .22, ROOM.length]} /><ArchitecturalMetal color="#7e8892" /></mesh>
    <mesh position={[ROOM.width / 2 - .065, .19, roomCenterZ]}><boxGeometry args={[.12, .22, ROOM.length]} /><ArchitecturalMetal color="#7e8892" /></mesh>
    <mesh position={[0, .19, ROOM.backWallZ + .045]}><boxGeometry args={[ROOM.width, .22, .12]} /><ArchitecturalMetal color="#7e8892" /></mesh>


    <mesh position={[0, 2.55, ROOM.backWallZ + .02]}>
      <boxGeometry args={[5.9, 3.75, .035]} />
      {isTextile ? <SurfaceMaterial surface={surfaces.backWall} fallbackColor="#48525c" roughness={.8} bumpScale={.027} /> : <meshStandardMaterial color="#48525c" metalness={.08} roughness={.82} />}
    </mesh>
    <mesh position={[-2.96, 2.55, ROOM.backWallZ + .065]}><boxGeometry args={[.06, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[2.96, 2.55, ROOM.backWallZ + .065]}><boxGeometry args={[.06, 3.9, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[0, .62, ROOM.backWallZ + .065]}><boxGeometry args={[5.96, .055, .055]} /><ArchitecturalMetal /></mesh>
    <mesh position={[0, 4.48, ROOM.backWallZ + .065]}><boxGeometry args={[5.96, .055, .055]} /><ArchitecturalMetal /></mesh>

    <mesh position={[0, ROOM.height - .035, roomCenterZ]}>
      <boxGeometry args={[6.75, .07, ROOM.length - 1.1]} />
      {isTextile ? <SurfaceMaterial surface={surfaces.ceiling} fallbackColor="#59636d" roughness={.82} bumpScale={.018} /> : <meshStandardMaterial color="#59636d" metalness={.16} roughness={.82} />}
    </mesh>
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
      <mesh position={[0, stageHeight / 2, stageZ]}><boxGeometry args={[stageWidth, stageHeight, stageDepth]} /><meshPhysicalMaterial color="#59636c" metalness={.26} roughness={.52} clearcoat={.08} /></mesh>
      <mesh position={[0, stageHeight + .03, stageZ - .04]}><boxGeometry args={[5.55, .06, 1.18]} /><ArchitecturalMetal color="#8a949e" /></mesh>
      <mesh position={[0, stageHeight + platformHeight / 2, stageZ]}><cylinderGeometry args={[1.72, 1.82, platformHeight, 64]} /><meshPhysicalMaterial color="#3f4852" metalness={.4} roughness={.42} clearcoat={.16} clearcoatRoughness={.34} /></mesh>
      <mesh position={[0, stageHeight + platformHeight + .005, stageZ]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.57, .035, 8, 64]} /><ArchitecturalMetal color="#aeb6bd" /></mesh>
    </group>
    <group>
      <mesh position={[0, 2.35, ROOM.backWallZ + .075]}><boxGeometry args={[4.65, 2.92, .08]} /><meshStandardMaterial color="#3d4751" metalness={.18} roughness={.8} /></mesh>
      <mesh position={[-2.32, 2.35, ROOM.backWallZ + .27]}><boxGeometry args={[.18, 3.12, .38]} /><ArchitecturalMetal color="#87919b" /></mesh>
      <mesh position={[2.32, 2.35, ROOM.backWallZ + .27]}><boxGeometry args={[.18, 3.12, .38]} /><ArchitecturalMetal color="#87919b" /></mesh>
      <mesh position={[0, 3.88, ROOM.backWallZ + .27]}><boxGeometry args={[4.82, .18, .38]} /><ArchitecturalMetal color="#87919b" /></mesh>
      <mesh position={[0, .82, ROOM.backWallZ + .27]}><boxGeometry args={[4.82, .18, .38]} /><ArchitecturalMetal color="#87919b" /></mesh>
    </group>
  </>;
}

export default function RoomArchitecture({ theme }) {
  // Themes own their visual layers. Legacy `surfacePreset` remains supported
  // while new rooms use `materialPreset`; the generic decor remains a fallback.
  const materialPreset = theme?.materialPreset || theme?.surfacePreset || 'base-neutral';
  const DecorComponent = theme?.decorComponent || RoomDecor;
  const architecturePreset = theme?.architecturePreset;
  const surfaces = useRoomSurfaceMaps(materialPreset);
  const isTextile = materialPreset === 'lara-cheetah-temp' && Boolean(surfaces.floor.material);
  const roomCenterZ = ROOM.entranceZ - ROOM.length / 2;

  return <>
    <mesh position={[0, 0, roomCenterZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM.width, ROOM.length]} />
      <SurfaceMaterial surface={surfaces.floor} fallbackColor="#87919b" roughness={.62} bumpScale={.08} />
    </mesh>
    <mesh position={[0, ROOM.height, roomCenterZ]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[ROOM.width, ROOM.length]} />
      <SurfaceMaterial surface={surfaces.ceiling} fallbackColor="#aeb5bb" roughness={.88} bumpScale={.05} doubleSided />
    </mesh>
    <RecessedSideWall side={-1} textureSurface={surfaces.sideWall} isTextile={isTextile} />
    <RecessedSideWall side={1} textureSurface={surfaces.sideWall} isTextile={isTextile} />
    <mesh position={[0, ROOM.height / 2, ROOM.backWallZ]}>
      <planeGeometry args={[ROOM.width, ROOM.height]} />
      <SurfaceMaterial surface={surfaces.backWall} fallbackColor="#78828c" roughness={.81} bumpScale={.07} doubleSided />
    </mesh>

    <LuxuryArchitecturalShell roomCenterZ={roomCenterZ} surfaces={surfaces} isTextile={isTextile} />
    <BackWallCenterpiece />
    <RoseGoldArchitecturalTrim roomCenterZ={roomCenterZ} />
    <AdaptiveFrameGallery frames={theme?.frames} frameStyle={theme?.frameStyle} />
    <DecorComponent
      theme={theme}
      preset={theme?.decorPreset || theme?.id}
      architecturePreset={architecturePreset}
    />
  </>;
}
