import { ROOM } from './roomConfig';

const CHARCOAL = '#262a30';
const CHARCOAL_DARK = '#14171b';
const GRAPHITE = '#333940';
const SILVER = '#b8c2cb';
const ICE = '#e8f1f5';

function StudioWallPanel({ side, z, span = 3.9 }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const edge = span / 2 - .14;
  return <group position={[side * 3.965, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[span, 4.64, .1]} /><meshPhysicalMaterial color={CHARCOAL_DARK} metalness={.5} roughness={.34} clearcoat={.1} /></mesh>
    <mesh position={[0, 0, .065]}><boxGeometry args={[span - .22, 4.4, .035]} /><meshPhysicalMaterial color={CHARCOAL} metalness={.28} roughness={.5} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`v-${direction}`} position={[direction * edge, 0, .105]}><boxGeometry args={[.105, 4.34, .07]} /><meshPhysicalMaterial color={SILVER} metalness={.92} roughness={.14} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`h-${direction}`} position={[0, direction * 2.1, .105]}><boxGeometry args={[span - .2, .105, .07]} /><meshPhysicalMaterial color={SILVER} metalness={.92} roughness={.14} /></mesh>)}
    {[-.62, -.21, .21, .62].map((x) => <mesh key={x} position={[x, 0, .13]}><boxGeometry args={[.055, 3.66, .03]} /><meshPhysicalMaterial color={GRAPHITE} metalness={.58} roughness={.28} /></mesh>)}
  </group>;
}

function StudioDisplayBay({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`megan-integrated-display-bay-${side}-${z}`} position={[side * 3.97, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[2.5, 4.34, .12]} /><meshPhysicalMaterial color={CHARCOAL_DARK} metalness={.68} roughness={.26} clearcoat={.08} /></mesh>
    <mesh position={[0, 0, .075]}><boxGeometry args={[2.12, 3.94, .045]} /><meshPhysicalMaterial color="#1e2329" metalness={.48} roughness={.34} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`v-${direction}`} position={[direction * 1.1, 0, .13]}><boxGeometry args={[.1, 4.1, .078]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.13} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`h-${direction}`} position={[0, direction * 2.0, .13]}><boxGeometry args={[2.28, .1, .078]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.13} /></mesh>)}
    <mesh position={[0, 0, .145]}><boxGeometry args={[1.88, 3.58, .026]} /><meshPhysicalMaterial color="#eaf3f7" transparent opacity={.12} transmission={.2} roughness={.1} /></mesh>
    {[-.78, .78].map((x) => <mesh key={x} position={[x, 0, .16]}><boxGeometry args={[.03, 3.35, .036]} /><meshStandardMaterial color={ICE} emissive="#9bb8c7" emissiveIntensity={1.0} /></mesh>)}
    <mesh position={[0, 0, .17]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.6, .6, .025]} /><meshPhysicalMaterial color="#485865" metalness={.72} roughness={.2} clearcoat={.1} /></mesh>
    <StudioBayExhibit side={side} z={z} />
    <pointLight position={[0, .45, .3]} color="#e8f5fb" intensity={.72} distance={2.4} decay={2} />
  </group>;
}

function HeadphonesExhibit() {
  return <group name="megan-headphones-exhibit" position={[0, .02, .22]}>
    <mesh position={[0, -.98, 0]}><cylinderGeometry args={[.46, .56, .16, 36]} /><meshPhysicalMaterial color="#1b2026" metalness={.72} roughness={.24} clearcoat={.18} /></mesh>
    <mesh position={[0, -.56, 0]}><cylinderGeometry args={[.11, .16, .76, 24]} /><meshPhysicalMaterial color={SILVER} metalness={.9} roughness={.15} /></mesh>
    <mesh position={[0, .12, 0]}><torusGeometry args={[.48, .06, 10, 36, Math.PI]} /><meshPhysicalMaterial color="#d7e0e5" metalness={.92} roughness={.14} /></mesh>
    {[-.43, .43].map((x) => <mesh key={x} position={[x, -.13, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.16, .16, .09, 28]} /><meshPhysicalMaterial color="#20262d" metalness={.76} roughness={.2} clearcoat={.16} /></mesh>)}
  </group>;
}

function FashionExhibit() {
  return <group name="megan-brushed-metal-smoked-glass-sculpture" position={[0, -.02, .22]}>
    <mesh position={[0, -.96, 0]}><cylinderGeometry args={[.52, .6, .12, 48]} /><meshPhysicalMaterial color="#151b20" metalness={.9} roughness={.16} clearcoat={.16} /></mesh>
    <mesh position={[0, -.79, 0]}><cylinderGeometry args={[.38, .44, .18, 48]} /><meshPhysicalMaterial color="#2d3940" metalness={.84} roughness={.17} /></mesh>
    <group position={[0, .08, .02]} rotation={[.08, .36, .04]}>
      <mesh scale={[.36, 1.12, .19]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color="#78909b" metalness={.18} roughness={.08} transmission={.34} transparent opacity={.58} clearcoat={.45} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, .25]}><torusGeometry args={[.64, .055, 12, 48]} /><meshPhysicalMaterial color="#182128" metalness={.94} roughness={.12} /></mesh>
      <mesh rotation={[.18, Math.PI / 2, -.28]}><torusGeometry args={[.43, .04, 12, 40]} /><meshPhysicalMaterial color="#bdcbd1" metalness={.92} roughness={.13} /></mesh>
    </group>
    <mesh position={[0, 1.1, .02]} scale={[.14, .14, .14]}><sphereGeometry args={[1, 30, 24]} /><meshPhysicalMaterial color="#c5d4d9" metalness={.9} roughness={.14} /></mesh>
  </group>;
}

function DanceAwardExhibit() {
  return <group name="megan-dance-award-exhibit" position={[0, -.02, .22]}>
    <mesh position={[0, -.98, 0]}><cylinderGeometry args={[.46, .58, .16, 36]} /><meshPhysicalMaterial color="#1b2026" metalness={.72} roughness={.24} clearcoat={.18} /></mesh>
    <mesh position={[0, -.56, 0]}><cylinderGeometry args={[.12, .2, .72, 24]} /><meshPhysicalMaterial color={SILVER} metalness={.92} roughness={.14} /></mesh>
    <mesh position={[0, .2, 0]} rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[.44, .06, 10, 32, Math.PI * 1.55]} /><meshPhysicalMaterial color="#eff6f8" metalness={.84} roughness={.16} /></mesh>
    <mesh position={[.1, .14, 0]} rotation={[0, 0, -.34]}><boxGeometry args={[.12, 1.12, .09]} /><meshPhysicalMaterial color="#9daab2" metalness={.88} roughness={.15} /></mesh>
  </group>;
}

function ProductionExhibit() {
  return <group name="megan-production-exhibit" position={[0, -.12, .22]}>
    <mesh position={[0, -.9, 0]}><cylinderGeometry args={[.48, .58, .16, 36]} /><meshPhysicalMaterial color="#1b2026" metalness={.72} roughness={.24} clearcoat={.18} /></mesh>
    <mesh position={[0, -.53, 0]}><boxGeometry args={[1.22, .14, .68]} /><meshPhysicalMaterial color="#20272d" metalness={.7} roughness={.22} clearcoat={.16} /></mesh>
    <mesh position={[0, -.44, -.08]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.27, .27, .04, 40]} /><meshPhysicalMaterial color="#101419" metalness={.78} roughness={.18} /></mesh>
    <mesh position={[0, -.4, -.08]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.08, .08, .05, 24]} /><meshPhysicalMaterial color={SILVER} metalness={.9} roughness={.14} /></mesh>
    {[-.42, -.21, 0, .21, .42].map((x) => <mesh key={x} position={[x, -.37, .19]}><cylinderGeometry args={[.055, .055, .06, 18]} /><meshPhysicalMaterial color="#c4d4dc" metalness={.86} roughness={.14} /></mesh>)}
  </group>;
}

function StudioBayExhibit({ side, z }) {
  if (z > 0 && side < 0) return <HeadphonesExhibit />;
  if (z > 0) return <FashionExhibit />;
  if (side < 0) return <DanceAwardExhibit />;
  return <ProductionExhibit />;
}

function FeatureWallBay({ index, side }) {
  const exhibit = side < 0
    ? (index === 0 ? <HeadphonesExhibit /> : index === 1 ? <FashionExhibit /> : <DanceAwardExhibit />)
    : (index === 0 ? <ProductionExhibit /> : index === 1 ? <FashionExhibit /> : <DanceAwardExhibit />);
  return <group name={`megan-feature-bay-${index}`} position={[(index - 1) * 5.75, 0, .12]}>
    <mesh><boxGeometry args={[4.62, 4.32, .26]} /><meshPhysicalMaterial color="#101419" metalness={.8} roughness={.2} clearcoat={.1} /></mesh>
    <mesh position={[0, 0, .15]}><boxGeometry args={[4.16, 3.84, .075]} /><meshPhysicalMaterial color="#222a30" metalness={.5} roughness={.32} clearcoat={.12} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`side-${direction}`} position={[direction * 2.12, 0, .19]}><boxGeometry args={[.13, 4.02, .11]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.12} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`top-${direction}`} position={[0, direction * 1.93, .19]}><boxGeometry args={[4.34, .13, .11]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.12} /></mesh>)}
    {[-.96, .96].map((x) => <mesh key={x} position={[x, 0, .23]}><boxGeometry args={[.038, 3.52, .05]} /><meshStandardMaterial color={ICE} emissive="#8fb2c2" emissiveIntensity={1.22} /></mesh>)}
    {[-1.08, -.18, .72].map((y) => <group key={y}>
      <mesh position={[0, y, .22]}><boxGeometry args={[3.66, .07, .16]} /><meshPhysicalMaterial color="#422d20" metalness={.16} roughness={.32} clearcoat={.18} /></mesh>
      <mesh position={[0, y - .055, .275]}><boxGeometry args={[3.48, .018, .025]} /><meshStandardMaterial color="#f0d2a5" emissive="#b8733e" emissiveIntensity={.72} /></mesh>
    </group>)}
    <group position={[0, .34, .27]}>{exhibit}</group>
    {index === 1 && <FeatureWallShelfCuration side={side} />}
    <mesh position={[0, 0, .285]}><boxGeometry args={[3.55, 3.38, .028]} /><meshPhysicalMaterial color="#eaf3f7" transparent opacity={.1} transmission={.18} roughness={.1} /></mesh>
    <pointLight position={[0, .55, .42]} color="#e5f5fb" intensity={1.05} distance={3.2} decay={2} />
  </group>;
}

function FeatureWallShelfCuration({ side }) {
  const sculptureColor = side < 0 ? '#b4c4ca' : '#a8b7bd';
  return <group name="megan-curated-walnut-shelf-details" position={[0, -.7, .34]}>
    {[-1.34, -1.17, -1].map((x, index) => <mesh key={x} position={[x, .04 + index * .025, 0]}><boxGeometry args={[.09, .44 + index * .06, .2]} /><meshPhysicalMaterial color={index === 1 ? '#d4d7d8' : '#2f3941'} metalness={.42} roughness={.42} /></mesh>)}
    {[-.78, -.62].map((x, index) => <mesh key={x} position={[x, .03, 0]}><boxGeometry args={[.1, .32 + index * .08, .2]} /><meshPhysicalMaterial color={index ? '#6f7680' : '#5e4637'} metalness={.34} roughness={.46} /></mesh>)}
    <group position={[1.18, .19, .02]} rotation={[0, .45, .2]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.22, .045, 12, 32]} /><meshPhysicalMaterial color={sculptureColor} metalness={.9} roughness={.13} /></mesh>
      <mesh rotation={[0, Math.PI / 2, .4]}><torusGeometry args={[.16, .04, 12, 32]} /><meshPhysicalMaterial color="#28353d" metalness={.9} roughness={.14} /></mesh>
    </group>
    <group position={[.18, .22, .01]}>
      <mesh><boxGeometry args={[.48, .58, .035]} /><meshPhysicalMaterial color="#1c2329" metalness={.85} roughness={.16} /></mesh>
      <mesh position={[0, 0, .024]}><boxGeometry args={[.37, .43, .012]} /><meshPhysicalMaterial color="#a8bac2" metalness={.2} roughness={.18} transmission={.18} transparent opacity={.62} /></mesh>
      <mesh position={[-.09, .04, .035]} scale={[.08, .14, .02]}><sphereGeometry args={[1, 18, 14]} /><meshPhysicalMaterial color="#d5dce0" metalness={.3} roughness={.42} /></mesh>
      <mesh position={[.1, -.06, .035]} scale={[.09, .1, .02]}><sphereGeometry args={[1, 18, 14]} /><meshPhysicalMaterial color="#33424a" metalness={.5} roughness={.34} /></mesh>
    </group>
    <group position={[.74, .2, .02]}>
      <mesh position={[0, -.06, 0]}><cylinderGeometry args={[.18, .24, .12, 36]} /><meshPhysicalMaterial color="#1a2228" metalness={.9} roughness={.14} /></mesh>
      <mesh position={[0, .24, 0]}><sphereGeometry args={[.18, 28, 20]} /><meshPhysicalMaterial color="#c0d0d5" metalness={.92} roughness={.12} /></mesh>
      <mesh position={[0, .24, .13]}><sphereGeometry args={[.105, 24, 18]} /><meshPhysicalMaterial color="#2b3740" metalness={.76} roughness={.18} /></mesh>
    </group>
  </group>;
}

function StudioFeatureWall({ side }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`megan-full-height-feature-wall-${side}`} position={[side * 3.97, 2.5, -.5]} rotation={rotation}>
    <mesh><boxGeometry args={[17.5, 4.74, .22]} /><meshPhysicalMaterial color="#11151a" metalness={.66} roughness={.24} clearcoat={.1} /></mesh>
    <mesh position={[0, 0, .125]}><boxGeometry args={[17.12, 4.44, .065]} /><meshPhysicalMaterial color="#242d34" metalness={.38} roughness={.36} /></mesh>
    {[-8.35, -2.88, 2.88, 8.35].map((x) => <mesh key={x} position={[x, 0, .17]}><boxGeometry args={[.17, 4.54, .11]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.12} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={direction} position={[0, direction * 2.18, .17]}><boxGeometry args={[17.0, .15, .11]} /><meshPhysicalMaterial color="#151b20" metalness={.9} roughness={.15} /></mesh>)}
    {[0, 1, 2].map((index) => <FeatureWallBay key={index} index={index} side={side} />)}
    {[-7.3, 7.3].map((x) => <mesh key={`edge-led-${x}`} position={[x, 0, .22]}><boxGeometry args={[.04, 4.1, .04]} /><meshStandardMaterial color={ICE} emissive="#9ebccb" emissiveIntensity={1.12} /></mesh>)}
  </group>;
}

function StudioFloor() {
  const seams = [-7.05, -4.6, -2.15, .3, 2.75, 5.2];
  return <group name="megan-polished-stone-floor">
    <mesh position={[0, .026, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.72, 18.8]} /><meshPhysicalMaterial color="#171a1e" metalness={.42} roughness={.22} clearcoat={.42} clearcoatRoughness={.16} /></mesh>
    {[-2.75, 0, 2.75].map((x, index) => <mesh key={x} position={[x, .034, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.34, 18.55]} /><meshPhysicalMaterial color={index === 1 ? '#1c2228' : '#12161a'} metalness={.38} roughness={.26} clearcoat={.38} clearcoatRoughness={.16} /></mesh>)}
    {seams.map((z) => <mesh key={z} position={[0, .04, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.5, .022]} /><meshBasicMaterial color="#58646e" transparent opacity={.56} /></mesh>)}
  </group>;
}

function StudioRug() {
  return <group name="megan-modern-studio-rug" position={[0, .07, -.62]}>
    <mesh position={[0, .04, 0]}><boxGeometry args={[6.32, .13, 14.25]} /><meshPhysicalMaterial color="#1d2228" metalness={.04} roughness={.96} clearcoat={.04} /></mesh>
    <mesh position={[0, .112, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.98, 13.91]} /><meshPhysicalMaterial color="#353d43" metalness={.04} roughness={.94} /></mesh>
    {[[0, 6.91, 5.98, .07], [0, -6.91, 5.98, .07], [-2.97, 0, .07, 13.82], [2.97, 0, .07, 13.82]].map(([x, z, width, height], index) => <mesh key={index} position={[x, .125, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width, height]} /><meshBasicMaterial color="#81909a" transparent opacity={.44} /></mesh>)}
    {[-1.6, 0, 1.6].map((x) => <mesh key={x} position={[x, .126, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.018, 12.6]} /><meshBasicMaterial color="#71808a" transparent opacity={.28} /></mesh>)}
    {[-5.35, -3.55, -1.75, .05, 1.85, 3.65, 5.45].map((z, index) => <mesh key={z} position={[0, .13, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.62, .022]} /><meshBasicMaterial color={index % 2 ? '#6a747a' : '#8b969c'} transparent opacity={.13} /></mesh>)}
    {[0, Math.PI / 2].map((rotation) => <mesh key={rotation} position={[0, .128, 0]} rotation={[-Math.PI / 2, 0, rotation]}><ringGeometry args={[1.02, 1.08, 4, 1]} /><meshBasicMaterial color="#a3b0b8" transparent opacity={.35} /></mesh>)}
    {[-2.82, 2.82].map((x) => [-5.8, -3.9, -2, 0, 2, 3.9, 5.8].map((z) => <mesh key={`${x}-${z}`} position={[x, .145, z]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.018, .13, 6, 10]} /><meshPhysicalMaterial color="#525c62" metalness={.02} roughness={.96} /></mesh>))}
    {[-6.52, 6.52].map((z) => [-2.5, -1.5, -.5, .5, 1.5, 2.5].map((x) => <mesh key={`${x}-${z}`} position={[x, .145, z]}><capsuleGeometry args={[.018, .13, 6, 10]} /><meshPhysicalMaterial color="#535d63" metalness={.02} roughness={.96} /></mesh>))}
  </group>;
}

function MuseumCabinetCollection({ side }) {
  const recordOffsets = side < 0 ? [-.35, .06, .45] : [-.45, -.06, .35];
  return <group name={`megan-performance-cabinet-collection-${side}`} position={[0, 0, .35]}>
    <group position={[-.3, -.56, 0]}>
      <mesh position={[0, .05, 0]}><cylinderGeometry args={[.09, .13, .96, 28]} /><meshPhysicalMaterial color="#171d22" metalness={.82} roughness={.16} /></mesh>
      <mesh position={[0, .58, 0]}><sphereGeometry args={[.17, 24, 18]} /><meshPhysicalMaterial color="#c9d5da" metalness={.9} roughness={.12} /></mesh>
      <mesh position={[0, .58, .1]}><sphereGeometry args={[.112, 24, 18]} /><meshPhysicalMaterial color="#273139" metalness={.75} roughness={.2} /></mesh>
      <mesh position={[0, -.44, 0]}><cylinderGeometry args={[.3, .36, .12, 32]} /><meshPhysicalMaterial color="#151b20" metalness={.85} roughness={.15} /></mesh>
    </group>
    <group position={[.36, .28, 0]}>
      <mesh position={[0, -.18, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.24, .045, 12, 32, Math.PI]} /><meshPhysicalMaterial color="#d4dfe2" metalness={.93} roughness={.1} /></mesh>
      {[-.21, .21].map((x) => <mesh key={x} position={[x, -.3, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.1, .1, .08, 24]} /><meshPhysicalMaterial color="#20282f" metalness={.8} roughness={.18} /></mesh>)}
    </group>
    <group position={[0, .95, -.02]}>
      {recordOffsets.map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.26, .26, .045, 40]} /><meshPhysicalMaterial color="#101419" metalness={.72} roughness={.17} clearcoat={.2} /></mesh>)}
      {recordOffsets.map((x) => <mesh key={`label-${x}`} position={[x, 0, .027]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.075, .075, .012, 24]} /><meshStandardMaterial color="#c1d1d8" emissive="#67889a" emissiveIntensity={.28} /></mesh>)}
    </group>
    <group position={[.42, -.78, 0]}>
      <mesh position={[0, .14, 0]}><cylinderGeometry args={[.08, .14, .52, 24]} /><meshPhysicalMaterial color="#becbd0" metalness={.92} roughness={.12} /></mesh>
      <mesh position={[0, .45, 0]}><sphereGeometry args={[.18, 24, 18]} /><meshPhysicalMaterial color="#ccd8dc" metalness={.9} roughness={.12} /></mesh>
      <mesh position={[0, -.18, 0]}><cylinderGeometry args={[.28, .34, .11, 32]} /><meshPhysicalMaterial color="#1a2127" metalness={.84} roughness={.16} /></mesh>
    </group>
  </group>;
}

function StageMuseumCabinet({ side }) {
  return <group name={`megan-smoked-glass-museum-cabinet-${side}`} position={[side * 3.18, 1.72, -7.95]}>
    <mesh><boxGeometry args={[1.36, 3.34, .62]} /><meshPhysicalMaterial color="#101419" metalness={.8} roughness={.2} clearcoat={.12} /></mesh>
    <mesh position={[0, 0, .35]}><boxGeometry args={[1.1, 2.98, .028]} /><meshPhysicalMaterial color="#566772" metalness={.15} roughness={.08} transmission={.3} transparent opacity={.32} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`upright-${direction}`} position={[direction * .57, 0, .36]}><boxGeometry args={[.08, 3.14, .1]} /><meshPhysicalMaterial color="#1d252b" metalness={.94} roughness={.2} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`rail-${direction}`} position={[0, direction * 1.51, .36]}><boxGeometry args={[1.2, .08, .1]} /><meshPhysicalMaterial color="#1d252b" metalness={.94} roughness={.2} /></mesh>)}
    {[-.9, .08, .92].map((y) => <group key={y}>
      <mesh position={[0, y, .28]}><boxGeometry args={[1.04, .055, .48]} /><meshPhysicalMaterial color="#30261f" metalness={.24} roughness={.32} /></mesh>
      <mesh position={[0, y + .055, .5]}><boxGeometry args={[.92, .018, .024]} /><meshStandardMaterial color="#f1c58d" emissive="#bd7e40" emissiveIntensity={.72} /></mesh>
    </group>)}
    <MuseumCabinetCollection side={side} />
  </group>;
}

function CabinetPerformanceAccessories({ side }) {
  return <group name={`megan-cabinet-performance-accessories-${side}`} position={[0, 0, .43]}>
    <group position={[-.32, -.72, 0]} rotation={[0, side * .14, 0]}>
      <mesh position={[0, .06, 0]} scale={[.25, .08, .54]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color="#1d252b" metalness={.58} roughness={.26} clearcoat={.18} /></mesh>
      <mesh position={[.16, .02, 0]} scale={[.17, .06, .33]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color="#d5dde0" metalness={.66} roughness={.18} /></mesh>
      <mesh position={[-.08, .14, .42]}><boxGeometry args={[.32, .035, .06]} /><meshPhysicalMaterial color="#9fb1b9" metalness={.86} roughness={.14} /></mesh>
    </group>
    <group position={[.34, -.72, 0]} rotation={[0, -side * .14, 0]}>
      <mesh position={[0, .06, 0]} scale={[.25, .08, .54]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color="#1d252b" metalness={.58} roughness={.26} clearcoat={.18} /></mesh>
      <mesh position={[.16, .02, 0]} scale={[.17, .06, .33]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color="#d5dde0" metalness={.66} roughness={.18} /></mesh>
      <mesh position={[-.08, .14, .42]}><boxGeometry args={[.32, .035, .06]} /><meshPhysicalMaterial color="#9fb1b9" metalness={.86} roughness={.14} /></mesh>
    </group>
    <group position={[0, .15, 0]}>
      <mesh><torusGeometry args={[.34, .045, 12, 36, Math.PI]} /><meshPhysicalMaterial color="#d4dee1" metalness={.94} roughness={.1} /></mesh>
      {[-.3, .3].map((x) => <mesh key={x} position={[x, -.1, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.11, .11, .08, 28]} /><meshPhysicalMaterial color="#161d22" metalness={.82} roughness={.16} /></mesh>)}
    </group>
    <group position={[0, .98, 0]}>
      {[-.34, 0, .34].map((x) => <group key={x} position={[x, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.19, .19, .04, 40]} /><meshPhysicalMaterial color="#11161b" metalness={.74} roughness={.16} clearcoat={.18} /></mesh>
        <mesh position={[0, 0, .028]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.055, .055, .012, 24]} /><meshStandardMaterial color="#c4a06e" emissive="#8a5c34" emissiveIntensity={.25} /></mesh>
      </group>)}
    </group>
    <group position={[.42, .28, 0]}>
      <mesh position={[0, -.14, 0]}><cylinderGeometry args={[.16, .22, .1, 36]} /><meshPhysicalMaterial color="#161d22" metalness={.92} roughness={.14} /></mesh>
      <mesh position={[0, .15, 0]}><sphereGeometry args={[.17, 28, 20]} /><meshPhysicalMaterial color="#c4d2d7" metalness={.92} roughness={.1} /></mesh>
      <mesh position={[0, .15, .12]}><sphereGeometry args={[.1, 24, 18]} /><meshPhysicalMaterial color="#27343c" metalness={.78} roughness={.16} /></mesh>
    </group>
    {[-.34, .03].map((x, index) => <group key={x} position={[x, .48, .012]}>
      <mesh><boxGeometry args={[.22, .31, .04]} /><meshPhysicalMaterial color="#151d23" metalness={.9} roughness={.14} /></mesh>
      <mesh position={[0, 0, .028]}><boxGeometry args={[.162, .236, .012]} /><meshPhysicalMaterial color={index ? '#b4c7d1' : '#829ca8'} metalness={.22} roughness={.18} transmission={.16} transparent opacity={.72} /></mesh>
      <mesh position={[index ? -.036 : .036, -.018, .038]} scale={[.045, .072, .012]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#d3dcdf" metalness={.28} roughness={.36} /></mesh>
    </group>)}
  </group>;
}

function MidMuseumCabinet({ side }) {
  return <group name={`megan-mid-room-smoked-glass-cabinet-${side}`} position={[side * 3.27, 1.74, -1.55]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh><boxGeometry args={[1.52, 3.46, .68]} /><meshPhysicalMaterial color="#1a242a" metalness={.9} roughness={.13} clearcoat={.24} clearcoatRoughness={.11} /></mesh>
    <mesh position={[0, 0, .37]}><boxGeometry args={[1.21, 3.16, .035]} /><meshPhysicalMaterial color="#91a8b2" metalness={.24} roughness={.06} transmission={.42} transparent opacity={.23} clearcoat={.42} clearcoatRoughness={.06} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`side-trim-${direction}`} position={[direction * .64, 0, .4]}><boxGeometry args={[.075, 3.28, .11]} /><meshPhysicalMaterial color="#151e24" metalness={.96} roughness={.14} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`top-trim-${direction}`} position={[0, direction * 1.57, .4]}><boxGeometry args={[1.32, .075, .11]} /><meshPhysicalMaterial color="#151e24" metalness={.96} roughness={.14} /></mesh>)}
    {[-.92, .12, 1.0].map((y) => <group key={y}>
      <mesh position={[0, y, .28]}><boxGeometry args={[1.18, .05, .5]} /><meshPhysicalMaterial color="#382a21" metalness={.26} roughness={.32} /></mesh>
      <mesh position={[0, y + .058, .53]}><boxGeometry args={[1.04, .016, .024]} /><meshStandardMaterial color="#fed5a2" emissive="#bd7840" emissiveIntensity={1.12} /></mesh>
    </group>)}
    <CabinetPerformanceAccessories side={side} />
  </group>;
}

function DesignerLoungeBench({ side }) {
  return <group name={`megan-entrance-lounge-bench-${side}`} position={[side * 3.02, .34, 6.12]}>
    <mesh position={[0, .12, 0]}><boxGeometry args={[.9, .2, 2.05]} /><meshPhysicalMaterial color="#151a1f" metalness={.24} roughness={.46} clearcoat={.15} /></mesh>
    <mesh position={[0, .29, 0]}><boxGeometry args={[.8, .19, 1.88]} /><meshPhysicalMaterial color="#343b42" metalness={.12} roughness={.58} clearcoat={.12} /></mesh>
    {[-.33, .33].flatMap((x) => [-.78, .78].map((z) => <mesh key={`${x}-${z}`} position={[x, -.12, z]} rotation={[0, 0, x * .25]}><capsuleGeometry args={[.045, .34, 8, 16]} /><meshPhysicalMaterial color="#a7b4bb" metalness={.94} roughness={.14} /></mesh>))}
    <mesh position={[0, .38, -.8]}><boxGeometry args={[.69, .028, .025]} /><meshStandardMaterial color="#ddebf0" emissive="#8ca9b8" emissiveIntensity={.6} /></mesh>
  </group>;
}

function StudioSculpturalLight() {
  return <group name="megan-sculptural-center-light" position={[0, 4.2, -.45]}>
    <mesh position={[0, .38, 0]}><cylinderGeometry args={[.022, .022, .62, 16]} /><meshPhysicalMaterial color="#9cabb2" metalness={.92} roughness={.14} /></mesh>
    <group position={[0, .02, 0]} rotation={[.2, .42, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.98, .05, 12, 48]} /><meshPhysicalMaterial color="#aab9c0" metalness={.92} roughness={.12} /></mesh>
      <mesh rotation={[0, Math.PI / 2, .35]}><torusGeometry args={[.68, .045, 12, 42]} /><meshPhysicalMaterial color="#222b32" metalness={.9} roughness={.14} /></mesh>
    </group>
    {[-.58, 0, .58].map((x, index) => <group key={x} position={[x, -.42 - index * .08, index === 1 ? .3 : -.18]}>
      <mesh><sphereGeometry args={[.13, 24, 18]} /><meshStandardMaterial color="#effaff" emissive="#c8e6f1" emissiveIntensity={1.25} /></mesh>
      <mesh position={[0, .32 + index * .06, 0]}><cylinderGeometry args={[.012, .012, .55 + index * .12, 12]} /><meshPhysicalMaterial color="#a7b7be" metalness={.9} roughness={.14} /></mesh>
    </group>)}
  </group>;
}

function StudioCeiling() {
  const runs = [5.9, 2.15, -1.6, -5.35];
  return <group name="megan-geometric-ceiling">
    <mesh position={[0, 4.9, -.58]}><boxGeometry args={[6.74, .14, 16.8]} /><meshPhysicalMaterial color="#20242a" metalness={.58} roughness={.25} clearcoat={.12} /></mesh>
    {runs.map((z) => <group key={z}>
      <mesh position={[0, 4.68, z]}><boxGeometry args={[6.55, .32, .22]} /><meshPhysicalMaterial color={CHARCOAL_DARK} metalness={.9} roughness={.15} /></mesh>
      <mesh position={[0, 4.5, z]}><boxGeometry args={[5.86, .045, .042]} /><meshStandardMaterial color={ICE} emissive="#a8c3d0" emissiveIntensity={1.14} /></mesh>
    </group>)}
    {[-2.95, 2.95].map((x) => <group key={x}>
      <mesh position={[x, 4.72, -.58]}><boxGeometry args={[.2, .24, 16.65]} /><meshPhysicalMaterial color={CHARCOAL_DARK} metalness={.9} roughness={.15} /></mesh>
      <mesh position={[x - (x > 0 ? .15 : -.15), 4.58, -.58]}><boxGeometry args={[.04, .03, 16.4]} /><meshStandardMaterial color={ICE} emissive="#a8c3d0" emissiveIntensity={1.35} /></mesh>
    </group>)}
  </group>;
}

function StudioStageArchitecture() {
  return <group name="megan-stage-architecture">
    <mesh position={[0, 2.5, ROOM.backWallZ + .07]}><boxGeometry args={[5.82, 4.42, .085]} /><meshPhysicalMaterial color="#1a1e23" metalness={.56} roughness={.28} clearcoat={.1} /></mesh>
    <mesh position={[0, 2.5, ROOM.backWallZ + .12]}><boxGeometry args={[5.32, 3.92, .03]} /><meshPhysicalMaterial color="#303940" metalness={.32} roughness={.48} /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 2.48, 2.5, ROOM.backWallZ + .16]}><boxGeometry args={[.12, 3.74, .07]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.13} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`stage-h-${direction}`} position={[0, 2.5 + direction * 1.8, ROOM.backWallZ + .16]}><boxGeometry args={[5.06, .12, .07]} /><meshPhysicalMaterial color={SILVER} metalness={.94} roughness={.13} /></mesh>)}
    {[-1.55, -.78, .78, 1.55].map((x) => <mesh key={x} position={[x, 3.65, ROOM.backWallZ + .19]} rotation={[0, 0, x < 0 ? -.34 : .34]}><boxGeometry args={[.07, 1.28, .045]} /><meshStandardMaterial color="#b5d0da" emissive="#7597a5" emissiveIntensity={.4} /></mesh>)}
  </group>;
}

function StudioLighting() {
  const zones = [5.1, .2, -4.45];
  return <group name="megan-studio-lighting">
    <ambientLight color="#e7f0f5" intensity={.34} />
    <hemisphereLight args={['#f4fbff', '#1c2127', .35]} />
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`${side}-${z}`} position={[side * 3.38, 3.05, z]} color="#edf6fa" intensity={1.65} distance={4.9} decay={2} />))}
    <pointLight position={[0, 4.28, -.5]} color="#f4fbff" intensity={1.85} distance={8.4} decay={2} />
  </group>;
}

export default function MeganStudioDecor() {
  return <group name="megan-modern-creative-studio">
    <StudioLighting />
    <StudioFloor />
    <StudioRug />
    <StudioCeiling />
    <StudioSculpturalLight />
    <StudioStageArchitecture />
    {[-1, 1].map((side) => <StudioFeatureWall key={side} side={side} />)}
    {[-1, 1].map((side) => <MidMuseumCabinet key={side} side={side} />)}
    {[-1, 1].map((side) => <StageMuseumCabinet key={side} side={side} />)}
    {[-1, 1].map((side) => <DesignerLoungeBench key={side} side={side} />)}
  </group>;
}
