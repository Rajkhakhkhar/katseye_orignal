import { useLayoutEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ROOM } from './roomConfig';
import runnerTexture from '../../assets/room/lara/lara-bronze-cheetah-runner.png';

const NERO = '#090b0d';
const WALNUT = '#2c1c16';
const BRONZE = '#875d43';
const GOLD = '#d0a36c';
const WARM = '#ffe6c2';

function Brass({ color = BRONZE, roughness = .18 }) {
  const brushed = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256; const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b0845b'; ctx.fillRect(0, 0, 256, 256);
    for (let index = 0; index < 180; index += 1) { const y = (index * 47) % 256; ctx.fillStyle = index % 3 ? 'rgba(55,31,17,.18)' : 'rgba(255,230,184,.16)'; ctx.fillRect(0, y, 256, 1); }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; return map;
  }, []);
  return <meshPhysicalMaterial color={color} map={brushed} bumpMap={brushed} bumpScale={.008} metalness={.93} roughness={roughness} clearcoat={.3} clearcoatRoughness={.09} />;
}
function Stone({ color = NERO }) {
  const mineral = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 384; const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#101214'; ctx.fillRect(0, 0, 384, 384);
    for (let index = 0; index < 90; index += 1) { const x = (index * 61) % 384; const y = (index * 89) % 384; ctx.fillStyle = index % 5 ? 'rgba(245,236,220,.025)' : 'rgba(183,138,88,.16)'; ctx.fillRect(x, y, 1 + (index % 3), 80 + (index % 7) * 13); }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; return map;
  }, []);
  return <meshPhysicalMaterial color={color} map={mineral} bumpMap={mineral} bumpScale={.012} metalness={.64} roughness={.14} clearcoat={.84} clearcoatRoughness={.065} reflectivity={.92} />;
}

function Velvet() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#342317'; ctx.fillRect(0, 0, 512, 512);
    [[68,70,31],[178,54,22],[302,97,39],[429,65,28],[104,196,28],[244,183,42],[399,211,31],[51,336,38],[184,319,25],[318,344,46],[451,365,31],[106,452,27],[250,443,35],[385,464,24]].forEach(([x,y,r], index) => {
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle = index % 2 ? '#16100d' : '#0b0a09'; ctx.fill();
      ctx.beginPath(); ctx.arc(x+r*.18,y-r*.12,r*.52,0,Math.PI*2); ctx.fillStyle = '#9a6d44'; ctx.fill();
    });
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; map.repeat.set(1.4, 2.1); return map;
  }, []);
  return <meshPhysicalMaterial map={texture} bumpMap={texture} bumpScale={.03} color="#9a714b" roughness={.88} metalness={.02} />;
}

function MuseumSpot({ position, target, intensity = 7, angle = .48 }) {
  const lamp = useRef(null); const focus = useRef(null);
  useLayoutEffect(() => { if (lamp.current && focus.current) lamp.current.target = focus.current; }, []);
  return <group><object3D ref={focus} position={target} /><spotLight ref={lamp} castShadow position={position} color={WARM} intensity={intensity} distance={12} decay={1.65} angle={angle} penumbra={.8} /></group>;
}

function MuseumLighting() {
  const zones = [6.8, 3.0, -.7, -4.3, -7.2];
  return <group name="lara-bright-luxury-museum-lighting">
    <ambientLight color="#ffe3c5" intensity={1.65} />
    <hemisphereLight args={['#fff3df', '#765646', 1.55]} />
    <directionalLight castShadow position={[0, 8, 5]} color="#fff5e4" intensity={2.8} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    {[-1, 1].flatMap((side) => zones.map((z) => <pointLight key={`${side}-${z}`} position={[side*3.28, 2.7, z]} color="#ffdda9" intensity={4.15} distance={5.7} decay={1.65} />))}
    {zones.map((z) => <pointLight key={`fill-${z}`} position={[0,4.35,z]} color="#fff0d8" intensity={3.2} distance={7.1} decay={1.65} />)}
    <MuseumSpot position={[-2.75,4.5,5.9]} target={[-3.55,2.5,5.7]} intensity={8.2} />
    <MuseumSpot position={[-2.75,4.45,-1.1]} target={[-3.55,2.35,-1.1]} intensity={7.5} />
    <MuseumSpot position={[2.75,4.5,5.2]} target={[3.55,2.55,5.1]} intensity={8} />
    <MuseumSpot position={[2.75,4.45,-1.2]} target={[3.55,2.35,-1.1]} intensity={7.4} />
    <MuseumSpot position={[0,4.55,-7.45]} target={[0,1.3,-8.6]} intensity={9.0} angle={.62} />
    {[-1,1].flatMap((side) => zones.map((z) => <pointLight key={`uplight-${side}-${z}`} position={[side*3.5,.3,z]} color="#e6a764" intensity={1.45} distance={3.7} decay={1.6} />))}
  </group>;
}

function NeroMarquinaFloor() {
  const veins = [[-2.7,5.7,5.3,-.15],[-.4,2.8,6.1,.08],[1.85,-.8,7.0,-.11],[-2.15,-5.8,5.6,.12]];
  return <group name="lara-nero-marquina-museum-floor">
    <mesh position={[0,.075,-.5]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[7.94,19.15]} /><Stone /></mesh>
    {[-2.66,-.88,.88,2.66].map((x,index) => <mesh key={x} position={[x,.082,-.5]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[1.75,19.02]} /><Stone color={index%2?'#15181a':'#0d1012'} /></mesh>)}
    {[-6.5,-1.75,2.95,7.15].map((z) => <mesh key={z} position={[0,.09,z]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.78,.02]} /><meshBasicMaterial color="#6b4b35" transparent opacity={.34} /></mesh>)}
    {veins.map(([x,z,length,turn],index) => <mesh key={index} position={[x,.095,z]} rotation={[-Math.PI/2,0,turn]}><planeGeometry args={[.028,length]} /><meshBasicMaterial color={index%2?'#a7774c':'#e0af72'} transparent opacity={.38} /></mesh>)}
  </group>;
}

function LaraRunnerCarpet() {
  const runner = useLoader(THREE.TextureLoader, runnerTexture);
  runner.colorSpace = THREE.SRGBColorSpace;
  runner.wrapS = runner.wrapT = THREE.RepeatWrapping;
  runner.repeat.set(1, 4.8);
  runner.anisotropy = 8;
  return <group name="lara-plush-dark-bronze-cheetah-runner">
    <mesh position={[0, .108, -.2]} receiveShadow><boxGeometry args={[3.36, .06, 16.7]} /><meshPhysicalMaterial color="#160f0d" roughness={.88} metalness={.02} clearcoat={.02} /></mesh>
    <mesh position={[0, .143, -.2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[3.22, 16.52]} /><meshPhysicalMaterial map={runner} color="#725033" roughness={.82} metalness={.02} clearcoat={.03} /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 1.62, .158, -.2]}><boxGeometry args={[.035, .024, 16.46]} /><Brass color="#704b33" roughness={.34} /></mesh>)}
    {[-8.34, 8.34].map((offset) => <mesh key={offset} position={[0, .158, offset - .2]}><boxGeometry args={[3.18, .024, .035]} /><Brass color="#704b33" roughness={.34} /></mesh>)}
  </group>;
}

function HotelCeiling() {
  const coffers = [[0,4.91,-.5,7.96,19.1],[0,4.62,1.75,6.45,11.2],[-.8,4.38,-5.5,4.6,5.2],[1.82,4.5,-1.15,2.1,11.8]];
  return <group name="lara-luxury-hotel-recessed-ceiling">
    <mesh position={[0,4.97,-.5]}><boxGeometry args={[8,.12,19.2]} /><meshPhysicalMaterial color="#111214" metalness={.45} roughness={.36} /></mesh>
    {coffers.map(([x,y,z,width,depth],index) => <group key={index} position={[x,y,z]}>
      <mesh><boxGeometry args={[width,.18,depth]} /><meshPhysicalMaterial color={index===1?'#1a1212':index===3?WALNUT:'#141619'} metalness={.22} roughness={index===1?.92:.31} clearcoat={.12} /></mesh>
      {[-1,1].map((side) => <mesh key={side} position={[side*(width/2-.09),-.11,0]}><boxGeometry args={[.035,.03,depth-.18]} /><Brass /></mesh>)}
      {[-1,1].map((side) => <mesh key={side} position={[0,-.11,side*(depth/2-.1)]}><boxGeometry args={[width-.18,.03,.035]} /><meshStandardMaterial color={WARM} emissive="#df9347" emissiveIntensity={3.1} /></mesh>)}
    </group>)}
    {[-6.5,-2.4,1.8,5.8].map((z) => <mesh key={z} position={[0,4.26,z]}><boxGeometry args={[6.1,.045,.065]} /><Brass color="#6f4b36" roughness={.24} /></mesh>)}
    {[-2.15, 2.15].flatMap((x) => [5.4, 1.4, -2.7, -6.3].map((z) => <group key={`${x}-${z}`} position={[x,4.19,z]} rotation={[Math.PI / 2,0,0]}><mesh><torusGeometry args={[.115,.018,8,24]} /><Brass color="#74503a" roughness={.28} /></mesh><mesh position={[0,0,.01]}><circleGeometry args={[.08,20]} /><meshStandardMaterial color="#f7dfbd" emissive="#c9803d" emissiveIntensity={.55} roughness={.4} /></mesh></group>))}
  </group>;
}

function ArtTexture({ title, subtitle, glow = false }) {
  const texture = useMemo(() => {
    const canvas=document.createElement('canvas'); canvas.width=720; canvas.height=1000; const ctx=canvas.getContext('2d');
    ctx.fillStyle='#151013'; ctx.fillRect(0,0,720,1000); ctx.strokeStyle='#bd8c5a'; ctx.lineWidth=16; ctx.strokeRect(28,28,664,944);
    ctx.fillStyle='#deb47d'; ctx.font='700 95px Georgia'; ctx.textAlign='center'; ctx.fillText('LARA',360,360);
    ctx.fillStyle='#f5d7a6'; ctx.font='500 42px Arial'; ctx.fillText(title,360,445); ctx.fillStyle='#9f7350'; ctx.font='24px Arial'; ctx.fillText(subtitle,360,505);
    ctx.fillStyle='#5f3c2a'; ctx.fillRect(115,655,490,2); ctx.fillStyle='#c99a66'; ctx.font='italic 32px Georgia'; ctx.fillText('L / R',360,732);
    const result=new THREE.CanvasTexture(canvas); result.colorSpace=THREE.SRGBColorSpace; return result;
  },[title,subtitle]);
  return <mesh position={[.294,0,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[1.06,1.52]} /><meshStandardMaterial map={texture} emissiveMap={glow ? texture : null} emissive="#6e381b" emissiveIntensity={glow ? .34 : 0} roughness={.48} /></mesh>;
}

function MuseumCase({ side, z, width, height, title, children, velvet = false }) {
  const rotation=side<0?[0,0,0]:[0,Math.PI,0];
  return <group name={`lara-${title.toLowerCase().replaceAll(' ','-')}-museum-showcase`} position={[side*3.67,height/2+.26,z]} rotation={rotation}>
    <mesh><boxGeometry args={[.56,height,width]} /><meshPhysicalMaterial color="#121417" metalness={.75} roughness={.22} clearcoat={.25} /></mesh>
    <mesh position={[.292,0,0]}><boxGeometry args={[.04,height-.26,width-.26]} />{velvet?<Velvet />:<meshPhysicalMaterial color="#302118" metalness={.18} roughness={.65} />}</mesh>
    <mesh position={[.326,0,0]}><boxGeometry args={[.018,height-.16,width-.14]} /><meshPhysicalMaterial color="#6b5146" transparent opacity={.26} transmission={.48} thickness={.08} ior={1.45} attenuationColor="#3c2a20" attenuationDistance={1.25} roughness={.045} clearcoat={.6} clearcoatRoughness={.04} /></mesh>
    {[-1,1].map((direction) => <mesh key={direction} position={[.34,direction*(height/2-.1),0]}><boxGeometry args={[.025,.035,width-.18]} /><meshStandardMaterial color={WARM} emissive="#dc8d42" emissiveIntensity={2.4} /></mesh>)}
    <mesh position={[.34,-height/2+.16,0]}><boxGeometry args={[.06,.055,width-.18]} /><Brass color={GOLD} /></mesh>
    {[-1, 1].map((direction) => <mesh key={`hinge-${direction}`} position={[.35, direction * (height / 2 - .42), width / 2 - .11]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.035, .035, .045, 16]} /><Brass color="#74503a" roughness={.28} /></mesh>)}
    {[-.82, 0, .82].filter((shelfY) => Math.abs(shelfY) < (height / 2 - .35)).map((y) => <mesh key={`shelf-${y}`} position={[.31, y, 0]}><boxGeometry args={[.04, .028, width - .34]} /><meshPhysicalMaterial color={WALNUT} metalness={.16} roughness={.33} clearcoat={.14} /></mesh>)}
    <ArtTexture title={title} subtitle="LARA PRIVATE ARCHIVE" />
    <group position={[.36,0,0]}>{children}</group>
  </group>;
}

function LaraPortrait({ side, z, label }) {
  const image=useLoader(THREE.TextureLoader,'/hero-lara-hq.png'); image.colorSpace=THREE.SRGBColorSpace;
  return <group name={`lara-${label}-editorial-frame`} position={[side*3.64,2.58,z]} rotation={side<0?[0,0,0]:[0,Math.PI,0]}>
    <mesh><boxGeometry args={[.2,4.18,2.6]} /><meshPhysicalMaterial color="#201614" metalness={.68} roughness={.2} clearcoat={.22} /></mesh>
    <mesh position={[.11,0,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[2.36,3.94]} /><Brass color={GOLD} roughness={.12} /></mesh>
    <mesh position={[.125,0,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[2.16,3.72]} /><meshStandardMaterial map={image} roughness={.4} /></mesh>
    <mesh position={[.14,-1.65,0]}><boxGeometry args={[.03,.045,1.96]} /><meshStandardMaterial color={WARM} emissive="#dd8d43" emissiveIntensity={1.5} /></mesh>
  </group>;
}

function Wardrobe() { return <group name="lara-folded-outfits-and-handbag" position={[.37,-.68,0]}>{[-.65,0,.65].map((z,index)=><group key={z} position={[0,index*.46-.25,z]}><mesh><boxGeometry args={[.13,.24,.42]} /><meshPhysicalMaterial color={index===1?'#3e2025':'#171216'} metalness={.16} roughness={.68} /></mesh><mesh position={[.08,.14,0]}><boxGeometry args={[.025,.025,.33]} /><Brass color={index===1?GOLD:BRONZE} /></mesh></group>)}<mesh position={[0,.75,.58]}><boxGeometry args={[.15,.48,.48]} /><meshPhysicalMaterial color="#251712" metalness={.22} roughness={.36} clearcoat={.26} /></mesh><mesh position={[0,1.04,.58]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.16,.025,8,22,Math.PI]} /><Brass color={GOLD} /></mesh></group>; }
function MusicArchive() { return <group name="lara-platinum-gold-records-vinyl-and-lyrics" position={[.37,-.55,0]}>{[-.72,-.24,.24,.72].map((z,index)=><group key={z} position={[0,.3+(index%2)*.65,z]} rotation={[0,0,Math.PI/2]}><mesh><cylinderGeometry args={[.34,.34,.045,40]} /><meshPhysicalMaterial color={index===1?'#d6b070':index===2?'#c7cbd0':'#090a0c'} metalness={.68} roughness={.2} clearcoat={.24} /></mesh><mesh position={[0,.026,0]}><cylinderGeometry args={[.1,.1,.05,24]} /><Brass color={GOLD} /></mesh></group>)}<mesh position={[0,-1.08,0]}><boxGeometry args={[.12,.08,1.72]} /><meshPhysicalMaterial color={WALNUT} metalness={.18} roughness={.32} /></mesh></group>; }
function JewelCase() { return <group name="lara-jewelry-sunglasses-perfume" position={[.37,-.55,0]}><mesh position={[0,-.94,0]}><boxGeometry args={[.14,.18,1.72]} /><meshPhysicalMaterial color="#171216" metalness={.3} roughness={.62} /></mesh><mesh position={[.02,.18,-.48]} scale={[.18,.36,.22]}><sphereGeometry args={[1,22,16]} /><meshStandardMaterial color="#171316" roughness={.9} /></mesh><mesh position={[.05,.36,-.48]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.3,.018,10,30]} /><Brass color={GOLD} /></mesh>{[-.2,.2].map((z)=><mesh key={z} position={[.02,.45,z+.36]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.16,.026,8,24]} /><meshPhysicalMaterial color="#090a0c" metalness={.74} roughness={.18} /></mesh>)}<mesh position={[.02,.43,.36]}><boxGeometry args={[.035,.028,.42]} /><Brass color={GOLD} /></mesh><mesh position={[0,-.32,.5]}><cylinderGeometry args={[.14,.18,.44,28]} /><meshPhysicalMaterial color="#2b1911" metalness={.32} roughness={.16} clearcoat={.68} /></mesh><mesh position={[0,-.06,.5]}><cylinderGeometry args={[.09,.09,.12,24]} /><Brass color={GOLD} /></mesh></group>; }
function Awards() { return <group name="lara-microphones-awards-and-tickets" position={[.37,-.58,0]}>{[-.5,.05,.56].map((z,index)=><group key={z} position={[0,-.35+index*.3,z]}><mesh><cylinderGeometry args={[.19,.24,.12,28]} /><Stone color="#181a1c" /></mesh><mesh position={[0,.32,0]}><capsuleGeometry args={[.11,.35,8,16]} /><Brass color={index===1?'#deb876':GOLD} /></mesh></group>)}<mesh position={[0,.78,-.58]}><cylinderGeometry args={[.045,.06,.78,20]} /><Brass /></mesh><mesh position={[0,1.25,-.58]}><capsuleGeometry args={[.12,.24,8,16]} /><meshPhysicalMaterial color="#ded7ce" metalness={.84} roughness={.23} /></mesh></group>; }
function Boots() { return <group name="lara-stage-boots-and-fashion-sketches" position={[.37,-.7,0]}>{[-.35,.25].map((z)=><group key={z} position={[0,-.1,z]}><mesh position={[0,.08,.12]}><boxGeometry args={[.22,.18,.52]} /><meshPhysicalMaterial color="#0d0f11" metalness={.32} roughness={.5} clearcoat={.16} /></mesh><mesh position={[0,.52,-.06]}><boxGeometry args={[.18,.76,.25]} /><meshPhysicalMaterial color="#141316" metalness={.24} roughness={.56} /></mesh><mesh position={[0,.1,-.2]}><boxGeometry args={[.18,.06,.14]} /><Brass color={GOLD} /></mesh></group>)}</group>; }

function ClawAndIvy() { return <group name="lara-bronze-claw-sculpture-and-ivy" position={[0,1.72,ROOM.backWallZ+.62]}>{[-.55,0,.55].map((x,index)=><mesh key={x} position={[x,.32,0]} rotation={[0,0,index===1?0:index?-.2:.2]}><torusGeometry args={[.26,.045,10,36,Math.PI]} /><Brass color={GOLD} /></mesh>)}{[-1,1].map((side)=><group key={side} position={[side*2.45,-.55,.04]}>{[0,.35,.7,1.05].map((y,index)=><group key={y} position={[0,y,0]}><mesh position={[side*.07,.03,0]} scale={[.08,.17,.05]} rotation={[0,0,side*.5]}><sphereGeometry args={[1,14,10]} /><meshStandardMaterial color={index%2?'#304226':'#22351d'} roughness={.84} /></mesh><mesh position={[-side*.07,.12,0]} scale={[.07,.15,.05]} rotation={[0,0,-side*.45]}><sphereGeometry args={[1,14,10]} /><meshStandardMaterial color="#3a522b" roughness={.84} /></mesh></group>)}</group>)}</group>; }

function GrandStage() { const z=ROOM.backWallZ+1.22; return <group name="lara-grand-circular-exhibition-pedestal"><mesh position={[0,2.47,ROOM.backWallZ+.16]}><boxGeometry args={[7.9,4.75,.26]} /><Stone color="#171a1d" /></mesh><mesh position={[0,2.48,ROOM.backWallZ+.32]}><boxGeometry args={[5.86,3.58,.08]} /><Velvet /></mesh><mesh position={[0,2.48,ROOM.backWallZ+.39]}><boxGeometry args={[4.95,2.78,.04]} /><Stone color="#121316" /></mesh><ClawAndIvy /><mesh position={[0,.2,z]}><cylinderGeometry args={[2.62,2.82,.34,80]} /><Stone /></mesh><mesh position={[0,.4,z]}><cylinderGeometry args={[2.2,2.44,.09,80]} /><Brass color="#543827" /></mesh><mesh position={[0,.49,z]}><cylinderGeometry args={[1.8,2.04,.14,80]} /><Stone color="#181a1c" /></mesh><mesh position={[0,.58,z]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.66,.034,10,80]} /><Brass color={GOLD} /></mesh><mesh position={[0,.65,z]}><cylinderGeometry args={[.31,.37,.1,40]} /><Stone color="#1a1c1f" /></mesh><mesh position={[0,1.4,z]}><cylinderGeometry args={[.035,.052,1.45,22]} /><Brass /></mesh><mesh position={[0,2.15,z]}><capsuleGeometry args={[.12,.24,8,18]} /><meshPhysicalMaterial color="#ded7ce" metalness={.84} roughness={.23} /></mesh><group position={[0,2.75,ROOM.backWallZ+.48]} rotation={[0,Math.PI/2,0]}><ArtTexture title="LARA" subtitle="THE PRIVATE MUSEUM" glow /></group><pointLight position={[0,.82,z+.25]} color="#f5bb71" intensity={3.2} distance={5} decay={1.65} /></group>; }

function MuseumWalls() { return <group name="lara-unique-wall-museum-sections"><LaraPortrait side={-1} z={5.45} label="editorial" /><MuseumCase side={-1} z={1.25} width={2.1} height={3.95} title="jewelry archive"><JewelCase /></MuseumCase><MuseumCase side={-1} z={-3.05} width={2.55} height={4.18} title="stage wardrobe" velvet><Wardrobe /></MuseumCase><MuseumCase side={-1} z={-7.05} width={1.72} height={3.7} title="fashion sketch"><Boots /></MuseumCase><MuseumCase side={1} z={5.35} width={2.55} height={4.2} title="platinum archive"><MusicArchive /></MuseumCase><LaraPortrait side={1} z={1.05} label="magazine-cover" /><MuseumCase side={1} z={-3.35} width={2.3} height={3.95} title="concert archive"><Awards /></MuseumCase><MuseumCase side={1} z={-7.0} width={1.8} height={3.55} title="lyrics archive" velvet><MusicArchive /></MuseumCase></group>; }

export default function LaraFinalMuseum() { return <group name="lara-fifty-million-fashion-museum"><NeroMarquinaFloor /><LaraRunnerCarpet /><HotelCeiling /><MuseumWalls /><GrandStage /><MuseumLighting /></group>; }
