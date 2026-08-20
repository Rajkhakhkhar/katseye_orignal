import { ROOM } from './roomConfig';
import { AdaptiveGalleryFrame } from './RoomFrames';

const WINE = '#4a121f';
const WINE_DEEP = '#250a12';
const BLACK_METAL = '#121216';
const BLACK_SOFT = '#24242a';
const WARM = '#ffe3c1';
const CRIMSON = '#a92643';
const GOLD = '#c29455';

function DanielaWallPanel({ side, z, span = 3.9 }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const edge = span / 2 - .14;
  return <group position={[side * 3.965, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[span, 4.64, .1]} /><meshPhysicalMaterial color={WINE_DEEP} metalness={.3} roughness={.44} clearcoat={.1} /></mesh>
    <mesh position={[0, 0, .065]}><boxGeometry args={[span - .24, 4.4, .035]} /><meshPhysicalMaterial color={WINE} metalness={.14} roughness={.58} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`side-${direction}`} position={[direction * edge, 0, .105]}><boxGeometry args={[.12, 4.36, .072]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.88} roughness={.2} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`top-${direction}`} position={[0, direction * 2.1, .105]}><boxGeometry args={[span - .2, .12, .072]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.88} roughness={.2} /></mesh>)}
    <mesh position={[0, 0, .112]}><boxGeometry args={[span - .72, 3.7, .04]} /><meshPhysicalMaterial color="#641d2d" metalness={.12} roughness={.62} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`gold-${direction}`} position={[direction * (span / 2 - .42), 0, .145]}><boxGeometry args={[.04, 3.76, .025]} /><meshPhysicalMaterial color={GOLD} metalness={.88} roughness={.16} /></mesh>)}
    {[-.42, .42].map((x) => <mesh key={x} position={[x, 0, .14]}><boxGeometry args={[.045, 3.44, .03]} /><meshStandardMaterial color="#cf4d5e" emissive="#742031" emissiveIntensity={.48} /></mesh>)}
  </group>;
}

function DanielaIntegratedNiche({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`daniela-performance-niche-${side}-${z}`} position={[side * 3.97, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[2.5, 4.34, .12]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.84} roughness={.2} clearcoat={.08} /></mesh>
    <mesh position={[0, 0, .075]}><boxGeometry args={[2.12, 3.94, .045]} /><meshPhysicalMaterial color="#32101a" metalness={.36} roughness={.4} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * 1.1, 0, .13]}><boxGeometry args={[.11, 4.12, .08]} /><meshPhysicalMaterial color={BLACK_SOFT} metalness={.9} roughness={.18} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`h-${direction}`} position={[0, direction * 2.0, .13]}><boxGeometry args={[2.28, .11, .08]} /><meshPhysicalMaterial color={BLACK_SOFT} metalness={.9} roughness={.18} /></mesh>)}
    <mesh position={[0, 0, .145]}><boxGeometry args={[1.88, 3.58, .026]} /><meshPhysicalMaterial color="#fff0de" transparent opacity={.12} transmission={.25} roughness={.12} /></mesh>
    {[-.82, .82].map((x) => <mesh key={x} position={[x, 0, .16]}><boxGeometry args={[.035, 3.36, .04]} /><meshStandardMaterial color={WARM} emissive="#c76345" emissiveIntensity={1.0} /></mesh>)}
    <DanielaNicheCollection side={side} z={z} />
  </group>;
}

function DanielaNicheCollection({ side, z }) {
  if (z < 0) return <DanielaStageMannequin side={side} />;
  return <DanielaAwardCabinet side={side} />;
}

function DanielaStageMannequin({ side }) {
  return <group name={`daniela-stage-outfit-mannequin-${side}`} position={[0, -.2, .24]}>
    <mesh position={[0, -1.58, 0]}><cylinderGeometry args={[.44, .56, .13, 48]} /><meshPhysicalMaterial color="#181419" metalness={.78} roughness={.2} /></mesh>
    <mesh position={[0, -.65, 0]}><cylinderGeometry args={[.055, .075, 1.55, 24]} /><meshPhysicalMaterial color={GOLD} metalness={.9} roughness={.13} /></mesh>
    <mesh position={[0, .12, 0]} scale={[.36, 1.08, .26]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color="#d8c0ae" metalness={.28} roughness={.36} /></mesh>
    <mesh position={[0, .03, .15]} scale={[.48, 1.06, .12]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color={side < 0 ? '#791a2d' : '#551222'} metalness={.4} roughness={.3} clearcoat={.26} /></mesh>
    <mesh position={[0, .92, .04]} scale={[.14, .14, .14]}><sphereGeometry args={[1, 28, 22]} /><meshPhysicalMaterial color="#d5c0b1" metalness={.26} roughness={.4} /></mesh>
    <mesh position={[0, .36, .19]}><torusGeometry args={[.37, .027, 10, 36, Math.PI]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.1} /></mesh>
  </group>;
}

function DanielaAwardCabinet({ side }) {
  const heelColor = side < 0 ? '#c79a5c' : '#b72542';
  return <group name={`daniela-award-accessory-cabinet-${side}`} position={[0, -.12, .24]}>
    {[-1.03, -.1, .82].map((y) => <group key={y}>
      <mesh position={[0, y, 0]}><boxGeometry args={[1.55, .055, .32]} /><meshPhysicalMaterial color="#332023" metalness={.54} roughness={.28} clearcoat={.12} /></mesh>
      <mesh position={[0, y + .055, .18]}><boxGeometry args={[1.35, .014, .018]} /><meshStandardMaterial color={WARM} emissive="#bb724a" emissiveIntensity={.95} /></mesh>
    </group>)}
    {[-.38, .38].map((x) => <group key={x} position={[x, -1.02, .1]} rotation={[0, side * .12, 0]}>
      <mesh position={[0, .08, 0]} scale={[.22, .075, .43]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color={heelColor} metalness={.52} roughness={.22} clearcoat={.36} /></mesh>
      <mesh position={[.1, .02, .3]}><boxGeometry args={[.26, .035, .05]} /><meshPhysicalMaterial color="#d9b87d" metalness={.88} roughness={.13} /></mesh>
    </group>)}
    <group position={[0, -.15, .1]}>
      <mesh position={[0, -.1, 0]}><cylinderGeometry args={[.14, .22, .13, 36]} /><meshPhysicalMaterial color="#121216" metalness={.9} roughness={.12} /></mesh>
      <mesh position={[0, .25, 0]}><sphereGeometry args={[.21, 30, 22]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.11} /></mesh>
      <mesh position={[0, .25, .15]}><sphereGeometry args={[.12, 24, 18]} /><meshPhysicalMaterial color="#4d1a26" metalness={.62} roughness={.18} /></mesh>
    </group>
    <group position={[0, .82, .1]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.33, .05, 12, 36, Math.PI]} /><meshPhysicalMaterial color="#d7c3aa" metalness={.94} roughness={.1} /></mesh>
      {[-.29, .29].map((x) => <mesh key={x} position={[x, -.1, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.11, .11, .07, 28]} /><meshPhysicalMaterial color="#191419" metalness={.8} roughness={.16} /></mesh>)}
    </group>
  </group>;
}

function DanielaStoneFloor() {
  const seams = [-7.05, -4.6, -2.15, .3, 2.75, 5.2];
  return <group name="daniela-glossy-dark-walnut-dance-floor">
    <mesh position={[0, .026, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.72, 18.8]} /><meshPhysicalMaterial color="#211418" metalness={.14} roughness={.22} clearcoat={.58} clearcoatRoughness={.12} /></mesh>
    {[-2.9, -1.45, 0, 1.45, 2.9].map((x, index) => <mesh key={x} position={[x, .034, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.34, 18.58]} /><meshPhysicalMaterial color={index % 2 ? '#2a171b' : '#361a20'} metalness={.12} roughness={.24} clearcoat={.5} clearcoatRoughness={.12} /></mesh>)}
    {seams.map((z) => <mesh key={z} position={[0, .044, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.5, .025]} /><meshBasicMaterial color="#7b313b" transparent opacity={.56} /></mesh>)}
  </group>;
}

function DanielaRug() {
  return <group name="daniela-luxury-entrance-performance-rug" position={[0, .07, 2.55]}>
    <mesh position={[0, .04, 0]}><boxGeometry args={[5.95, .14, 6.72]} /><meshPhysicalMaterial color="#32101a" metalness={.04} roughness={.96} clearcoat={.04} /></mesh>
    <mesh position={[0, .114, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.64, 6.42]} /><meshPhysicalMaterial color="#5d1c2c" metalness={.04} roughness={.94} /></mesh>
    {[[0, 3.16, 5.64, .06], [0, -3.16, 5.64, .06], [-2.79, 0, .06, 6.32], [2.79, 0, .06, 6.32]].map(([x, z, width, height], index) => <mesh key={index} position={[x, .128, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width, height]} /><meshBasicMaterial color={GOLD} transparent opacity={.62} /></mesh>)}
    {[-2.05, -1.02, 0, 1.02, 2.05].map((x) => <mesh key={x} position={[x, .13, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.022, 5.86]} /><meshBasicMaterial color="#d56767" transparent opacity={.2} /></mesh>)}
    {[0, Math.PI / 2].map((rotation) => <mesh key={rotation} position={[0, .132, 0]} rotation={[-Math.PI / 2, 0, rotation]}><ringGeometry args={[.72, .79, 4, 1]} /><meshBasicMaterial color="#e0b06e" transparent opacity={.55} /></mesh>)}
  </group>;
}

function DanielaGeometricCeiling() {
  const runs = [5.9, 2.15, -1.6, -5.35];
  return <group name="daniela-geometric-ceiling">
    <mesh position={[0, 4.9, -.58]}><boxGeometry args={[6.74, .14, 16.8]} /><meshPhysicalMaterial color="#17161b" metalness={.5} roughness={.3} clearcoat={.12} /></mesh>
    {runs.map((z) => <group key={z}>
      <mesh position={[0, 4.68, z]}><boxGeometry args={[6.55, .32, .22]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.88} roughness={.17} /></mesh>
      <mesh position={[0, 4.5, z]}><boxGeometry args={[5.86, .045, .042]} /><meshStandardMaterial color={WARM} emissive="#ca7854" emissiveIntensity={1.05} /></mesh>
    </group>)}
    {[-2.95, 2.95].map((x) => <group key={x}>
      <mesh position={[x, 4.72, -.58]}><boxGeometry args={[.2, .24, 16.65]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.88} roughness={.17} /></mesh>
      <mesh position={[x - (x > 0 ? .15 : -.15), 4.58, -.58]}><boxGeometry args={[.04, .03, 16.4]} /><meshStandardMaterial color={WARM} emissive="#ca7854" emissiveIntensity={1.32} /></mesh>
    </group>)}
  </group>;
}

function DanielaMirror({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`daniela-led-performance-mirror-${side}-${z}`} position={[side * 3.89, 2.48, z]} rotation={rotation}>
    <mesh><boxGeometry args={[1.72, 4.12, .09]} /><meshPhysicalMaterial color="#171419" metalness={.92} roughness={.14} /></mesh>
    <mesh position={[0, 0, .062]}><boxGeometry args={[1.42, 3.78, .028]} /><meshPhysicalMaterial color="#8e5b5d" metalness={.82} roughness={.06} clearcoat={.42} transmission={.12} transparent opacity={.76} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * .67, 0, .092]}><boxGeometry args={[.036, 3.86, .03]} /><meshStandardMaterial color={WARM} emissive="#bd754d" emissiveIntensity={1.1} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`horizontal-${direction}`} position={[0, direction * 1.82, .092]}><boxGeometry args={[1.38, .036, .03]} /><meshStandardMaterial color={WARM} emissive="#bd754d" emissiveIntensity={.88} /></mesh>)}
  </group>;
}

function DanielaWallSconce({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`daniela-wall-sconce-${side}-${z}`} position={[side * 3.83, 3.18, z]} rotation={rotation}>
    <mesh><boxGeometry args={[.2, .62, .08]} /><meshPhysicalMaterial color="#191419" metalness={.9} roughness={.14} /></mesh>
    <mesh position={[0, .04, .075]} scale={[.075, .22, .045]}><sphereGeometry args={[1, 24, 18]} /><meshPhysicalMaterial color="#d8a66b" metalness={.26} roughness={.16} transmission={.26} transparent opacity={.78} /></mesh>
    <pointLight position={[0, .02, .22]} color="#ffd8a8" intensity={.42} distance={2.4} decay={2} />
  </group>;
}

function DanielaSculpturalChandelier() {
  return <group name="daniela-sculptural-performance-chandelier" position={[0, 4.22, -.48]}>
    <mesh position={[0, .4, 0]}><cylinderGeometry args={[.024, .024, .68, 16]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.12} /></mesh>
    <group position={[0, .04, 0]} rotation={[.22, .4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.04, .052, 12, 52]} /><meshPhysicalMaterial color="#171419" metalness={.94} roughness={.12} /></mesh>
      <mesh rotation={[.35, Math.PI / 2, -.22]}><torusGeometry args={[.7, .045, 12, 48]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.12} /></mesh>
    </group>
    {[-.72, -.25, .25, .72].map((x, index) => <group key={x} position={[x, -.4 - (index % 2) * .12, index % 2 ? .22 : -.18]}>
      <mesh><sphereGeometry args={[.115, 24, 18]} /><meshStandardMaterial color="#fff1db" emissive="#f4b871" emissiveIntensity={1.3} /></mesh>
      <mesh position={[0, .32 + (index % 2) * .12, 0]}><cylinderGeometry args={[.012, .012, .58 + (index % 2) * .12, 12]} /><meshPhysicalMaterial color="#b78a51" metalness={.9} roughness={.14} /></mesh>
    </group>)}
  </group>;
}

function DanielaStageArchitecture() {
  return <group name="daniela-stage-architecture">
    <mesh position={[0, 2.5, ROOM.backWallZ + .07]}><boxGeometry args={[5.82, 4.42, .085]} /><meshPhysicalMaterial color="#210d15" metalness={.4} roughness={.42} clearcoat={.1} /></mesh>
    <mesh position={[0, 2.5, ROOM.backWallZ + .12]}><boxGeometry args={[5.32, 3.92, .03]} /><meshPhysicalMaterial color="#57182a" metalness={.14} roughness={.6} /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 2.48, 2.5, ROOM.backWallZ + .16]}><boxGeometry args={[.12, 3.74, .07]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.9} roughness={.16} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`stage-h-${direction}`} position={[0, 2.5 + direction * 1.8, ROOM.backWallZ + .16]}><boxGeometry args={[5.06, .12, .07]} /><meshPhysicalMaterial color={BLACK_METAL} metalness={.9} roughness={.16} /></mesh>)}
    {[-1.55, -.78, .78, 1.55].map((x) => <mesh key={x} position={[x, 3.63, ROOM.backWallZ + .19]} rotation={[0, 0, x < 0 ? -.34 : .34]}><boxGeometry args={[.075, 1.26, .05]} /><meshStandardMaterial color="#cf4e61" emissive="#7a1d30" emissiveIntensity={.38} /></mesh>)}
  </group>;
}

function DanielaPlatinumPerformanceWall() {
  return <group name="daniela-platinum-choreography-record-wall" position={[0, 2.46, ROOM.backWallZ + .205]}>
    <mesh><boxGeometry args={[4.96, 3.3, .07]} /><meshPhysicalMaterial color="#2a1019" metalness={.56} roughness={.3} clearcoat={.12} /></mesh>
    <mesh position={[0, 0, .055]}><boxGeometry args={[4.56, 2.92, .026]} /><meshPhysicalMaterial color="#4d1728" metalness={.18} roughness={.52} /></mesh>
    {[-2.1, 2.1].map((x) => <mesh key={x} position={[x, 0, .09]}><boxGeometry args={[.075, 3.02, .04]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.12} /></mesh>)}
    {[-1.22, 1.22].map((x) => <group key={x} position={[x, .34, .11]}>
      <mesh rotation={[0, 0, Math.PI / 8]}><torusGeometry args={[.42, .07, 12, 48]} /><meshPhysicalMaterial color="#c7ccd0" metalness={.94} roughness={.1} /></mesh>
      <mesh position={[0, 0, .025]}><circleGeometry args={[.31, 40]} /><meshPhysicalMaterial color="#d4d9dc" metalness={.92} roughness={.1} /></mesh>
      <mesh position={[0, 0, .045]}><circleGeometry args={[.1, 24]} /><meshStandardMaterial color="#7b1f32" emissive="#4b1020" emissiveIntensity={.28} /></mesh>
    </group>)}
    <mesh position={[0, 1.1, .095]}><boxGeometry args={[1.5, .08, .038]} /><meshPhysicalMaterial color={GOLD} metalness={.92} roughness={.12} /></mesh>
    <AdaptiveGalleryFrame src="/hero-daniela-hq.png" position={[-.6, -.84, .13]} maxWidth={1.02} maxHeight={1.08} frameStyle={{ borderColor: GOLD, borderMetalness: .92, borderRoughness: .12, backingColor: '#190d13', borderThickness: .08, depth: .055 }} />
    <AdaptiveGalleryFrame src="/daniela.png" position={[.72, -.84, .13]} maxWidth={.9} maxHeight={1.08} frameStyle={{ borderColor: GOLD, borderMetalness: .92, borderRoughness: .12, backingColor: '#190d13', borderThickness: .08, depth: .055 }} />
    <pointLight position={[0, .5, .6]} color="#ffd29e" intensity={1.0} distance={4.2} decay={2} />
  </group>;
}

function DanielaWarmLighting() {
  const zones = [5.1, .2, -4.45];
  return <group name="daniela-warm-performance-lighting">
    <ambientLight color="#f2cdb6" intensity={.24} />
    <hemisphereLight args={['#ffe2cf', '#271018', .24]} />
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`wash-${side}-${z}`} position={[side * 3.38, 3.05, z]} color={WARM} intensity={1.34} distance={4.9} decay={2} />))}
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`accent-${side}-${z}`} position={[side * 3.18, 1.05, z]} color={CRIMSON} intensity={.25} distance={3.0} decay={2} />))}
    {[-1, 1].map((side) => <pointLight key={`display-spot-${side}`} position={[side * 2.82, 3.82, -5.7]} color="#ffd2a0" intensity={.78} distance={4.1} decay={2} />)}
    <pointLight position={[0, 4.28, -.5]} color="#ffe5cc" intensity={1.55} distance={8.4} decay={2} />
  </group>;
}

export default function DanielaPerformanceDecor() {
  const panelRuns = [4.9, .75, -3.35];
  return <group name="daniela-performance-gallery">
    <DanielaWarmLighting />
    <DanielaStoneFloor />
    <DanielaRug />
    <DanielaGeometricCeiling />
    <DanielaSculpturalChandelier />
    <DanielaStageArchitecture />
    <DanielaPlatinumPerformanceWall />
    {[-1, 1].flatMap((side) => panelRuns.map((z) => <DanielaWallPanel key={`${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].flatMap((side) => [6.18, -6.25].map((z) => <DanielaIntegratedNiche key={`niche-${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].map((side) => <DanielaMirror key={`mirror-${side}`} side={side} z={.62} />)}
    {[-1, 1].flatMap((side) => [5.82, 2.62, -3.72].map((z) => <DanielaWallSconce key={`sconce-${side}-${z}`} side={side} z={z} />))}
  </group>;
}
