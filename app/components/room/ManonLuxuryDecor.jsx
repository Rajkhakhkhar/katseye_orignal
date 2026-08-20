import { ROOM } from './roomConfig';

const CONCRETE = '#383b3e';
const CONCRETE_DARK = '#202326';
const WALNUT = '#4b3022';
const WALNUT_DARK = '#2b1b15';
const BLACK = '#121417';
const BRASS = '#b38a56';
const SOFT_WHITE = '#ecf0ee';

function ManonWallModule({ side, z, span = 3.9 }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const edge = span / 2 - .14;
  return <group position={[side * 3.965, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[span, 4.64, .1]} /><meshPhysicalMaterial color={CONCRETE_DARK} metalness={.26} roughness={.72} /></mesh>
    <mesh position={[0, 0, .06]}><boxGeometry args={[span - .24, 4.38, .035]} /><meshPhysicalMaterial color={CONCRETE} metalness={.12} roughness={.78} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`rail-${direction}`} position={[direction * edge, 0, .105]}><boxGeometry args={[.1, 4.38, .075]} /><meshPhysicalMaterial color={BLACK} metalness={.92} roughness={.18} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`top-${direction}`} position={[0, direction * 2.08, .105]}><boxGeometry args={[span - .18, .1, .075]} /><meshPhysicalMaterial color={BLACK} metalness={.92} roughness={.18} /></mesh>)}
    {[-1.2, -.72, -.24, .24, .72, 1.2].map((x, index) => <group key={x}>
      <mesh position={[x, 0, .12]}><boxGeometry args={[.22, 3.88, .09]} /><meshPhysicalMaterial color={index % 2 ? WALNUT : WALNUT_DARK} metalness={.12} roughness={.38} clearcoat={.16} /></mesh>
      <mesh position={[x + .135, 0, .14]}><boxGeometry args={[.018, 3.78, .022]} /><meshStandardMaterial color="#d9b981" emissive="#9a7347" emissiveIntensity={.16} /></mesh>
    </group>)}
    <mesh position={[0, 0, .155]}><boxGeometry args={[span - .86, 3.62, .018]} /><meshPhysicalMaterial color="#202325" metalness={.1} roughness={.72} transparent opacity={.16} /></mesh>
  </group>;
}

function ManonFashionMannequin({ side }) {
  return <group name={`manon-fashion-mannequin-${side}`} position={[0, -.25, .25]}>
    <mesh position={[0, -1.55, 0]}><cylinderGeometry args={[.46, .56, .12, 48]} /><meshPhysicalMaterial color={BLACK} metalness={.84} roughness={.17} /></mesh>
    <mesh position={[0, -.72, 0]}><cylinderGeometry args={[.05, .075, 1.55, 24]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.12} /></mesh>
    <mesh position={[0, .08, 0]} scale={[.35, 1.1, .25]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color="#d5d3cd" metalness={.3} roughness={.38} /></mesh>
    <mesh position={[0, .06, .15]} scale={[.48, 1.06, .1]}><sphereGeometry args={[1, 36, 28]} /><meshPhysicalMaterial color={side < 0 ? '#252d31' : '#352219'} metalness={.5} roughness={.28} clearcoat={.22} /></mesh>
    <mesh position={[0, .97, 0]} scale={[.14, .14, .14]}><sphereGeometry args={[1, 28, 22]} /><meshPhysicalMaterial color="#d4d2cc" metalness={.24} roughness={.42} /></mesh>
    <mesh position={[0, .34, .19]}><torusGeometry args={[.36, .025, 10, 36, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.1} /></mesh>
  </group>;
}

function ManonAccessoryCabinet({ side }) {
  const accessory = side < 0 ? '#5f3829' : '#2a343b';
  return <group name={`manon-illuminated-accessory-cabinet-${side}`} position={[0, -.12, .24]}>
    {[-1.02, -.08, .84].map((y) => <group key={y}>
      <mesh position={[0, y, 0]}><boxGeometry args={[1.58, .055, .34]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.25} roughness={.34} /></mesh>
      <mesh position={[0, y + .055, .19]}><boxGeometry args={[1.36, .014, .018]} /><meshStandardMaterial color="#f2cf9c" emissive="#bf8348" emissiveIntensity={.82} /></mesh>
    </group>)}
    {[-.4, .4].map((x) => <group key={x} position={[x, -1.0, .1]}>
      <mesh scale={[.3, .12, .23]}><sphereGeometry args={[1, 32, 22]} /><meshPhysicalMaterial color={accessory} metalness={.52} roughness={.24} clearcoat={.26} /></mesh>
      <mesh position={[0, .15, .02]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.23, .035, 10, 30, Math.PI]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.12} /></mesh>
    </group>)}
    <group position={[0, -.12, .1]}>
      <mesh position={[0, -.12, 0]}><cylinderGeometry args={[.13, .21, .12, 36]} /><meshPhysicalMaterial color={BLACK} metalness={.92} roughness={.12} /></mesh>
      <mesh position={[0, .2, 0]}><sphereGeometry args={[.2, 28, 20]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.1} /></mesh>
    </group>
    <group position={[0, .82, .08]}>
      <mesh><torusGeometry args={[.32, .045, 12, 36, Math.PI]} /><meshPhysicalMaterial color="#dce1df" metalness={.94} roughness={.1} /></mesh>
      {[-.28, .28].map((x) => <mesh key={x} position={[x, -.1, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.11, .11, .07, 28]} /><meshPhysicalMaterial color="#171a1c" metalness={.82} roughness={.15} /></mesh>)}
    </group>
  </group>;
}

function ManonNiche({ side, z }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const content = z < 0 ? <ManonFashionMannequin side={side} /> : <ManonAccessoryCabinet side={side} />;
  return <group name={`manon-showroom-niche-${side}-${z}`} position={[side * 3.97, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[2.5, 4.34, .14]} /><meshPhysicalMaterial color={BLACK} metalness={.88} roughness={.16} clearcoat={.12} /></mesh>
    <mesh position={[0, 0, .085]}><boxGeometry args={[2.12, 3.94, .04]} /><meshPhysicalMaterial color="#292d2f" metalness={.32} roughness={.52} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`v-${direction}`} position={[direction * 1.1, 0, .15]}><boxGeometry args={[.095, 4.08, .08]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.13} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`h-${direction}`} position={[0, direction * 2.0, .15]}><boxGeometry args={[2.28, .095, .08]} /><meshPhysicalMaterial color={BRASS} metalness={.9} roughness={.13} /></mesh>)}
    <mesh position={[0, 0, .17]}><boxGeometry args={[1.88, 3.56, .025]} /><meshPhysicalMaterial color="#87969a" metalness={.18} roughness={.08} transmission={.32} transparent opacity={.22} /></mesh>
    {[-.82, .82].map((x) => <mesh key={x} position={[x, 0, .19]}><boxGeometry args={[.03, 3.3, .035]} /><meshStandardMaterial color={SOFT_WHITE} emissive="#bfc9c9" emissiveIntensity={.78} /></mesh>)}
    {content}
  </group>;
}

function ManonMirror({ side }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`manon-full-height-mirror-${side}`} position={[side * 3.88, 2.48, .6]} rotation={rotation}>
    <mesh><boxGeometry args={[1.72, 4.12, .09]} /><meshPhysicalMaterial color="#16191b" metalness={.94} roughness={.12} /></mesh>
    <mesh position={[0, 0, .063]}><boxGeometry args={[1.42, 3.78, .028]} /><meshPhysicalMaterial color="#9ca6a7" metalness={.82} roughness={.06} clearcoat={.45} transparent opacity={.72} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * .67, 0, .093]}><boxGeometry args={[.034, 3.86, .028]} /><meshStandardMaterial color={SOFT_WHITE} emissive="#b5c2c2" emissiveIntensity={.72} /></mesh>)}
  </group>;
}

function ManonFloorAndRug() {
  const seams = [-7.05, -4.6, -2.15, .3, 2.75, 5.2];
  return <group name="manon-polished-concrete-floor-and-rug">
    <mesh position={[0, .026, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.72, 18.8]} /><meshPhysicalMaterial color="#202326" metalness={.3} roughness={.38} clearcoat={.35} clearcoatRoughness={.18} /></mesh>
    {seams.map((z) => <mesh key={z} position={[0, .04, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.5, .02]} /><meshBasicMaterial color="#687074" transparent opacity={.38} /></mesh>)}
    <group position={[0, .07, -.55]}>
      <mesh position={[0, .04, 0]}><boxGeometry args={[5.98, .13, 12.8]} /><meshPhysicalMaterial color="#646a6c" metalness={.04} roughness={.96} clearcoat={.03} /></mesh>
      <mesh position={[0, .112, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.68, 12.5]} /><meshPhysicalMaterial color="#858b8c" metalness={.03} roughness={.94} /></mesh>
      {[-2.65, 2.65].map((x) => [-5.7, -3.8, -1.9, 0, 1.9, 3.8, 5.7].map((z) => <mesh key={`${x}-${z}`} position={[x, .14, z]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.018, .12, 6, 10]} /><meshPhysicalMaterial color="#a7acad" metalness={.02} roughness={.96} /></mesh>))}
      {[-1.42, 0, 1.42].map((x) => <mesh key={x} position={[x, .126, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.018, 11.7]} /><meshBasicMaterial color="#b8b1a6" transparent opacity={.26} /></mesh>)}
    </group>
  </group>;
}

function ManonCeilingFeature() {
  const runs = [5.9, 2.15, -1.6, -5.35];
  return <group name="manon-hidden-led-ceiling-feature">
    <mesh position={[0, 4.9, -.58]}><boxGeometry args={[6.74, .14, 16.8]} /><meshPhysicalMaterial color="#1c1f21" metalness={.72} roughness={.24} /></mesh>
    {runs.map((z) => <group key={z}>
      <mesh position={[0, 4.68, z]}><boxGeometry args={[6.54, .32, .22]} /><meshPhysicalMaterial color={BLACK} metalness={.92} roughness={.14} /></mesh>
      <mesh position={[0, 4.5, z]}><boxGeometry args={[5.9, .04, .038]} /><meshStandardMaterial color={SOFT_WHITE} emissive="#b9c4c4" emissiveIntensity={.92} /></mesh>
    </group>)}
    {[-2.95, 2.95].map((x) => <mesh key={x} position={[x, 4.72, -.58]}><boxGeometry args={[.18, .24, 16.6]} /><meshPhysicalMaterial color={BLACK} metalness={.92} roughness={.14} /></mesh>)}
  </group>;
}

function ManonSculpturalLight() {
  return <group name="manon-contemporary-ceiling-sculpture" position={[0, 4.18, -.48]}>
    <mesh position={[0, .42, 0]}><cylinderGeometry args={[.022, .022, .72, 16]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.12} /></mesh>
    <group position={[0, .02, 0]} rotation={[.18, .38, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.98, .05, 12, 52]} /><meshPhysicalMaterial color={BLACK} metalness={.94} roughness={.12} /></mesh>
      <mesh rotation={[.32, Math.PI / 2, -.22]}><torusGeometry args={[.64, .043, 12, 48]} /><meshPhysicalMaterial color={BRASS} metalness={.92} roughness={.12} /></mesh>
    </group>
    {[-.56, 0, .56].map((x, index) => <group key={x} position={[x, -.38 - index * .08, index === 1 ? .25 : -.16]}>
      <mesh><sphereGeometry args={[.12, 24, 18]} /><meshStandardMaterial color="#f2f6f4" emissive="#cbd8d6" emissiveIntensity={1.15} /></mesh>
      <mesh position={[0, .34 + index * .06, 0]}><cylinderGeometry args={[.012, .012, .56 + index * .12, 12]} /><meshPhysicalMaterial color="#a4a09a" metalness={.9} roughness={.14} /></mesh>
    </group>)}
  </group>;
}

function ManonSculpturalBench() {
  return <group name="manon-sculptural-designer-bench" position={[2.98, .34, 6.12]}>
    <mesh position={[0, .12, 0]}><boxGeometry args={[.86, .2, 2.04]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.16} roughness={.34} clearcoat={.18} /></mesh>
    <mesh position={[0, .29, 0]}><boxGeometry args={[.76, .19, 1.86]} /><meshPhysicalMaterial color="#303437" metalness={.18} roughness={.56} clearcoat={.1} /></mesh>
    {[-.31, .31].flatMap((x) => [-.76, .76].map((z) => <mesh key={`${x}-${z}`} position={[x, -.12, z]} rotation={[0, 0, x * .24]}><capsuleGeometry args={[.045, .34, 8, 16]} /><meshPhysicalMaterial color={BRASS} metalness={.94} roughness={.13} /></mesh>))}
  </group>;
}

function ManonLighting() {
  return <group name="manon-soft-showroom-lighting">
    <ambientLight color="#e6ece9" intensity={.32} />
    <hemisphereLight args={['#f3f6f4', '#1a1c1e', .34]} />
    {[-1, 1].flatMap((side) => [5.2, .2, -4.55].map((z) => <pointLight key={`${side}-${z}`} position={[side * 3.36, 3.04, z]} color="#edf2ef" intensity={1.4} distance={4.8} decay={2} />))}
    <pointLight position={[0, 4.26, -.5]} color="#f7f6ec" intensity={1.55} distance={8.2} decay={2} />
  </group>;
}

export default function ManonLuxuryDecor() {
  const panelRuns = [4.9, .75, -3.35];
  return <group name="manon-luxury-designer-loft">
    <ManonLighting />
    <ManonFloorAndRug />
    <ManonCeilingFeature />
    <ManonSculpturalLight />
    {[-1, 1].flatMap((side) => panelRuns.map((z) => <ManonWallModule key={`${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].flatMap((side) => [6.18, -6.25].map((z) => <ManonNiche key={`${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].map((side) => <ManonMirror key={side} side={side} />)}
    <ManonSculpturalBench />
  </group>;
}
