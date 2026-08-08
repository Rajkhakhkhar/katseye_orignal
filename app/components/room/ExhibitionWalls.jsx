import { LARA_NICHE_LAYOUT, ROOM } from './roomConfig';

const OUTER_BRONZE = '#432519';
const INNER_GOLD = '#c99645';
const INTERIOR = '#20191a';
const LED_AMBER = '#e0a25c';
const CAVITY_DEPTH = .68;

function OuterBronze() {
  return <meshPhysicalMaterial color={OUTER_BRONZE} metalness={.4} roughness={.48} clearcoat={.03} />;
}

function InsetGold() {
  return <meshPhysicalMaterial color={INNER_GOLD} metalness={.78} roughness={.28} clearcoat={.04} />;
}

function NicheBackPanel({ width, height }) {
  return <mesh position={[-CAVITY_DEPTH, 0, 0]} receiveShadow>
    <boxGeometry args={[.03, height - .28, width - .28]} />
    <meshPhysicalMaterial color="#1e1f24" metalness={.14} roughness={.9} clearcoat={0} />
  </mesh>;
}

function HiddenAmberStrip({ position, size, intensity = .34 }) {
  return <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={LED_AMBER} emissive={LED_AMBER} emissiveIntensity={intensity} roughness={.7} />
  </mesh>;
}

function ArchitecturalShelf({ y, width }) {
  const shelfDepth = .44;
  return <>
    {/* A physical shelf: 5cm thick and deep enough to hold future objects. */}
    <mesh position={[-CAVITY_DEPTH + shelfDepth / 2 + .06, y, 0]} castShadow receiveShadow>
      <boxGeometry args={[shelfDepth, .05, width - .44]} />
      <meshStandardMaterial color="#242022" metalness={.2} roughness={.72} />
    </mesh>
    {/* The shelf reaches the cavity side returns, making it structurally supported rather than floating. */}
    <mesh position={[-CAVITY_DEPTH + shelfDepth / 2 + .06, y - .1, -width / 2 + .24]}>
      <boxGeometry args={[shelfDepth, .16, .05]} />
      <meshStandardMaterial color={INTERIOR} roughness={.82} />
    </mesh>
    <mesh position={[-CAVITY_DEPTH + shelfDepth / 2 + .06, y - .1, width / 2 - .24]}>
      <boxGeometry args={[shelfDepth, .16, .05]} />
      <meshStandardMaterial color={INTERIOR} roughness={.82} />
    </mesh>
    <HiddenAmberStrip position={[-CAVITY_DEPTH + .08, y + .035, 0]} size={[.012, .012, width - .58]} intensity={.3} />
  </>;
}

function HeavyOpeningSurround({ width, height }) {
  const outerThickness = .22;
  const innerInset = .19;
  const innerThickness = .032;
  const outsideX = .05;
  const insideX = -.075;

  return <>
    {/* The broad dark-bronze surround is the architectural opening, not a picture frame. */}
    <mesh position={[outsideX, height / 2 + outerThickness / 2, 0]}><boxGeometry args={[outerThickness, outerThickness, width + outerThickness * 2]} /><OuterBronze /></mesh>
    <mesh position={[outsideX, -height / 2 - outerThickness / 2, 0]}><boxGeometry args={[outerThickness, outerThickness, width + outerThickness * 2]} /><OuterBronze /></mesh>
    <mesh position={[outsideX, 0, -width / 2 - outerThickness / 2]}><boxGeometry args={[outerThickness, height + outerThickness * 2, outerThickness]} /><OuterBronze /></mesh>
    <mesh position={[outsideX, 0, width / 2 + outerThickness / 2]}><boxGeometry args={[outerThickness, height + outerThickness * 2, outerThickness]} /><OuterBronze /></mesh>

    {/* The thin gold line sits inside the bronze opening, like the reference's illuminated inner reveal. */}
    <mesh position={[insideX, height / 2 - innerInset, 0]}><boxGeometry args={[.035, innerThickness, width - innerInset * 2]} /><InsetGold /></mesh>
    <mesh position={[insideX, -height / 2 + innerInset, 0]}><boxGeometry args={[.035, innerThickness, width - innerInset * 2]} /><InsetGold /></mesh>
    <mesh position={[insideX, 0, -width / 2 + innerInset]}><boxGeometry args={[.035, height - innerInset * 2, innerThickness]} /><InsetGold /></mesh>
    <mesh position={[insideX, 0, width / 2 - innerInset]}><boxGeometry args={[.035, height - innerInset * 2, innerThickness]} /><InsetGold /></mesh>
  </>;
}

function RecessedNiche({ side, niche }) {
  const { id, y, z, width, height, shelves, glazed } = niche;
  const rotation = side < 0 ? [0, 0, 0] : [0, Math.PI, 0];
  const shelfPositions = Array.from({ length: shelves }, (_, index) => {
    const interiorHeight = height - .58;
    return -height / 2 + .29 + ((index + 1) * interiorHeight) / (shelves + 1);
  });

  return <group name={`lara-niche-${id}`} position={[side * ROOM.width / 2, y, z]} rotation={rotation}>
    {/* Four real cavity surfaces are recessed behind the existing ShapeGeometry wall opening. */}
    <NicheBackPanel width={width} height={height} />
    <mesh position={[-CAVITY_DEPTH / 2, height / 2 - .1, 0]} receiveShadow>
      <boxGeometry args={[CAVITY_DEPTH, .2, width]} />
      <meshStandardMaterial color={INTERIOR} metalness={.18} roughness={.82} />
    </mesh>
    <mesh position={[-CAVITY_DEPTH / 2, -height / 2 + .1, 0]} receiveShadow>
      <boxGeometry args={[CAVITY_DEPTH, .2, width]} />
      <meshStandardMaterial color={INTERIOR} metalness={.18} roughness={.82} />
    </mesh>
    <mesh position={[-CAVITY_DEPTH / 2, 0, -width / 2 + .1]} receiveShadow>
      <boxGeometry args={[CAVITY_DEPTH, height, .2]} />
      <meshStandardMaterial color={INTERIOR} metalness={.18} roughness={.82} />
    </mesh>
    <mesh position={[-CAVITY_DEPTH / 2, 0, width / 2 - .1]} receiveShadow>
      <boxGeometry args={[CAVITY_DEPTH, height, .2]} />
      <meshStandardMaterial color={INTERIOR} metalness={.18} roughness={.82} />
    </mesh>

    <HeavyOpeningSurround width={width} height={height} />

    {/* Light sources are buried in cavity joints; only their reflected amber glow is visible. */}
    <HiddenAmberStrip position={[-.11, height / 2 - .24, 0]} size={[.012, .014, width - .38]} intensity={.42} />
    <HiddenAmberStrip position={[-.11, 0, -width / 2 + .22]} size={[.012, height - .44, .014]} intensity={.22} />
    <HiddenAmberStrip position={[-.11, 0, width / 2 - .22]} size={[.012, height - .44, .014]} intensity={.22} />

    {shelfPositions.map((shelfY) => <ArchitecturalShelf key={shelfY} y={shelfY} width={width} />)}

    {glazed && <mesh position={[.075, 0, 0]}>
      <boxGeometry args={[.01, height - .24, width - .24]} />
      <meshPhysicalMaterial color="#e9cda3" transparent opacity={.07} transmission={.34} roughness={.16} metalness={.02} />
    </mesh>}
  </group>;
}

export default function LaraExhibitionWalls() {
  return <group name="lara-recessed-exhibition-walls">
    {LARA_NICHE_LAYOUT.left.map((niche) => <RecessedNiche key={niche.id} side={-1} niche={niche} />)}
    {LARA_NICHE_LAYOUT.right.map((niche) => <RecessedNiche key={niche.id} side={1} niche={niche} />)}
  </group>;
}
