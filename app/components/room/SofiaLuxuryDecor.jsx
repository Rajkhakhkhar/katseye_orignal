import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ROOM } from './roomConfig';
import MemberStoryProps from './MemberStoryProps';
import monogramRug from '../../assets/room/sophia/sophia-ivory-monogram-rug.png';

const IVORY = '#eee1c9';
const IVORY_DEEP = '#d8c39c';
const CHAMPAGNE = '#d1a467';
const WALNUT = '#3a2114';
const WALNUT_DARK = '#22130d';
const WARM_LIGHT = '#ffe8b8';

function SofiaWallPanel({ side, z, span = 3.8 }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  const edge = span / 2 - .13;
  return <group position={[side * 3.965, 2.5, z]} rotation={rotation}>
    <mesh><boxGeometry args={[span, 4.62, .085]} /><meshPhysicalMaterial color={IVORY} metalness={.1} roughness={.54} clearcoat={.1} /></mesh>
    <mesh position={[0, 0, .052]}><boxGeometry args={[span - .22, 4.4, .032]} /><meshPhysicalMaterial color="#f7eddc" metalness={.06} roughness={.63} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`horizontal-${direction}`} position={[0, direction * 2.07, .086]}><boxGeometry args={[span - .2, .105, .062]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.17} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`vertical-${direction}`} position={[direction * edge, 0, .086]}><boxGeometry args={[.105, 4.2, .062]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.17} /></mesh>)}
    <mesh position={[0, 0, .092]}><boxGeometry args={[span - .58, 3.84, .038]} /><meshPhysicalMaterial color={IVORY_DEEP} metalness={.11} roughness={.68} clearcoat={.05} /></mesh>
    {[-.72, -.36, 0, .36, .72].filter((x) => Math.abs(x) < span / 2 - .64).map((x) => <mesh key={`flute-${x}`} position={[x, 0, .125]}><boxGeometry args={[.026, 3.5, .022]} /><meshPhysicalMaterial color="#d6c29e" metalness={.04} roughness={.82} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`inner-${direction}`} position={[direction * (span / 2 - .48), 0, .12]}><boxGeometry args={[.055, 3.48, .038]} /><meshPhysicalMaterial color="#f0d39b" metalness={.87} roughness={.18} /></mesh>)}
    <mesh position={[0, -1.6, .132]}><boxGeometry args={[span - .76, .035, .022]} /><meshPhysicalMaterial color="#2a1a14" metalness={.5} roughness={.24} clearcoat={.3} /></mesh>
  </group>;
}

function SofiaSconce({ side, z }) {
  return <group name="sofia-wall-sconce" position={[side * 3.77, 3.14, z]}>
    <mesh><boxGeometry args={[.075, .72, .32]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.18} /></mesh>
    <mesh position={[-side * .08, .12, 0]}><sphereGeometry args={[.17, 20, 14]} /><meshPhysicalMaterial color="#fff4d8" emissive="#ffd88e" emissiveIntensity={.78} roughness={.24} /></mesh>
    <mesh position={[-side * .055, -.22, 0]}><coneGeometry args={[.19, .35, 24, 1, true]} /><meshPhysicalMaterial color="#f9e4b7" transparent opacity={.5} transmission={.18} roughness={.16} /></mesh>
    <pointLight position={[-side * .28, .08, 0]} color={WARM_LIGHT} intensity={1.8} distance={3.6} decay={2} />
  </group>;
}

function SofiaIntegratedDisplayBay({ side }) {
  const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
  return <group name={`sofia-integrated-display-bay-${side}`} position={[side * 3.97, 2.52, 6.18]} rotation={rotation}>
    <mesh><boxGeometry args={[2.32, 4.32, .11]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.5} roughness={.28} clearcoat={.2} /></mesh>
    <mesh position={[0, 0, .07]}><boxGeometry args={[1.94, 3.92, .045]} /><meshPhysicalMaterial color="#1e1511" metalness={.34} roughness={.38} clearcoat={.12} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`bay-v-${direction}`} position={[direction * 1.02, 0, .105]}><boxGeometry args={[.1, 4.1, .075]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.92} roughness={.16} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`bay-h-${direction}`} position={[0, direction * 2.02, .105]}><boxGeometry args={[2.12, .1, .075]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.92} roughness={.16} /></mesh>)}
    <mesh position={[0, 0, .13]}><boxGeometry args={[1.78, 3.68, .025]} /><meshPhysicalMaterial color="#fff1d4" transparent opacity={.14} transmission={.28} roughness={.1} /></mesh>
    {[-.78, .78].map((x) => <mesh key={x} position={[x, 0, .145]}><boxGeometry args={[.03, 3.44, .035]} /><meshStandardMaterial color={WARM_LIGHT} emissive="#d89536" emissiveIntensity={1.12} /></mesh>)}
    <pointLight position={[0, .2, .25]} color="#ffe4aa" intensity={1.22} distance={2.8} decay={2} />
  </group>;
}

function SofiaPortraitSpotlight({ side, z }) {
  const light = useRef(null);
  const target = useRef(null);
  useLayoutEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);

  return <group name="sofia-portrait-spotlight">
    <object3D ref={target} position={[side * 3.78, 2.55, z]} />
    <spotLight ref={light} position={[side * 2.38, 4.5, z + .65]} color="#ffe4ad" intensity={5.2} distance={7.2} angle={.52} penumbra={.72} decay={2} />
  </group>;
}

function SofiaHonoursCabinet({ side }) {
  const inward = side < 0 ? .29 : -.29;
  const shelfLevels = [-.9, .15, 1.2];
  return <group name={`sofia-honours-cabinet-${side}`} position={[side * 3.67, 2.32, 6.28]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.58, 4.42, 2.18]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.58} roughness={.28} clearcoat={.25} /></mesh>
    <mesh position={[inward, .02, 0]}><boxGeometry args={[.035, 4.05, 1.86]} /><meshPhysicalMaterial color="#fff3d6" transparent opacity={.19} transmission={.46} thickness={.07} ior={1.45} attenuationColor="#f3debd" attenuationDistance={1.5} roughness={.07} clearcoat={.62} clearcoatRoughness={.08} /></mesh>
    {shelfLevels.map((y) => <mesh key={y} position={[inward * .56, y, 0]}><boxGeometry args={[.4, .045, 1.68]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>)}
    {[-.72, .72].map((z) => <mesh key={`support-${z}`} position={[inward * .77, .04, z]}><cylinderGeometry args={[.018, .018, 3.78, 12]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.2} /></mesh>)}
    <mesh position={[inward, 1.84, 0]}><boxGeometry args={[.025, .042, 1.7]} /><meshStandardMaterial color={WARM_LIGHT} emissive="#d9973b" emissiveIntensity={1.2} /></mesh>
    <mesh position={[inward * .4, 1.34, -.5]}><cylinderGeometry args={[.18, .24, .42, 28]} /><meshPhysicalMaterial color="#f6df9f" metalness={.86} roughness={.16} /></mesh>
    <mesh position={[inward * .4, 1.68, -.5]}><sphereGeometry args={[.22, 18, 12]} /><meshPhysicalMaterial color="#ffeebc" metalness={.74} roughness={.16} /></mesh>
    <mesh position={[inward * .4, .5, .45]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.29, .04, 8, 28, Math.PI]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.92} roughness={.16} /></mesh>
    {[[-.16, .48], [.16, .48], [0, .69]].map(([x, z], index) => <mesh key={`crown-${index}`} position={[inward * .42, .58 + (index === 2 ? .12 : 0), z]} rotation={[0, Math.PI / 2, 0]}><coneGeometry args={[.09, .2, 5, 1, true]} /><meshPhysicalMaterial color="#f4d47f" metalness={.9} roughness={.13} /></mesh>)}
    <mesh position={[inward * .4, .02, -.45]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.18, .18, .07, 28]} /><meshPhysicalMaterial color="#2a1e25" metalness={.38} roughness={.28} /></mesh>
    <mesh position={[inward * .4, .02, .45]}><boxGeometry args={[.25, .38, .42]} /><meshPhysicalMaterial color="#563626" metalness={.25} roughness={.42} clearcoat={.15} /></mesh>
    <mesh position={[inward * .42, -1.35, -.42]}><boxGeometry args={[.18, .42, .5]} /><meshPhysicalMaterial color="#8c5b38" metalness={.24} roughness={.46} /></mesh>
    <mesh position={[inward * .42, -1.35, .02]}><boxGeometry args={[.18, .42, .5]} /><meshPhysicalMaterial color="#2f2731" metalness={.32} roughness={.42} /></mesh>
    <mesh position={[inward * .42, -1.35, .46]}><boxGeometry args={[.18, .42, .5]} /><meshPhysicalMaterial color="#e7d7bd" metalness={.12} roughness={.58} /></mesh>
    <mesh position={[inward * .4, -1.18, .04]}><cylinderGeometry args={[.038, .045, .5, 18]} /><meshPhysicalMaterial color="#d7ac69" metalness={.88} roughness={.15} /></mesh>
    <mesh position={[inward * .4, -.87, .04]}><sphereGeometry args={[.09, 16, 12]} /><meshPhysicalMaterial color="#3a3131" metalness={.64} roughness={.22} /></mesh>
    <pointLight position={[inward * .25, .65, 0]} color="#ffe3a0" intensity={1.25} distance={2.5} decay={2} />
  </group>;
}

function SofiaPortraitConsole({ side }) {
  return <group name={`sofia-portrait-console-${side}`} position={[side * 3.5, .67, 4.88]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh position={[0, .22, 0]}><boxGeometry args={[.54, .48, 2.68]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.42} roughness={.3} clearcoat={.24} /></mesh>
    <mesh position={[.31, .48, 0]}><boxGeometry args={[.045, .07, 2.52]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.16} /></mesh>
    {[-1.05, 1.05].map((z) => <mesh key={z} position={[0, -.16, z]}><cylinderGeometry args={[.055, .075, .58, 18]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.86} roughness={.19} /></mesh>)}
    <mesh position={[.34, .68, -.62]}><sphereGeometry args={[.11, 18, 12]} /><meshPhysicalMaterial color="#f5d887" metalness={.8} roughness={.17} /></mesh>
    <mesh position={[.34, .68, .5]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.15, .025, 8, 22]} /><meshPhysicalMaterial color="#f3d47e" metalness={.88} roughness={.15} /></mesh>
    {[-.2, -.06, .08].map((y, index) => <mesh key={`book-${index}`} position={[.34, .61 + index * .075, -.12]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[.18 + index * .04, .07, .44]} /><meshPhysicalMaterial color={index === 1 ? '#b68b50' : '#472d24'} metalness={.28} roughness={.42} /></mesh>)}
    <mesh position={[.34, .67, .92]}><cylinderGeometry args={[.1, .12, .23, 24]} /><meshPhysicalMaterial color="#ead9bd" metalness={.22} roughness={.28} clearcoat={.14} /></mesh>
    <mesh position={[.34, .84, .92]}><sphereGeometry args={[.055, 16, 10]} /><meshStandardMaterial color="#ffe6a3" emissive="#d58c37" emissiveIntensity={.7} /></mesh>
    <mesh position={[.34, .72, -1.02]}><boxGeometry args={[.035, .31, .4]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.15} /></mesh>
    <mesh position={[.365, .72, -1.02]}><planeGeometry args={[.26, .22]} /><meshStandardMaterial color="#f5e6cb" roughness={.72} /></mesh>
    <mesh position={[.34, .72, 1.08]}><cylinderGeometry args={[.075, .1, .2, 20]} /><meshPhysicalMaterial color="#dcae7a" transparent opacity={.64} transmission={.1} roughness={.18} /></mesh>
    <mesh position={[.34, .87, 1.08]}><sphereGeometry args={[.04, 14, 10]} /><meshPhysicalMaterial color="#f1d18a" metalness={.7} roughness={.17} /></mesh>
    <pointLight position={[.4, .48, 0]} color="#ffd991" intensity={.42} distance={2.1} decay={2} />
  </group>;
}

function SofiaPalm({ side }) {
  const fronds = useMemo(() => Array.from({ length: 22 }, (_, index) => ({
    angle: index * Math.PI * 2 / 22 + (index % 2) * .11,
    height: 1.74 + (index % 4) * .06,
    reach: .22 + (index % 5) * .055,
    length: .62 + (index % 4) * .075,
    drop: .32 + (index % 3) * .07,
    color: ['#26432c', '#31563a', '#3e6844', '#1e3826'][index % 4],
  })), []);
  return <group name={`sofia-stage-palm-${side}`} position={[side * 2.55, .08, ROOM.backWallZ + 1.52]}>
    <mesh position={[0, .35, 0]}><cylinderGeometry args={[.4, .52, .7, 40]} /><meshPhysicalMaterial color="#cda566" metalness={.78} roughness={.22} clearcoat={.34} /></mesh>
    <mesh position={[0, .73, 0]}><torusGeometry args={[.405, .032, 10, 40]} /><meshPhysicalMaterial color="#e5c481" metalness={.9} roughness={.16} /></mesh>
    <mesh position={[0, .72, 0]}><cylinderGeometry args={[.35, .35, .035, 32]} /><meshStandardMaterial color="#2e2117" roughness={.92} /></mesh>
    <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[.075, .125, 1.28, 18]} /><meshPhysicalMaterial color="#604124" roughness={.62} clearcoat={.08} /></mesh>
    <mesh position={[.025, 1.75, .015]}><cylinderGeometry args={[.055, .09, .38, 16]} /><meshPhysicalMaterial color="#6c4a29" roughness={.6} /></mesh>
    {fronds.map((frond, index) => <group key={`kentia-frond-${index}`} position={[Math.cos(frond.angle) * frond.reach, frond.height, Math.sin(frond.angle) * frond.reach]} rotation={[.15 + (index % 3) * .035, -frond.angle, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2 - frond.drop]} scale={[frond.length, .11, .27]}><sphereGeometry args={[1, 18, 12]} /><meshPhysicalMaterial color={frond.color} metalness={.02} roughness={.64} clearcoat={.12} clearcoatRoughness={.38} /></mesh>
      <mesh position={[.03, 0, 0]} rotation={[0, 0, Math.PI / 2 - frond.drop]} scale={[frond.length * .92, .012, .028]}><boxGeometry args={[1.9, 1, 1]} /><meshPhysicalMaterial color="#7b8b4a" metalness={.02} roughness={.7} /></mesh>
    </group>)}
  </group>;
}

function SofiaLoungeSetting({ side }) {
  return <group name={`sofia-lounge-setting-${side}`} position={[side * 2.72, .1, -5.42]} rotation={[0, side < 0 ? -.26 : .26, 0]}>
    <mesh position={[0, .52, 0]}><boxGeometry args={[1.18, .45, 1.06]} /><meshPhysicalMaterial color="#e7d8ba" metalness={.04} roughness={.72} clearcoat={.08} /></mesh>
    <mesh position={[0, 1.12, -.34]} rotation={[.22, 0, 0]}><boxGeometry args={[1.18, .92, .24]} /><meshPhysicalMaterial color="#f1e4cb" metalness={.03} roughness={.76} clearcoat={.06} /></mesh>
    {[-.52, .52].map((x) => <mesh key={x} position={[x, .78, .02]}><boxGeometry args={[.14, .52, .98]} /><meshPhysicalMaterial color="#e4d1ad" roughness={.74} /></mesh>)}
    {[-.46, .46].map((x) => [-.38, .38].map((z) => <mesh key={`${x}-${z}`} position={[x, .18, z]}><cylinderGeometry args={[.04, .055, .38, 14]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.86} roughness={.18} /></mesh>))}
    <mesh position={[-side * 1.05, .47, .04]}><cylinderGeometry args={[.34, .4, .72, 28]} /><meshPhysicalMaterial color="#34231a" metalness={.55} roughness={.28} clearcoat={.2} /></mesh>
    <mesh position={[-side * 1.05, .86, .04]}><cylinderGeometry args={[.44, .44, .07, 28]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.86} roughness={.18} /></mesh>
    <mesh position={[-side * 1.05, .97, .04]}><cylinderGeometry args={[.12, .12, .12, 20]} /><meshPhysicalMaterial color="#e6d2ac" roughness={.4} clearcoat={.15} /></mesh>
    <pointLight position={[-side * 1.05, .88, .04]} color="#ffe0a3" intensity={.42} distance={2.2} decay={2} />
  </group>;
}

function SofiaHerringboneFloor() {
  const rows = [-7.1, -5.65, -4.2, -2.75, -1.3, .15, 1.6, 3.05, 4.5, 5.95];
  return <group name="sofia-dark-herringbone-floor">
    <mesh position={[0, .026, -.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.7, 18.8]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.08} roughness={.4} clearcoat={.12} /></mesh>
    {rows.flatMap((z) => [-1, 1].map((side) => <mesh key={`${z}-${side}`} position={[side * 2.08, .042, z]} rotation={[0, side * .72, 0]}><boxGeometry args={[2.9, .026, .28]} /><meshPhysicalMaterial color="#6a4028" metalness={.08} roughness={.42} clearcoat={.1} /></mesh>))}
  </group>;
}

function SofiaRug() {
  const texture = useLoader(THREE.TextureLoader, monogramRug);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return <group name="sofia-premium-ivory-rug" position={[0, .068, -.62]}>
    <mesh position={[0, .025, 0]}><boxGeometry args={[5.96, .12, 12.16]} /><meshPhysicalMaterial color="#e6d6bb" roughness={.91} metalness={.02} /></mesh>
    <mesh position={[0, .092, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.78, 11.98]} /><meshPhysicalMaterial map={texture} bumpMap={texture} bumpScale={.026} color="#f0e4cf" roughness={.84} metalness={.01} clearcoat={.02} /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 2.88, .104, 0]}><boxGeometry args={[.04, .022, 11.88]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.76} roughness={.26} /></mesh>)}
  </group>;
}

function SofiaWalnutCeiling() {
  const beams = [5.8, 2.1, -1.6, -5.3];
  return <group name="sofia-walnut-coffered-ceiling">
    <mesh position={[0, 4.88, -.58]}><boxGeometry args={[6.74, .17, 16.8]} /><meshPhysicalMaterial color={WALNUT} metalness={.2} roughness={.4} clearcoat={.16} /></mesh>
    {beams.map((z) => <group key={z}>
      <mesh position={[0, 4.7, z]}><boxGeometry args={[6.6, .4, .28]} /><meshPhysicalMaterial color="#24140d" metalness={.28} roughness={.34} clearcoat={.12} /></mesh>
      <mesh position={[0, 4.49, z]}><boxGeometry args={[5.92, .052, .052]} /><meshStandardMaterial color={WARM_LIGHT} emissive="#d9963d" emissiveIntensity={1.18} /></mesh>
    </group>)}
    {[-2.95, 2.95].map((x) => <group key={x}>
      <mesh position={[x, 4.74, -.58]}><boxGeometry args={[.22, .25, 16.72]} /><meshPhysicalMaterial color="#24140d" metalness={.28} roughness={.34} /></mesh>
      <mesh position={[x - (x > 0 ? .16 : -.16), 4.61, -.58]}><boxGeometry args={[.052, .035, 16.55]} /><meshStandardMaterial color={WARM_LIGHT} emissive="#d9963d" emissiveIntensity={1.42} /></mesh>
      <pointLight position={[x - (x > 0 ? .28 : -.28), 4.48, -.58]} color={WARM_LIGHT} intensity={2.65} distance={6.6} decay={2} />
    </group>)}
  </group>;
}

function SofiaCrystalChandelier() {
  const arms = useMemo(() => [
    [[-1.15, 3.48, -.36], [-.62, 3.78, -.12], [-.18, 3.62, .14], [.28, 3.5, .08], [1.12, 3.42, .35]],
    [[-1.04, 3.4, .46], [-.4, 3.62, .22], [.06, 3.76, -.08], [.54, 3.54, -.22], [1.05, 3.48, -.42]],
    [[-.58, 3.32, -.84], [-.18, 3.55, -.36], [.35, 3.68, .08], [.7, 3.45, .48], [.52, 3.32, .86]],
  ].map((points) => new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)))), []);
  const globes = useMemo(() => [
    [-1.14, 3.28, -.36, .16], [-.57, 3.57, -.14, .14], [-.06, 3.44, .12, .17], [.5, 3.3, .08, .15], [1.12, 3.2, .35, .17],
    [-1.02, 3.2, .46, .14], [-.37, 3.4, .22, .16], [.23, 3.54, -.08, .14], [.74, 3.31, -.22, .17], [1.05, 3.23, -.42, .13],
    [-.58, 3.14, -.84, .13], [.52, 3.14, .86, .14],
  ], []);
  return <group name="sofia-crystal-chandelier" position={[0, 0, -.55]}>
    <mesh position={[0, 4.52, 0]}><cylinderGeometry args={[.1, .14, .13, 28]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.17} clearcoat={.2} /></mesh>
    <mesh position={[0, 4.14, 0]}><cylinderGeometry args={[.028, .028, .72, 14]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.92} roughness={.16} /></mesh>
    <mesh position={[0, 3.78, 0]}><sphereGeometry args={[.18, 22, 16]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.16} clearcoat={.28} /></mesh>
    {arms.map((curve, index) => <mesh key={`curved-brass-arm-${index}`}><tubeGeometry args={[curve, 72, .038, 10, false]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.91} roughness={.2} clearcoat={.22} /></mesh>)}
    {globes.map(([x, y, z, size], index) => <group key={`frosted-globe-${index}`} position={[x, y, z]}>
      <mesh position={[0, size + .09, 0]}><cylinderGeometry args={[.011, .011, .18, 10]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.9} roughness={.18} /></mesh>
      <mesh><sphereGeometry args={[size, 28, 20]} /><meshPhysicalMaterial color="#fff7e7" emissive="#ffe0a1" emissiveIntensity={.13} metalness={.02} roughness={.27} transmission={.16} thickness={.04} clearcoat={.72} clearcoatRoughness={.13} /></mesh>
    </group>)}
    <pointLight position={[0, 3.48, 0]} color="#fff4d9" intensity={4.65} distance={8.4} decay={2} />
  </group>;
}

function SofiaBackWallSalon() {
  return <group name="sofia-back-wall-salon">
    <mesh position={[0, 2.5, ROOM.backWallZ + .06]}><boxGeometry args={[5.82, 4.42, .08]} /><meshPhysicalMaterial color={WALNUT_DARK} metalness={.22} roughness={.43} clearcoat={.12} /></mesh>
    <mesh position={[0, 2.52, ROOM.backWallZ + .112]}><boxGeometry args={[5.38, 3.98, .025]} /><meshPhysicalMaterial color="#e8d7b8" metalness={.06} roughness={.7} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[direction * 2.5, 2.52, ROOM.backWallZ + .135]}><boxGeometry args={[.075, 3.72, .045]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.2} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`h-${direction}`} position={[0, 2.52 + direction * 1.8, ROOM.backWallZ + .135]}><boxGeometry args={[5.08, .075, .045]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.2} /></mesh>)}
    <mesh position={[0, 4.37, ROOM.backWallZ + .16]}><boxGeometry args={[5.55, .08, .065]} /><meshPhysicalMaterial color="#edcf91" metalness={.9} roughness={.15} /></mesh>
    {[-1.84, -1.23, 1.23, 1.84].map((x) => <mesh key={x} position={[x, 3.68, ROOM.backWallZ + .16]} rotation={[0, 0, x < 0 ? -.34 : .34]}><boxGeometry args={[.07, 1.32, .06]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.88} roughness={.18} /></mesh>)}
  </group>;
}

function SofiaVintageMicrophone() {
  const stageZ = ROOM.backWallZ + .94;
  return <group name="sofia-vintage-microphone-performance-display" position={[0, .34, stageZ]}>
    <mesh position={[0, .05, 0]}><cylinderGeometry args={[.3, .36, .1, 36]} /><meshPhysicalMaterial color="#211816" metalness={.58} roughness={.2} clearcoat={.6} /></mesh>
    {/* A low stage display keeps the clear portrait field unobstructed. */}
    <mesh position={[0, .38, 0]}><cylinderGeometry args={[.035, .05, .54, 22]} /><meshPhysicalMaterial color={CHAMPAGNE} metalness={.92} roughness={.15} /></mesh>
    <mesh position={[0, .65, 0]}><capsuleGeometry args={[.12, .25, 8, 18]} /><meshPhysicalMaterial color="#e9e1d8" metalness={.86} roughness={.22} /></mesh>
    <pointLight position={[0, .64, .16]} color="#ffe4af" intensity={.55} distance={2.4} decay={2} />
  </group>;
}

export default function SofiaLuxuryDecor() {
  const panelRuns = [4.82, .92, -3.3];
  const decor = useRef(null);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const previousEnabled = gl.shadowMap.enabled;
    const previousType = gl.shadowMap.type;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    decor.current?.traverse((node) => {
      if (node.isMesh) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        // Glass and crystal remain out of the opaque shadow pass so they stay
        // luminous; all solid Sofia furnishings still cast soft shadows.
        node.castShadow = !materials.some((material) => material?.transparent || material?.transmission > 0);
        node.receiveShadow = true;
      }
      // Point-light shadow maps multiply the render cost across Sofia's many
      // sconces and showcase LEDs. The focused portrait spots retain the soft
      // museum shadows; practical lights remain illumination-only.
      if (node.isSpotLight || node.isDirectionalLight) {
        node.castShadow = true;
        node.shadow.mapSize.set(512, 512);
        node.shadow.bias = -.0004;
      }
    });
    return () => {
      gl.shadowMap.enabled = previousEnabled;
      gl.shadowMap.type = previousType;
    };
  }, [gl]);

  return <group ref={decor} name="sofia-luxury-gallery-decor">
    {/* Sofia-local lift: 20% more welcoming exposure without changing other rooms. */}
    <ambientLight color="#fff0cf" intensity={.22} />
    <hemisphereLight args={['#fff4df', '#5e3b24', .18]} />
    <SofiaHerringboneFloor />
    <SofiaRug />
    <SofiaWalnutCeiling />
    <SofiaCrystalChandelier />
    <SofiaBackWallSalon />
    {[-1, 1].flatMap((side) => panelRuns.map((z) => <SofiaWallPanel key={`${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].flatMap((side) => [6.05, 1.0, -4.55].map((z) => <SofiaSconce key={`sconce-${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].flatMap((side) => [4.92, -2.15].map((z) => <SofiaPortraitSpotlight key={`portrait-${side}-${z}`} side={side} z={z} />))}
    {[-1, 1].map((side) => <SofiaHonoursCabinet key={`honours-${side}`} side={side} />)}
    {[-1, 1].map((side) => <SofiaPortraitConsole key={`console-${side}`} side={side} />)}
    {[-1, 1].map((side) => <SofiaPalm key={`palm-${side}`} side={side} />)}
    <SofiaVintageMicrophone />
    <MemberStoryProps member="sophia" />
  </group>;
}
