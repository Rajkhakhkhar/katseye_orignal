import { ROOM } from './roomConfig';

const CONCRETE = '#484b4d';
const CONCRETE_DARK = '#24272a';
const WALNUT = '#4b3022';
const WALNUT_DARK = '#2b1b15';
const BLACK = '#131518';
const BRASS = '#b28a56';
const WHITE = '#eef1ef';
const SUEDE = '#242422';
const SMOKED_GLASS = '#7b8585';
const STONE = '#1d2021';

function ManonRunwayFloor() {
  return <group name="manon-polished-concrete-runway-floor">
    <mesh position={[0, .026, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.72, 18.8]} /><meshPhysicalMaterial color={STONE} metalness={.48} roughness={.25} clearcoat={.62} clearcoatRoughness={.13} /></mesh>
    {[-2.9, -1.45, 0, 1.45, 2.9].map((x, index) => <mesh key={x} position={[x, .034, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.33, 18.56]} /><meshPhysicalMaterial color={index % 2 ? '#313536' : '#1e2122'} metalness={.46} roughness={.23} clearcoat={.66} clearcoatRoughness={.11} /></mesh>)}
    {[-6.2, -2.55, 1.1, 4.75].map((z) => <mesh key={z} position={[0, .045, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.42, .022]} /><meshPhysicalMaterial color="#665347" metalness={.18} roughness={.36} clearcoat={.18} /></mesh>)}
    {[-3.57, 3.57].map((x) => <mesh key={`walnut-inlay-${x}`} position={[x, .051, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.075, 18.2]} /><meshPhysicalMaterial color={WALNUT} metalness={.16} roughness={.34} clearcoat={.25} /></mesh>)}
    {[-3.42, 3.42].map((x) => <mesh key={`bronze-inlay-${x}`} position={[x, .056, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.018, 18.3]} /><meshPhysicalMaterial color={BRASS} metalness={.87} roughness={.19} /></mesh>)}
  </group>;
}

function ManonCeilingCanopy() {
  const coffers = [-5.9, -2.95, 0, 2.95, 5.9];
  return <group name="manon-centered-walnut-boutique-ceiling">
    <mesh position={[0, 4.78, -.55]}><boxGeometry args={[2.48, .24, 16.4]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.14} roughness={.34} clearcoat={.22} /></mesh>
    <mesh position={[0, 4.61, -.55]}><boxGeometry args={[2.08, .045, 16.0]} /><meshPhysicalMaterial color="#573827" metalness={.16} roughness={.38} clearcoat={.18} /></mesh>
    {[-2.47, 2.47].map((x) => <group key={`ceiling-cove-${x}`}>
      <mesh position={[x, 4.7, -.55]}><boxGeometry args={[1.95, .17, 16.3]} /><meshPhysicalMaterial color="#171919" metalness={.55} roughness={.29} clearcoat={.18} /></mesh>
      <mesh position={[x > 0 ? 1.5 : -1.5, 4.56, -.55]}><boxGeometry args={[.028, .032, 15.95]} /><meshStandardMaterial color="#ffe5bd" emissive="#c78747" emissiveIntensity={.74} /></mesh>
    </group>)}
    {[-1.28, 1.28].map((x) => <mesh key={`bronze-ceiling-rail-${x}`} position={[x, 4.53, -.55]}><boxGeometry args={[.052, .045, 16.1]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>)}
    {coffers.map((z) => <group key={`ceiling-coffer-${z}`}>
      <mesh position={[0, 4.5, z]}><boxGeometry args={[2.25, .07, .08]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>
      <mesh position={[-2.5, 4.49, z]}><boxGeometry args={[1.88, .06, .075]} /><meshPhysicalMaterial color="#111314" metalness={.62} roughness={.24} /></mesh>
      <mesh position={[2.5, 4.49, z]}><boxGeometry args={[1.88, .06, .075]} /><meshPhysicalMaterial color="#111314" metalness={.62} roughness={.24} /></mesh>
    </group>)}
  </group>;
}

function ManonCenteredChandelier() {
  return <group name="manon-centered-bronze-globe-chandelier" position={[0, 0, -.55]}>
    <mesh position={[0, 4.55, 0]}><cylinderGeometry args={[.06, .1, .2, 20]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.16} /></mesh>
    <mesh position={[0, 4.06, 0]}><cylinderGeometry args={[.022, .022, .82, 14]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>
    <mesh position={[0, 3.65, 0]} rotation={[.12, 0, .12]} scale={[1.15, .62, 1]}><torusGeometry args={[.7, .045, 10, 56]} /><meshPhysicalMaterial color={BRASS} metalness={.91} roughness={.18} clearcoat={.22} /></mesh>
    <mesh position={[0, 3.62, 0]} rotation={[-.12, .44, -.12]} scale={[.78, .54, 1]}><torusGeometry args={[.7, .04, 10, 56]} /><meshPhysicalMaterial color="#d0a267" metalness={.9} roughness={.18} clearcoat={.2} /></mesh>
    {[[-.7, 3.42, -.1], [-.32, 3.3, .38], [0, 3.24, 0], [.34, 3.3, -.38], [.7, 3.42, .1]].map(([x, y, z], index) => <group key={`chandelier-globe-${index}`} position={[x, y, z]}>
      <mesh position={[0, .16, 0]}><cylinderGeometry args={[.012, .012, .22, 10]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>
      <mesh><sphereGeometry args={[.13, 24, 18]} /><meshPhysicalMaterial color="#fff2dc" emissive="#ffe0ad" emissiveIntensity={.12} roughness={.26} transmission={.14} thickness={.04} clearcoat={.72} /></mesh>
    </group>)}
    <pointLight position={[0, 3.42, 0]} color="#ffe7c3" intensity={3.8} distance={7.5} decay={2} />
  </group>;
}

function ManonRearFeatureWall() {
  return <group name="manon-sculptural-editorial-feature-wall" position={[0, 2.48, ROOM.backWallZ + .2]}>
    <mesh><boxGeometry args={[6.36, 4.45, .1]} /><meshPhysicalMaterial color={CONCRETE_DARK} metalness={.28} roughness={.7} /></mesh>
    <mesh position={[-1.2, 0, .065]} rotation={[0, 0, -.11]}><boxGeometry args={[2.45, 3.98, .075]} /><meshPhysicalMaterial color={SUEDE} metalness={.03} roughness={.82} clearcoat={.05} /></mesh>
    {[-2.05, -1.72, -1.39, -1.06, -.73, -.4].map((x) => <mesh key={`suede-flute-${x}`} position={[x, 0, .122]} rotation={[0, 0, -.11]}><boxGeometry args={[.055, 3.55, .022]} /><meshPhysicalMaterial color="#373632" metalness={.05} roughness={.7} /></mesh>)}
    <mesh position={[-.74, 0, .115]} rotation={[0, 0, -.11]}><boxGeometry args={[.22, 4.0, .07]} /><meshPhysicalMaterial color={WALNUT} metalness={.14} roughness={.34} clearcoat={.12} /></mesh>
    <mesh position={[1.9, .04, .08]} rotation={[0, 0, .16]}><boxGeometry args={[1.65, 4.12, .075]} /><meshPhysicalMaterial color={BLACK} metalness={.9} roughness={.15} /></mesh>
    <mesh position={[1.35, .1, .12]} rotation={[0, 0, .16]}><boxGeometry args={[.065, 3.78, .03]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.1} /></mesh>
    <mesh position={[2.4, -.42, .13]} rotation={[0, 0, .16]}><boxGeometry args={[.88, 1.35, .028]} /><meshPhysicalMaterial color="#5b4537" metalness={.18} roughness={.46} clearcoat={.16} /></mesh>
    <mesh position={[2.4, -.42, .153]} rotation={[0, 0, .16]}><boxGeometry args={[.68, 1.1, .014]} /><meshPhysicalMaterial color={SMOKED_GLASS} metalness={.35} roughness={.09} transmission={.2} thickness={.04} transparent opacity={.52} clearcoat={.7} /></mesh>
    <mesh position={[-2.18, 1.3, .13]} rotation={[0, 0, -.11]}><boxGeometry args={[.8, .025, .025]} /><meshStandardMaterial color={WHITE} emissive="#bac9c5" emissiveIntensity={.62} /></mesh>
    {[-2.92, 2.92].map((x) => <mesh key={x} position={[x, 0, .115]}><boxGeometry args={[.025, 3.88, .022]} /><meshStandardMaterial color="#f0d0a1" emissive="#b87943" emissiveIntensity={.56} /></mesh>)}
    <mesh position={[0, 1.93, .115]}><boxGeometry args={[5.64, .022, .022]} /><meshStandardMaterial color="#f1dbbb" emissive="#b98049" emissiveIntensity={.4} /></mesh>
    <pointLight position={[-1.05, .65, .5]} color="#f1f1e7" intensity={1.5} distance={5.5} decay={2} />
  </group>;
}

function ManonEditorialMount() {
  return <group name="manon-premium-editorial-display-mount" position={[-1.02, 2.5, ROOM.backWallZ + .27]}>
    <mesh><boxGeometry args={[2.74, 3.54, .065]} /><meshPhysicalMaterial color="#151719" metalness={.9} roughness={.14} clearcoat={.18} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * 1.25, 0, .052]}><boxGeometry args={[.06, 3.3, .03]} /><meshPhysicalMaterial color={BRASS} metalness={.93} roughness={.1} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`rail-${direction}`} position={[0, direction * 1.57, .052]}><boxGeometry args={[2.46, .06, .03]} /><meshPhysicalMaterial color={BRASS} metalness={.93} roughness={.1} /></mesh>)}
    <mesh position={[0, 1.42, .075]}><boxGeometry args={[2.1, .022, .018]} /><meshStandardMaterial color={WHITE} emissive="#d3d9d5" emissiveIntensity={.62} /></mesh>
  </group>;
}

function ManonFashionForm({ tone = '#242b2e' }) {
  return <group name="manon-designer-fashion-form">
    <mesh position={[0, -.12, 0]} scale={[.39, 1.16, .27]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color="#d7d4cd" metalness={.16} roughness={.51} clearcoat={.08} /></mesh>
    <mesh position={[0, -.14, .15]} scale={[.52, 1.1, .1]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color={tone} metalness={.28} roughness={.42} clearcoat={.4} clearcoatRoughness={.2} /></mesh>
    <mesh position={[0, .78, .02]} scale={[.15, .15, .15]}><sphereGeometry args={[1, 30, 22]} /><meshPhysicalMaterial color="#d7d4cd" metalness={.14} roughness={.5} /></mesh>
    <mesh position={[0, .18, .22]}><torusGeometry args={[.37, .024, 10, 38, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.1} /></mesh>
  </group>;
}

function ManonFashionPlatform() {
  return <group name="manon-floating-fashion-platform" position={[-2.72, .28, 2.48]} rotation={[0, -.14, 0]}>
    <mesh><boxGeometry args={[1.42, .26, 2.6]} /><meshPhysicalMaterial color={BLACK} metalness={.84} roughness={.18} clearcoat={.18} /></mesh>
    <mesh position={[0, .145, 0]}><boxGeometry args={[1.23, .04, 2.4]} /><meshPhysicalMaterial color="#4d3a2e" metalness={.28} roughness={.34} clearcoat={.14} /></mesh>
    <mesh position={[0, .42, .14]}><boxGeometry args={[.7, .3, .9]} /><meshPhysicalMaterial color="#191d20" metalness={.9} roughness={.14} clearcoat={.2} /></mesh>
    <mesh position={[0, .59, .14]}><boxGeometry args={[.57, .025, .74]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.12} /></mesh>
    <group position={[0, 1.18, .16]} scale={[.7, .7, .7]}><ManonFashionForm tone="#253038" /></group>
    <mesh position={[0, -.16, 0]}><boxGeometry args={[.94, .04, 1.92]} /><meshStandardMaterial color={WHITE} emissive="#b8c4c1" emissiveIntensity={.34} /></mesh>
  </group>;
}

function ManonAccessoryIsland() {
  return <group name="manon-smoked-glass-accessory-island" position={[3.05, 1.55, -3.6]} rotation={[0, -.22, 0]}>
    <mesh><boxGeometry args={[1.22, 2.84, .74]} /><meshPhysicalMaterial color="#171b1e" metalness={.9} roughness={.16} clearcoat={.32} clearcoatRoughness={.12} /></mesh>
    <mesh position={[0, 0, .405]}><boxGeometry args={[.96, 2.58, .042]} /><meshPhysicalMaterial color={SMOKED_GLASS} metalness={.28} roughness={.06} transmission={.5} thickness={.065} ior={1.45} attenuationColor="#8e9d9c" attenuationDistance={1.7} transparent opacity={.23} clearcoat={.66} clearcoatRoughness={.08} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * .5, 0, .42]}><boxGeometry args={[.06, 2.68, .09]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.1} /></mesh>)}
    {[-.78, .08, .9].map((y) => <group key={y}>
      <mesh position={[0, y, .28]}><boxGeometry args={[.92, .05, .46]} /><meshPhysicalMaterial color="#4c3021" metalness={.16} roughness={.28} clearcoat={.22} /></mesh>
      {[-.25, -.08, .1, .27].map((x) => <mesh key={x} position={[x, y + .03, .515]}><boxGeometry args={[.06, .008, .012]} /><meshPhysicalMaterial color="#241713" metalness={.08} roughness={.42} /></mesh>)}
      <mesh position={[0, y + .055, .5]}><boxGeometry args={[.78, .014, .02]} /><meshStandardMaterial color="#f4d4a0" emissive="#bd8045" emissiveIntensity={.78} /></mesh>
    </group>)}
    <group position={[0, -.8, .08]}>
      {[-.22, .22].map((x) => <group key={x} position={[x, .07, 0]}>
        <mesh scale={[.2, .07, .34]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color="#3b221a" metalness={.48} roughness={.26} clearcoat={.26} /></mesh>
        <mesh position={[0, .15, .02]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.16, .025, 10, 24, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.12} /></mesh>
      </group>)}
    </group>
    <group position={[0, .11, .08]}>
      <mesh scale={[.36, .13, .22]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color="#1d252b" metalness={.56} roughness={.22} clearcoat={.2} /></mesh>
      <mesh position={[0, .16, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.25, .035, 10, 30, Math.PI]} /><meshPhysicalMaterial color="#d9dedc" metalness={.92} roughness={.1} /></mesh>
    </group>
    <group position={[0, .95, .08]}>
      <mesh position={[0, -.1, 0]}><cylinderGeometry args={[.13, .2, .12, 36]} /><meshPhysicalMaterial color={BLACK} metalness={.94} roughness={.1} /></mesh>
      <mesh position={[0, .2, 0]}><sphereGeometry args={[.2, 28, 20]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.1} /></mesh>
    </group>
    <ManonShelfCuration />
  </group>;
}

function ManonShelfCuration() {
  return <group name="manon-curated-accessory-shelves" position={[0, 0, .34]}>
    {[-.76, .08, .91].map((y, shelf) => <group key={y} position={[0, y, 0]}>
      <mesh position={[-.26, .12, .05]} scale={[.26, .1, .16]}><sphereGeometry args={[1, 30, 20]} /><meshPhysicalMaterial color={shelf === 1 ? '#29363c' : '#5c3829'} metalness={.5} roughness={.24} clearcoat={.25} /></mesh>
      <mesh position={[-.26, .23, .055]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.15, .025, 10, 26, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.11} /></mesh>
      <group position={[.26, .11, .04]} rotation={[0, 0, shelf * .08]}>
        {[-.12, 0, .12].map((x, index) => <mesh key={x} position={[x, index * .014, 0]}><boxGeometry args={[.07, .27 + index * .035, .14]} /><meshPhysicalMaterial color={index === 1 ? '#c5c7c2' : '#252b2d'} metalness={.32} roughness={.42} /></mesh>)}
      </group>
      <mesh position={[.01, .28, .05]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.09, .025, 10, 24]} /><meshPhysicalMaterial color="#c7d0cc" metalness={.9} roughness={.11} /></mesh>
    </group>)}
  </group>;
}

function ManonMirrorMonolith() {
  return <group name="manon-angled-full-height-mirror" position={[-3.84, 2.48, -3.45]} rotation={[0, Math.PI / 2 - .16, 0]}>
    <mesh><boxGeometry args={[2.22, 4.28, .1]} /><meshPhysicalMaterial color={BLACK} metalness={.86} roughness={.18} clearcoat={.32} /></mesh>
    <mesh position={[0, 0, .064]}><boxGeometry args={[1.9, 3.92, .035]} /><meshPhysicalMaterial color="#a4acae" metalness={.78} roughness={.035} transmission={.12} thickness={.03} transparent opacity={.72} clearcoat={.76} clearcoatRoughness={.08} /></mesh>
    <mesh position={[-.86, 0, .09]}><boxGeometry args={[.034, 3.96, .026]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.1} /></mesh>
  </group>;
}

function ManonLoungeBench() {
  return <group name="manon-low-sculptural-lounge-bench" position={[2.98, .34, 5.55]} rotation={[0, -.08, 0]}>
    <mesh position={[0, .1, 0]}><boxGeometry args={[.9, .22, 2.18]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.14} roughness={.35} clearcoat={.2} /></mesh>
    <mesh position={[0, .3, 0]} scale={[.5, .14, 1.08]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color="#51585a" metalness={.13} roughness={.58} /></mesh>
    {[-.32, .32].flatMap((x) => [-.82, .82].map((z) => <mesh key={`${x}-${z}`} position={[x, -.14, z]} rotation={[0, 0, x * .24]}><capsuleGeometry args={[.045, .35, 8, 16]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.12} /></mesh>))}
  </group>;
}

function ManonLoungeChair() {
  return <group name="manon-entrance-lounge-chair-and-table" position={[-2.88, .42, 5.72]} rotation={[0, .18, 0]}>
    <mesh position={[0, .1, 0]}><boxGeometry args={[.92, .22, .92]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.14} roughness={.34} clearcoat={.18} /></mesh>
    <mesh position={[0, .32, 0]} scale={[.47, .16, .47]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color="#434b4d" metalness={.12} roughness={.58} /></mesh>
    <mesh position={[0, .72, -.32]} scale={[.48, .54, .14]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color="#40484a" metalness={.1} roughness={.56} /></mesh>
    {[-.32, .32].flatMap((x) => [-.32, .32].map((z) => <mesh key={`${x}-${z}`} position={[x, -.14, z]} rotation={[0, 0, x * .22]}><capsuleGeometry args={[.04, .32, 8, 16]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.12} /></mesh>))}
    <group position={[.78, .08, -.08]}>
      <mesh><cylinderGeometry args={[.34, .38, .07, 48]} /><meshPhysicalMaterial color="#202528" metalness={.84} roughness={.16} clearcoat={.16} /></mesh>
      <mesh position={[0, -.28, 0]}><cylinderGeometry args={[.045, .055, .5, 24]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.12} /></mesh>
      <mesh position={[0, -.55, 0]}><cylinderGeometry args={[.24, .28, .06, 40]} /><meshPhysicalMaterial color={BLACK} metalness={.88} roughness={.15} /></mesh>
    </group>
  </group>;
}

function ManonHandbag({ color = '#25292b' }) {
  return <group name="manon-curated-designer-handbag">
    <mesh position={[0, .15, 0]} scale={[.24, .14, .36]}><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color={color} metalness={.28} roughness={.34} clearcoat={.38} /></mesh>
    <mesh position={[0, .31, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[.82, .55, 1]}><torusGeometry args={[.16, .022, 8, 24, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>
    <mesh position={[.21, .15, .05]}><boxGeometry args={[.025, .09, .05]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.16} /></mesh>
  </group>;
}

function ManonShoe({ color = '#161719' }) {
  return <group name="manon-curated-designer-shoe" rotation={[0, -.16, 0]}>
    <mesh position={[0, .08, 0]} scale={[.38, .075, .13]}><sphereGeometry args={[1, 26, 16]} /><meshPhysicalMaterial color={color} metalness={.45} roughness={.22} clearcoat={.34} /></mesh>
    <mesh position={[-.19, .16, .02]} rotation={[0, 0, .48]}><capsuleGeometry args={[.025, .28, 6, 12]} /><meshPhysicalMaterial color={BRASS} metalness={.88} roughness={.18} /></mesh>
  </group>;
}

function ManonFashionBookStack() {
  return <group name="manon-curated-fashion-books">
    {[-.1, 0, .1].map((x, index) => <mesh key={x} position={[x, .12 + index * .025, 0]} rotation={[0, 0, index === 2 ? -.05 : 0]}><boxGeometry args={[.07, .24 + index * .025, .27]} /><meshPhysicalMaterial color={index === 1 ? '#c1a071' : '#25282a'} metalness={.28} roughness={.4} clearcoat={.14} /></mesh>)}
  </group>;
}

function ManonPerfumeDisplay() {
  return <group name="manon-curated-perfume-display">
    <mesh position={[0, .12, 0]}><cylinderGeometry args={[.09, .11, .24, 24]} /><meshPhysicalMaterial color="#a97344" metalness={.28} roughness={.16} transmission={.08} transparent opacity={.84} clearcoat={.54} /></mesh>
    <mesh position={[0, .29, 0]}><boxGeometry args={[.11, .06, .11]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.15} /></mesh>
  </group>;
}

function ManonBuiltInFashionBay({ side, z, collections }) {
  const inward = side < 0 ? .22 : -.22;
  const shelfYs = [-1.08, .02, 1.08];
  return <group name={`manon-built-in-fashion-bay-${side}-${z}`} position={[side * 3.56, 2.48, z]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.38, 4.35, 1.92]} /><meshPhysicalMaterial color="#171819" metalness={.72} roughness={.24} clearcoat={.2} /></mesh>
    <mesh position={[inward * .48, 0, 0]}><boxGeometry args={[.04, 3.92, 1.56]} /><meshPhysicalMaterial color="#302721" metalness={.18} roughness={.52} clearcoat={.1} /></mesh>
    {[-.68, -.42, -.16, .16, .42, .68].map((offset) => <mesh key={`flute-${offset}`} position={[inward * .7, 0, offset]}><boxGeometry args={[.024, 3.72, .032]} /><meshPhysicalMaterial color={WALNUT} metalness={.16} roughness={.4} clearcoat={.18} /></mesh>)}
    {shelfYs.map((y, index) => <group key={`shelf-${y}`} position={[inward * .83, y, 0]}>
      <mesh><boxGeometry args={[.06, .052, 1.52]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>
      <mesh position={[inward < 0 ? -.035 : .035, .09, 0]}><boxGeometry args={[.018, .018, 1.38]} /><meshStandardMaterial color="#ffe4b8" emissive="#bd7d42" emissiveIntensity={.78} /></mesh>
      <group position={[inward < 0 ? -.085 : .085, .08, 0]}>{collections[index]}</group>
    </group>)}
    <mesh position={[inward, 0, 0]}><boxGeometry args={[.03, 4.02, 1.68]} /><meshPhysicalMaterial color={SMOKED_GLASS} metalness={.24} roughness={.06} transmission={.42} thickness={.055} ior={1.45} transparent opacity={.15} clearcoat={.66} clearcoatRoughness={.08} /></mesh>
    {[-.83, .83].map((offset) => <mesh key={`bay-brass-edge-${offset}`} position={[inward * 1.04, 0, offset]}><boxGeometry args={[.035, 4.04, .05]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.17} /></mesh>)}
    <pointLight position={[inward * .62, .35, 0]} color="#ffe1b1" intensity={.76} distance={2.9} decay={2} />
  </group>;
}

function ManonShowroomLighting() {
  return <group name="manon-targeted-showroom-lighting">
    <ambientLight color="#e7ecea" intensity={.4} />
    <hemisphereLight args={['#f2f5f2', '#202225', .42]} />
    <pointLight position={[-2.5, 3.9, 2.4]} color="#f4eee0" intensity={1.9} distance={5.3} decay={2} />
    <pointLight position={[2.85, 3.4, -3.3]} color="#f3e6d5" intensity={1.7} distance={4.9} decay={2} />
    <pointLight position={[-2.85, 3.75, -3.7]} color="#e6eff0" intensity={1.42} distance={4.6} decay={2} />
    <pointLight position={[0, 3.62, ROOM.backWallZ + .92]} color="#f1e5d3" intensity={2.05} distance={6.6} decay={2} />
    {[-1, 1].map((side) => <pointLight key={`wall-uplight-${side}`} position={[side * 3.48, .26, .22]} color="#d7a56b" intensity={.54} distance={3.75} decay={2} />)}
    {[-1, 1].map((side) => <pointLight key={`rear-uplight-${side}`} position={[side * 3.45, .25, -5.2]} color="#d3a06b" intensity={.34} distance={3.45} decay={2} />)}
    <pointLight position={[-2.72, 3.7, 2.45]} color="#f4e5d0" intensity={.74} distance={3.8} decay={2} />
    <pointLight position={[3.0, 3.45, -3.5]} color="#f2d9bd" intensity={.82} distance={3.6} decay={2} />
  </group>;
}

function ManonStagePresentationTrim() {
  const stageZ = ROOM.backWallZ + .95;
  return <group name="manon-bronze-edged-fashion-presentation-stage" position={[0, 0, stageZ]}>
    <mesh position={[0, .325, 0]}><cylinderGeometry args={[1.71, 1.81, .035, 64]} /><meshPhysicalMaterial color="#1a1c1d" metalness={.7} roughness={.2} clearcoat={.55} clearcoatRoughness={.12} /></mesh>
    <mesh position={[0, .351, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.58, .032, 10, 64]} /><meshPhysicalMaterial color={BRASS} metalness={.91} roughness={.17} clearcoat={.18} /></mesh>
    <mesh position={[0, .358, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.46, 64]} /><meshPhysicalMaterial color="#292624" metalness={.24} roughness={.5} clearcoat={.24} /></mesh>
    <pointLight position={[0, .64, .12]} color="#f0d4aa" intensity={.56} distance={3.5} decay={2} />
  </group>;
}

export default function ManonShowroomDecor() {
  return <group name="manon-centered-paris-fashion-showroom">
    <ManonShowroomLighting />
    <ManonRunwayFloor />
    <ManonCeilingCanopy />
    <ManonCenteredChandelier />
    <ManonRearFeatureWall />
    <ManonEditorialMount />
    {[-1, 1].flatMap((side) => [
      <ManonBuiltInFashionBay key={`fashion-bay-${side}-front`} side={side} z={6.08} collections={[
        <ManonHandbag key="front-bag" color={side < 0 ? '#382721' : '#292b2c'} />,
        <ManonShoe key="front-shoe" color="#1a1a1b" />,
        <ManonPerfumeDisplay key="front-perfume" />,
      ]} />,
      <ManonBuiltInFashionBay key={`fashion-bay-${side}-rear`} side={side} z={-6.06} collections={[
        <ManonFashionBookStack key="rear-books" />,
        <ManonHandbag key="rear-bag" color={side < 0 ? '#51413a' : '#211e1e'} />,
        <ManonShoe key="rear-shoe" color="#403025" />,
      ]} />,
    ])}
    <ManonFashionPlatform />
    <ManonAccessoryIsland />
    <ManonMirrorMonolith />
    <ManonLoungeBench />
    <ManonLoungeChair />
    <ManonStagePresentationTrim />
  </group>;
}
