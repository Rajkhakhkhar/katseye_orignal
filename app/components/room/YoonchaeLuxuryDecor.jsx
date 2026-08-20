import { ROOM } from './roomConfig';

const IVORY = '#f6ead8';
const PEARL = '#fff8ed';
const PEACH = '#e9bca7';
const OAK = '#b88b63';
const CHAMPAGNE = '#d6ae70';
const BLUSH = '#d99c93';
const WARM = '#ffe4be';

function YoonchaeFloor() {
  const seams = [-6.35, -3.18, 0, 3.18, 6.35];
  return <group name="yoonchae-warm-ivory-stone-and-cloud-rug">
    <mesh position={[0, .028, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.72, 18.8]} /><meshPhysicalMaterial color="#e8d5bd" metalness={.14} roughness={.31} clearcoat={.42} clearcoatRoughness={.16} /></mesh>
    {seams.map((z) => <mesh key={`stone-seam-${z}`} position={[0, .037, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.55, .022]} /><meshPhysicalMaterial color="#c6a27b" metalness={.56} roughness={.26} /></mesh>)}
    {[-2.48, 2.48].map((x) => <mesh key={`floor-border-${x}`} position={[x, .04, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.028, 18.2]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.8} roughness={.21} /></mesh>)}
    <group position={[0, .09, -.55]} name="yoonchae-plush-cloud-rug">
      <mesh><boxGeometry args={[5.75, .12, 11.9]} /><meshPhysicalMaterial color="#f7eadd" metalness={.01} roughness={.94} clearcoat={.03} /></mesh>
      <mesh position={[0, .071, 0]}><boxGeometry args={[5.51, .018, 11.66]} /><meshPhysicalMaterial color="#fff5e8" metalness={.01} roughness={.96} /></mesh>
      {[-2.64, 2.64].map((x) => <mesh key={`rug-trim-${x}`} position={[x, .085, 0]}><boxGeometry args={[.032, .016, 11.54]} /><meshPhysicalMaterial color="#e6c28d" metalness={.48} roughness={.34} /></mesh>)}
    </group>
  </group>;
}

function YoonchaeCeiling() {
  const coffers = [-5.8, -2.9, 0, 2.9, 5.8];
  return <group name="yoonchae-symmetrical-korean-luxury-ceiling">
    <mesh position={[0, 4.88, -.55]}><boxGeometry args={[6.54, .13, 16.45]} /><meshPhysicalMaterial color={PEARL} metalness={.04} roughness={.62} /></mesh>
    <mesh position={[0, 4.74, -.55]}><boxGeometry args={[2.4, .18, 16.05]} /><meshPhysicalMaterial color="#cda57b" metalness={.18} roughness={.37} clearcoat={.18} /></mesh>
    <mesh position={[0, 4.61, -.55]}><boxGeometry args={[1.98, .03, 15.68]} /><meshPhysicalMaterial color="#d6b087" metalness={.15} roughness={.42} clearcoat={.14} /></mesh>
    {[-1.31, 1.31].map((x) => <group key={`ceiling-cove-${x}`}>
      <mesh position={[x, 4.61, -.55]}><boxGeometry args={[.035, .035, 15.88]} /><meshStandardMaterial color="#fff0d0" emissive="#dca565" emissiveIntensity={.72} /></mesh>
      <mesh position={[x > 0 ? 2.98 : -2.98, 4.75, -.55]}><boxGeometry args={[.06, .07, 16.02]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.82} roughness={.2} /></mesh>
    </group>)}
    {coffers.map((z) => <mesh key={`coffer-${z}`} position={[0, 4.57, z]}><boxGeometry args={[1.98, .05, .06]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.82} roughness={.2} /></mesh>)}
  </group>;
}

function YoonchaeCloudChandelier() {
  const globes = [[-.52, 3.46, -.12, .17], [-.23, 3.3, .24, .2], [.12, 3.22, -.1, .23], [.45, 3.39, .18, .16], [0, 3.55, .04, .15], [-.68, 3.63, .15, .12], [.66, 3.6, -.18, .12]];
  return <group name="yoonchae-frosted-cloud-chandelier" position={[0, 0, -.55]}>
    <mesh position={[0, 4.54, 0]}><cylinderGeometry args={[.08, .12, .14, 24]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>
    <mesh position={[0, 4.06, 0]}><cylinderGeometry args={[.02, .02, .82, 14]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>
    <mesh position={[0, 3.68, 0]} scale={[1.04, .62, .84]}><sphereGeometry args={[.54, 32, 20]} /><meshPhysicalMaterial color="#f8e0d2" metalness={.08} roughness={.42} transmission={.1} clearcoat={.26} /></mesh>
    {globes.map(([x, y, z, size], index) => <group key={`cloud-globe-${index}`} position={[x, y, z]}>
      <mesh position={[0, size + .12, 0]}><cylinderGeometry args={[.01, .01, .18, 10]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>
      <mesh><sphereGeometry args={[size, 28, 20]} /><meshPhysicalMaterial color="#fff9ef" emissive="#ffe4ba" emissiveIntensity={.11} roughness={.28} transmission={.16} thickness={.04} clearcoat={.68} clearcoatRoughness={.12} /></mesh>
    </group>)}
    <pointLight position={[0, 3.42, 0]} color="#ffe7c1" intensity={3.35} distance={7.2} decay={2} />
  </group>;
}

function YoonchaeWallPanel({ side, z }) {
  const inward = side < 0 ? .16 : -.16;
  return <group name={`yoonchae-curved-upholstered-wall-${side}-${z}`} position={[side * 3.79, 2.5, z]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.18, 4.15, 3.2]} /><meshPhysicalMaterial color={IVORY} metalness={.04} roughness={.66} clearcoat={.06} /></mesh>
    <mesh position={[inward, 0, 0]}><boxGeometry args={[.035, 3.7, 2.74]} /><meshPhysicalMaterial color="#ecd6c4" metalness={.02} roughness={.78} clearcoat={.04} /></mesh>
    {[-1.02, -.68, -.34, 0, .34, .68, 1.02].map((offset) => <mesh key={`groove-${offset}`} position={[inward * 1.22, 0, offset]}><boxGeometry args={[.018, 3.34, .025]} /><meshPhysicalMaterial color="#d3a481" metalness={.25} roughness={.44} /></mesh>)}
    {[-1.38, 1.38].map((offset) => <mesh key={`oak-edge-${offset}`} position={[inward * 1.36, 0, offset]}><boxGeometry args={[.032, 3.88, .05]} /><meshPhysicalMaterial color={OAK} metalness={.14} roughness={.4} clearcoat={.18} /></mesh>)}
    <mesh position={[inward * 1.4, .02, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.02, .035, 10, 40, Math.PI]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.82} roughness={.2} /></mesh>
  </group>;
}

function YoonchaeSoftNiche({ side, z, type }) {
  const inward = side < 0 ? .23 : -.23;
  return <group name={`yoonchae-soft-display-${type}-${side}`} position={[side * 3.63, 2.35, z]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.42, 3.72, 1.78]} /><meshPhysicalMaterial color="#f3dfc9" metalness={.06} roughness={.53} clearcoat={.08} /></mesh>
    <mesh position={[inward * .62, 0, 0]}><boxGeometry args={[.04, 3.32, 1.44]} /><meshPhysicalMaterial color="#d9ad88" metalness={.12} roughness={.46} clearcoat={.16} /></mesh>
    {[-.72, .3, 1.2].map((y) => <group key={y} position={[inward * .82, y, 0]}>
      <mesh><boxGeometry args={[.055, .045, 1.32]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.84} roughness={.2} /></mesh>
      <mesh position={[inward < 0 ? -.035 : .035, .07, 0]}><boxGeometry args={[.016, .014, 1.18]} /><meshStandardMaterial color="#fff0ce" emissive="#dca565" emissiveIntensity={.64} /></mesh>
    </group>)}
    {type === 'vase' ? <group position={[inward, .33, 0]}>
      <mesh><sphereGeometry args={[.17, 24, 16]} /><meshPhysicalMaterial color="#f7ebe1" metalness={.1} roughness={.22} clearcoat={.46} /></mesh>
      {[-.1, 0, .1].map((offset) => <mesh key={offset} position={[offset, .22, 0]} rotation={[0, 0, offset * 2.5]} scale={[.035, .22, .09]}><sphereGeometry args={[1, 14, 10]} /><meshPhysicalMaterial color="#7aab78" roughness={.7} /></mesh>)}
      <mesh position={[0, 1.18, 0]}><boxGeometry args={[.24, .038, .34]} /><meshPhysicalMaterial color="#d9af89" metalness={.18} roughness={.46} /></mesh>
    </group> : <group position={[inward, .3, 0]}>
      <mesh position={[0, .08, 0]}><cylinderGeometry args={[.11, .13, .22, 24]} /><meshPhysicalMaterial color="#eea79a" metalness={.08} roughness={.2} transmission={.08} transparent opacity={.82} clearcoat={.6} /></mesh>
      <mesh position={[0, .25, 0]}><boxGeometry args={[.12, .06, .12]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.17} /></mesh>
      <mesh position={[0, 1.12, 0]} scale={[.22, .12, .3]}><sphereGeometry args={[1, 22, 14]} /><meshPhysicalMaterial color="#f7d7cf" metalness={.04} roughness={.78} /></mesh>
    </group>}
    <mesh position={[inward, 0, 0]}><boxGeometry args={[.028, 3.42, 1.48]} /><meshPhysicalMaterial color="#fff9ed" metalness={.08} roughness={.08} transmission={.28} thickness={.04} transparent opacity={.14} clearcoat={.62} /></mesh>
    <pointLight position={[inward * .7, .48, 0]} color="#ffe5c3" intensity={.54} distance={2.6} decay={2} />
  </group>;
}

function YoonchaeCuratedObject({ kind }) {
  if (kind === 'bag') return <group name="yoonchae-designer-handbag">
    <mesh position={[0, .14, 0]} scale={[.22, .13, .34]}><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color="#e4c2ab" metalness={.08} roughness={.36} clearcoat={.38} /></mesh>
    <mesh position={[0, .3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[.84, .5, 1]}><torusGeometry args={[.15, .02, 8, 24, Math.PI]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>
  </group>;
  if (kind === 'skincare') return <group name="yoonchae-korean-skincare-display">
    {[-.16, 0, .16].map((x, index) => <group key={x} position={[x, 0, index === 1 ? .05 : 0]}>
      <mesh position={[0, .13, 0]}><cylinderGeometry args={[.055 + index * .008, .065 + index * .008, .26 + index * .05, 20]} /><meshPhysicalMaterial color={index === 1 ? '#e7a9a1' : '#f8e9d8'} metalness={.06} roughness={.18} transmission={.05} clearcoat={.56} /></mesh>
      <mesh position={[0, .3 + index * .026, 0]}><cylinderGeometry args={[.038, .038, .06, 16]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.17} /></mesh>
    </group>)}
  </group>;
  if (kind === 'books') return <group name="yoonchae-fashion-and-album-books">
    {[-.14, -.04, .06, .16].map((x, index) => <mesh key={x} position={[x, .13, 0]} rotation={[0, 0, index === 3 ? .08 : 0]}><boxGeometry args={[.07, .26 + index * .02, .26]} /><meshPhysicalMaterial color={index % 2 ? '#d79b91' : '#f5e3cf'} metalness={.08} roughness={.48} clearcoat={.12} /></mesh>)}
  </group>;
  if (kind === 'ballet') return <group name="yoonchae-ballet-shoe-pair">
    {[-.12, .12].map((x) => <group key={x} position={[x, .06, 0]} rotation={[0, x * 1.1, 0]}>
      <mesh scale={[.14, .06, .29]}><sphereGeometry args={[1, 24, 14]} /><meshPhysicalMaterial color="#eebbb1" metalness={.02} roughness={.64} /></mesh>
      <mesh position={[0, .1, -.08]} rotation={[.15, 0, 0]}><boxGeometry args={[.03, .02, .34]} /><meshPhysicalMaterial color="#d98e8b" metalness={.04} roughness={.64} /></mesh>
    </group>)}
  </group>;
  if (kind === 'headphones') return <group name="yoonchae-luxury-headphones">
    <mesh position={[0, .18, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.18, .028, 10, 28, Math.PI]} /><meshPhysicalMaterial color="#d8ac82" metalness={.62} roughness={.26} clearcoat={.22} /></mesh>
    {[-.15, .15].map((x) => <mesh key={x} position={[x, .11, 0]} scale={[.07, .12, .07]}><sphereGeometry args={[1, 18, 12]} /><meshPhysicalMaterial color="#f3d8c2" metalness={.08} roughness={.5} /></mesh>)}
  </group>;
  if (kind === 'camera') return <group name="yoonchae-instant-camera">
    <mesh position={[0, .12, 0]}><boxGeometry args={[.26, .18, .12]} /><meshPhysicalMaterial color="#f5e5d2" metalness={.12} roughness={.3} clearcoat={.26} /></mesh>
    <mesh position={[.01, .12, .075]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.06, .06, .02, 20]} /><meshPhysicalMaterial color="#d1a471" metalness={.68} roughness={.2} /></mesh>
  </group>;
  return <group name="yoonchae-bunny-plush-and-ribbon-box">
    <mesh position={[0, .13, 0]} scale={[.13, .17, .1]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#f5e5d9" metalness={.01} roughness={.82} /></mesh>
    {[-.055, .055].map((x) => <mesh key={x} position={[x, .31, 0]} scale={[.026, .12, .03]}><sphereGeometry args={[1, 14, 10]} /><meshPhysicalMaterial color="#f5e5d9" roughness={.84} /></mesh>)}
    <mesh position={[.28, .09, 0]}><boxGeometry args={[.18, .14, .2]} /><meshPhysicalMaterial color="#e6a39b" metalness={.04} roughness={.44} clearcoat={.14} /></mesh>
    <mesh position={[.28, .17, 0]}><boxGeometry args={[.024, .018, .21]} /><meshPhysicalMaterial color="#fff2df" metalness={.06} roughness={.5} /></mesh>
  </group>;
}

function YoonchaeCurvedDisplayCabinet({ side, z, contents }) {
  const inward = side < 0 ? .23 : -.23;
  const shelfYs = [-1.02, .02, 1.02];
  return <group name={`yoonchae-curved-built-in-cabinet-${side}-${z}`} position={[side * 3.58, 2.46, z]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.42, 4.28, 1.82]} /><meshPhysicalMaterial color="#f5e7d5" metalness={.06} roughness={.42} clearcoat={.18} /></mesh>
    <mesh position={[inward * .62, -.16, 0]}><boxGeometry args={[.052, 3.5, 1.4]} /><meshPhysicalMaterial color="#dcb895" metalness={.12} roughness={.36} clearcoat={.15} /></mesh>
    <mesh position={[inward * .72, 1.54, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.67, .045, 10, 40, Math.PI]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.87} roughness={.19} /></mesh>
    {shelfYs.map((y, index) => <group key={y} position={[inward * .86, y, 0]}>
      <mesh><boxGeometry args={[.055, .05, 1.32]} /><meshPhysicalMaterial color="#b98761" metalness={.18} roughness={.36} clearcoat={.18} /></mesh>
      <mesh position={[inward < 0 ? -.032 : .032, .085, 0]}><boxGeometry args={[.017, .014, 1.18]} /><meshStandardMaterial color="#fff1d1" emissive="#dca565" emissiveIntensity={.72} /></mesh>
      <group position={[inward < 0 ? -.085 : .085, .075, 0]}>{contents[index]}</group>
    </group>)}
    <mesh position={[inward, -.08, 0]}><boxGeometry args={[.03, 3.55, 1.48]} /><meshPhysicalMaterial color="#fff9ec" metalness={.08} roughness={.06} transmission={.34} thickness={.05} ior={1.45} transparent opacity={.14} clearcoat={.7} clearcoatRoughness={.08} /></mesh>
    {[-.74, .74].map((offset) => <mesh key={offset} position={[inward * 1.05, -.08, offset]}><boxGeometry args={[.035, 3.63, .05]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>)}
    <pointLight position={[inward * .65, .36, 0]} color="#ffe5be" intensity={.68} distance={2.8} decay={2} />
  </group>;
}

function YoonchaeOrchid({ side }) {
  return <group name={`yoonchae-realistic-white-orchid-${side}`} position={[side * 2.52, .08, ROOM.backWallZ + 1.45]}>
    <mesh position={[0, .32, 0]}><cylinderGeometry args={[.22, .29, .6, 28]} /><meshPhysicalMaterial color="#ead8c3" metalness={.16} roughness={.28} clearcoat={.28} /></mesh>
    <mesh position={[0, .64, 0]}><cylinderGeometry args={[.18, .18, .03, 24]} /><meshStandardMaterial color="#403426" roughness={.92} /></mesh>
    {[-.1, .1].map((x) => <mesh key={x} position={[x, 1.25, 0]} rotation={[0, 0, x * 1.8]} scale={[.12, .73, .08]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#53754d" roughness={.68} /></mesh>)}
    {[-.18, .03, .2].map((x, index) => <group key={x} position={[x, 1.28 + index * .35, 0]}>
      {[-.1, 0, .1].map((offset) => <mesh key={offset} position={[offset, 0, 0]} scale={[.1, .07, .035]}><sphereGeometry args={[1, 18, 12]} /><meshPhysicalMaterial color="#fff7ed" metalness={.02} roughness={.36} clearcoat={.24} /></mesh>)}
      <mesh scale={[.035, .035, .04]}><sphereGeometry args={[1, 14, 10]} /><meshPhysicalMaterial color="#e6b76f" metalness={.3} roughness={.28} /></mesh>
    </group>)}
  </group>;
}

function YoonchaeStageBackdrop() {
  const z = ROOM.backWallZ + .14;
  return <group name="yoonchae-fluted-halo-stage-backdrop">
    <mesh position={[0, 2.52, z]}><boxGeometry args={[5.42, 3.98, .05]} /><meshPhysicalMaterial color="#f7e8d8" metalness={.04} roughness={.62} /></mesh>
    <mesh position={[0, 2.5, z + .04]} scale={[1.08, 1.74, .05]}><capsuleGeometry args={[1, 1, 16, 32]} /><meshPhysicalMaterial color="#edc1b1" metalness={.04} roughness={.58} clearcoat={.1} /></mesh>
    {[-2.14, -1.84, -1.54, 1.54, 1.84, 2.14].map((x) => <mesh key={x} position={[x, 2.52, z + .075]}><boxGeometry args={[.055, 3.52, .025]} /><meshPhysicalMaterial color={OAK} metalness={.14} roughness={.42} /></mesh>)}
    <mesh position={[0, 2.55, z + .11]} scale={[1.22, 1.88, 1]}><torusGeometry args={[.75, .035, 10, 44]} /><meshStandardMaterial color="#fff0d0" emissive="#dca565" emissiveIntensity={.64} /></mesh>
    <pointLight position={[0, 2.55, z + .32]} color="#ffe6c4" intensity={1.1} distance={4.2} decay={2} />
  </group>;
}

function YoonchaeStageFinish() {
  const stageZ = ROOM.backWallZ + .95;
  return <group name="yoonchae-ivory-marble-stage-finish" position={[0, 0, stageZ]}>
    <mesh position={[0, .325, 0]}><cylinderGeometry args={[1.71, 1.81, .04, 64]} /><meshPhysicalMaterial color="#f0e2d0" metalness={.17} roughness={.24} clearcoat={.58} clearcoatRoughness={.11} /></mesh>
    <mesh position={[0, .353, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.58, .03, 10, 64]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.17} /></mesh>
    <pointLight position={[0, .6, .1]} color="#ffe1bb" intensity={.48} distance={3.2} decay={2} />
  </group>;
}

function YoonchaeSoftLighting() {
  return <group name="yoonchae-soft-korean-gallery-lighting">
    <ambientLight color="#fff0dc" intensity={.18} />
    {[-1, 1].flatMap((side) => [5.3, .4, -4.7].map((z) => <pointLight key={`wall-wash-${side}-${z}`} position={[side * 3.37, 3.25, z]} color="#ffe1bd" intensity={.74} distance={4.3} decay={2} />))}
    {[-1, 1].map((side) => <pointLight key={`floor-bounce-${side}`} position={[side * 3.42, .24, -.5]} color="#f5bf9e" intensity={.22} distance={4.2} decay={2} />)}
  </group>;
}

export default function YoonchaeLuxuryDecor() {
  return <group name="yoonchae-korean-luxury-gallery">
    <YoonchaeSoftLighting />
    <YoonchaeFloor />
    <YoonchaeCeiling />
    <YoonchaeCloudChandelier />
    {[-1, 1].flatMap((side) => [5.1, .55, -4.25].map((z) => <YoonchaeWallPanel key={`${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].flatMap((side) => [
      <YoonchaeCurvedDisplayCabinet key={`front-cabinet-${side}`} side={side} z={6.04} contents={[
        <YoonchaeCuratedObject key="front-bag" kind="bag" />,
        <YoonchaeCuratedObject key="front-skin" kind="skincare" />,
        <YoonchaeCuratedObject key="front-books" kind="books" />,
      ]} />,
      <YoonchaeCurvedDisplayCabinet key={`rear-cabinet-${side}`} side={side} z={-6.06} contents={[
        <YoonchaeCuratedObject key="rear-ballet" kind="ballet" />,
        <YoonchaeCuratedObject key="rear-headphones" kind="headphones" />,
        <YoonchaeCuratedObject key="rear-bunny" kind="bunny" />,
      ]} />,
    ])}
    <YoonchaeStageBackdrop />
    <YoonchaeOrchid side={-1} />
    <YoonchaeOrchid side={1} />
    <YoonchaeStageFinish />
  </group>;
}
