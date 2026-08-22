import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ROOM } from './roomConfig';
import MemberStoryProps from './MemberStoryProps';

const CHARCOAL = '#151719';
const STONE = '#101214';
const WALNUT = '#42291d';
const BRASS = '#b89162';
const WARM = '#ffe8c7';

function Brass({ color = BRASS, roughness = .18 }) { return <meshPhysicalMaterial color={color} metalness={.9} roughness={roughness} clearcoat={.28} clearcoatRoughness={.1} />; }
function SmokedStone({ color = STONE }) { return <meshPhysicalMaterial color={color} metalness={.56} roughness={.2} clearcoat={.68} clearcoatRoughness={.1} reflectivity={.82} />; }

function WarmSpot({ position, target, intensity = 4.7 }) { const light = useRef(null); const focus = useRef(null); useLayoutEffect(() => { if (light.current && focus.current) light.current.target = focus.current; }, []); return <group><object3D ref={focus} position={target} /><spotLight ref={light} castShadow position={position} color={WARM} intensity={intensity} distance={9.6} angle={.5} penumbra={.85} decay={1.9} /></group>; }

function MeganWarmGalleryLighting() {
  const zones = [6.1, 2.0, -2.2, -6.1];
  return <group name="megan-warm-creative-penthouse-lighting">
    <ambientLight color="#f4dfc5" intensity={.82} /><hemisphereLight args={['#fff1dd','#23201d',.9]} /><directionalLight castShadow position={[0,7.2,4]} color="#fff1de" intensity={1.75} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    {[-1,1].flatMap((side)=>zones.map((z)=><pointLight key={`${side}-${z}`} position={[side*3.3,2.78,z]} color="#ffdcac" intensity={2.28} distance={5.3} decay={1.85} />))}
    {zones.map((z)=><pointLight key={`cove-${z}`} position={[0,4.32,z]} color="#fff0d8" intensity={1.75} distance={6.3} decay={1.9} />)}
    <WarmSpot position={[-2.65,4.35,5.15]} target={[-3.55,2.5,5.0]} intensity={5.1} /><WarmSpot position={[2.65,4.35,5.15]} target={[3.55,2.5,5.0]} intensity={5.1} /><WarmSpot position={[-2.65,4.28,-2.3]} target={[-3.55,2.42,-2.3]} intensity={4.4} /><WarmSpot position={[2.65,4.28,-2.3]} target={[3.55,2.42,-2.3]} intensity={4.4} /><WarmSpot position={[0,4.45,-7.55]} target={[0,.95,-8.72]} intensity={5.8} />
  </group>;
}

function MeganCharcoalFloor() {
  return <group name="megan-matte-charcoal-marble-floor">
    <mesh position={[0,.065,-.5]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[7.92,19.1]} /><SmokedStone /></mesh>
    {[-2,0,2].map((x,index)=><mesh key={x} position={[x,.072,-.5]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[1.98,18.96]} /><SmokedStone color={index===1?'#1b1d1f':'#0d0f11'} /></mesh>)}
    {[-6.55,-1.82,2.9,7.15].map((z)=><mesh key={z} position={[0,.08,z]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.72,.022]} /><meshBasicMaterial color="#9a7857" transparent opacity={.28} /></mesh>)}
    {[-2.35,2.35].map((x)=><mesh key={x} position={[x,.085,-.5]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.026,18.4]} /><meshBasicMaterial color="#b18b63" transparent opacity={.46} /></mesh>)}
  </group>;
}

function MeganLuxuryCeiling() {
  const panels=[[0,4.92,-.5,7.96,19.1],[-.9,4.67,1.8,4.7,10.8],[1.15,4.48,-1.9,3.4,11.2],[0,4.27,-6.25,4.8,4.3]];
  return <group name="megan-layered-walnut-creative-ceiling">{panels.map(([x,y,z,width,depth],index)=><group key={index} position={[x,y,z]}><mesh><boxGeometry args={[width,.18,depth]} /><meshPhysicalMaterial color={index===1?WALNUT:CHARCOAL} metalness={.22} roughness={index===1?.3:.36} clearcoat={.14} /></mesh>{[-1,1].map((side)=><mesh key={side} position={[side*(width/2-.1),-.11,0]}><boxGeometry args={[.035,.028,depth-.2]} /><Brass /></mesh>)}{[-1,1].map((side)=><mesh key={side} position={[0,-.11,side*(depth/2-.1)]}><boxGeometry args={[width-.2,.028,.035]} /><meshStandardMaterial color={WARM} emissive="#d69149" emissiveIntensity={1.85} /></mesh>)}</group>)}</group>;
}

function MeganArtLight() {
  const curves=useMemo(()=>[new THREE.CatmullRomCurve3([new THREE.Vector3(-1.25,0,-.28),new THREE.Vector3(-.45,.15,.18),new THREE.Vector3(.32,-.08,-.12),new THREE.Vector3(1.28,.1,.26)]),new THREE.CatmullRomCurve3([new THREE.Vector3(-1.1,.1,.26),new THREE.Vector3(-.3,-.1,-.17),new THREE.Vector3(.42,.12,.14),new THREE.Vector3(1.1,-.04,-.25)])],[]);
  return <group name="megan-sculptural-creative-ceiling-light" position={[0,4.1,-.6]}><mesh position={[0,.4,0]}><cylinderGeometry args={[.026,.026,.62,16]} /><Brass /></mesh>{curves.map((curve,index)=><mesh key={index} rotation={[index?.2:-.17,index?-.18:.2,0]}><tubeGeometry args={[curve,56,.045,10,false]} /><Brass color={index?'#d1aa78':'#8a6247'} roughness={.14} /></mesh>)}{[-.8,0,.8].map((x,index)=><group key={x} position={[x,-.35-index*.08,index===1?.25:-.17]}><mesh><sphereGeometry args={[.1,22,16]} /><meshStandardMaterial color="#fff3df" emissive="#efbd78" emissiveIntensity={.65} /></mesh><mesh position={[0,.3+index*.07,0]}><cylinderGeometry args={[.012,.012,.55+index*.1,12]} /><Brass /></mesh></group>)}</group>;
}

function CreativeWallBay({ side, z, width, finish = 'walnut' }) {
  const rotation=[0,side<0?Math.PI/2:-Math.PI/2,0]; const material=finish==='fabric'?<meshPhysicalMaterial color="#292226" metalness={.04} roughness={.94} />:finish==='mirror'?<meshPhysicalMaterial color="#4b4540" metalness={.86} roughness={.05} clearcoat={.52} transmission={.08} transparent opacity={.8} />:<meshPhysicalMaterial color={WALNUT} metalness={.16} roughness={.3} clearcoat={.16} />;
  return <group name={`megan-${finish}-creative-wall-bay-${side}-${z}`} position={[side*3.84,2.48,z]} rotation={rotation}><mesh><boxGeometry args={[width,4.38,.13]} /><meshPhysicalMaterial color="#171719" metalness={.54} roughness={.34} /></mesh><mesh position={[0,0,.082]}><boxGeometry args={[width-.26,3.96,.04]} />{material}</mesh>{[-1,1].map((edge)=><mesh key={edge} position={[edge*(width/2-.1),0,.12]}><boxGeometry args={[.045,4.06,.028]} /><Brass color="#a9825d" roughness={.18} /></mesh>)}<mesh position={[0,-1.74,.13]}><boxGeometry args={[width-.38,.03,.02]} /><meshStandardMaterial color={WARM} emissive="#c98040" emissiveIntensity={.8} /></mesh></group>;
}

function MeganStage() { const z=ROOM.backWallZ+1.16; return <group name="megan-modern-creative-stage"><mesh position={[0,2.48,ROOM.backWallZ+.18]}><boxGeometry args={[7.8,4.68,.24]} /><SmokedStone color="#181a1c" /></mesh><mesh position={[0,2.48,ROOM.backWallZ+.34]}><boxGeometry args={[5.94,3.58,.06]} /><meshPhysicalMaterial color={WALNUT} metalness={.18} roughness={.34} clearcoat={.15} /></mesh>{[-2.62,2.62].map((x)=><mesh key={x} position={[x,2.48,ROOM.backWallZ+.41]}><boxGeometry args={[.055,3.72,.04]} /><Brass /></mesh>)}<mesh position={[0,.18,z]}><boxGeometry args={[6.52,.3,2.28]} /><SmokedStone /></mesh><mesh position={[0,.36,z+.02]}><boxGeometry args={[5.78,.07,1.84]} /><Brass color="#63432f" roughness={.21} /></mesh><mesh position={[0,.43,z+.02]}><boxGeometry args={[4.82,.12,1.38]} /><SmokedStone color="#1b1d1f" /></mesh><mesh position={[0,.5,z-.75]}><boxGeometry args={[4.25,.025,.025]} /><meshStandardMaterial color={WARM} emissive="#d68b44" emissiveIntensity={1.25} /></mesh></group>; }

export default function MeganIdentityArchitecture() { return <group name="megan-warm-modern-creative-penthouse"><MeganCharcoalFloor /><MeganLuxuryCeiling /><MeganArtLight /><CreativeWallBay side={-1} z={6.1} width={2.6} finish="walnut" /><CreativeWallBay side={-1} z={1.2} width={1.85} finish="mirror" /><CreativeWallBay side={-1} z={-3.75} width={3.0} finish="fabric" /><CreativeWallBay side={1} z={5.65} width={3.1} finish="fabric" /><CreativeWallBay side={1} z={.9} width={1.85} finish="mirror" /><CreativeWallBay side={1} z={-4.05} width={2.65} finish="walnut" /><MeganStage /><MeganWarmGalleryLighting /><MemberStoryProps member="megan" /></group>; }
