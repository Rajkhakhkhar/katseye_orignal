import { useLoader, } from '@react-three/fiber';
import * as THREE from 'three';
import DanielaIdentityArchitecture from './DanielaIdentityArchitecture';
import MemberStoryProps from './MemberStoryProps';
import danceRunner from '../../assets/room/daniela/daniela-burgundy-dance-runner.png';

const BRASS = '#bd9161';
const WARM = '#ffe1ba';

function Brass({ color = BRASS, roughness = .18 }) { return <meshPhysicalMaterial color={color} metalness={.92} roughness={roughness} clearcoat={.3} clearcoatRoughness={.08} />; }
function DarkStone() { return <meshPhysicalMaterial color="#111214" metalness={.62} roughness={.15} clearcoat={.82} clearcoatRoughness={.07} />; }

function DanielaRunner() {
  const map = useLoader(THREE.TextureLoader, danceRunner);
  map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
  return <group name="daniela-plush-burgundy-dance-runner">
    <mesh position={[0,.108,.15]} receiveShadow><boxGeometry args={[3.3,.06,15.9]} /><meshPhysicalMaterial color="#32131c" roughness={.9} metalness={.02} /></mesh>
    <mesh position={[0,.143,.15]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[3.17,15.72]} /><meshPhysicalMaterial map={map} color="#7b2636" roughness={.82} metalness={.02} clearcoat={.03} /></mesh>
    {[-1,1].map((side) => <mesh key={side} position={[side*1.6,.158,.15]}><boxGeometry args={[.032,.022,15.65]} /><Brass color="#815537" roughness={.32} /></mesh>)}
  </group>;
}

function Label({ title, line = 'DANIELA / PERFORMANCE ARCHIVE' }) {
  const canvas = document.createElement('canvas'); canvas.width = 800; canvas.height = 1000; const ctx = canvas.getContext('2d');
  ctx.fillStyle='#171214'; ctx.fillRect(0,0,800,1000); ctx.strokeStyle='#bf8d5e'; ctx.lineWidth=15; ctx.strokeRect(28,28,744,944); ctx.fillStyle='#e2b77d'; ctx.font='700 80px Georgia'; ctx.textAlign='center'; ctx.fillText('DANIELA',400,355); ctx.font='500 38px Arial'; ctx.fillStyle='#f4d5a2'; ctx.fillText(title,400,438); ctx.font='22px Arial'; ctx.fillStyle='#9f7350'; ctx.fillText(line,400,505); ctx.fillStyle='#733038'; ctx.fillRect(130,650,540,2); ctx.font='italic 28px Georgia'; ctx.fillStyle='#c79b65'; ctx.fillText('Movement • Passion • Discipline',400,725);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return <mesh position={[.335,0,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[1.05,1.32]} /><meshStandardMaterial map={texture} roughness={.52} /></mesh>;
}

function Showcase({ side, z, width, height, title, children }) {
  const rotation=side<0?[0,0,0]:[0,Math.PI,0];
  return <group name={`daniela-${title.toLowerCase().replaceAll(' ','-')}-showcase`} position={[side*3.66,height/2+.28,z]} rotation={rotation}>
    <mesh><boxGeometry args={[.58,height,width]} /><meshPhysicalMaterial color="#121316" metalness={.74} roughness={.22} clearcoat={.26} /></mesh>
    <mesh position={[.3,0,0]}><boxGeometry args={[.04,height-.25,width-.25]} /><meshPhysicalMaterial color="#32191e" metalness={.16} roughness={.65} /></mesh>
    <mesh position={[.335,0,0]}><boxGeometry args={[.018,height-.16,width-.14]} /><meshPhysicalMaterial color="#735447" transparent opacity={.25} transmission={.46} thickness={.08} ior={1.45} attenuationColor="#452f29" attenuationDistance={1.1} roughness={.05} clearcoat={.58} /></mesh>
    {[-1,1].map((edge) => <mesh key={edge} position={[.35,edge*(height/2-.1),0]}><boxGeometry args={[.025,.035,width-.18]} /><meshStandardMaterial color={WARM} emissive="#d98b43" emissiveIntensity={1.45} /></mesh>)}
    {[-.72,0,.72].filter((y)=>Math.abs(y)<height/2-.35).map((y)=><mesh key={y} position={[.32,y,0]}><boxGeometry args={[.04,.028,width-.3]} /><meshPhysicalMaterial color="#3d261d" metalness={.2} roughness={.36} /></mesh>)}
    <mesh position={[.35,-height/2+.15,0]}><boxGeometry args={[.06,.05,width-.18]} /><Brass /></mesh><Label title={title} />
    <group position={[.37,0,0]}>{children}</group>
  </group>;
}

function PerformanceWardrobe() { return <group name="daniela-stage-costumes-heels-and-gloves" position={[.37,-.55,0]}>{[-.62,0,.62].map((z,index)=><group key={z} position={[0,index*.48-.25,z]}><mesh><boxGeometry args={[.13,.25,.42]} /><meshPhysicalMaterial color={index===1?'#5f1d2e':'#1b1518'} metalness={.16} roughness={.68} /></mesh><mesh position={[.08,.14,0]}><boxGeometry args={[.025,.025,.33]} /><Brass /></mesh></group>)}{[-.3,.27].map((z)=><group key={z} position={[0,-.55,z]}><mesh position={[0,.08,.1]}><boxGeometry args={[.22,.16,.48]} /><meshPhysicalMaterial color="#161519" metalness={.28} roughness={.48} /></mesh><mesh position={[0,.48,-.06]}><boxGeometry args={[.18,.66,.23]} /><meshPhysicalMaterial color="#35151f" metalness={.22} roughness={.56} /></mesh><mesh position={[0,.1,-.18]}><boxGeometry args={[.18,.055,.14]} /><Brass /></mesh></group>)}</group>; }
function AwardsAndCertificates() { return <group name="daniela-trophies-medals-certificates" position={[.37,-.58,0]}>{[-.52,.04,.58].map((z,index)=><group key={z} position={[0,-.42+index*.3,z]}><mesh><cylinderGeometry args={[.18,.23,.11,28]} /><DarkStone /></mesh><mesh position={[0,.31,0]}><capsuleGeometry args={[.105,.34,8,16]} /><Brass color={index===1?'#e0b476':BRASS} /></mesh></group>)}<mesh position={[0,.92,-.62]}><boxGeometry args={[.08,.52,.58]} /><Brass color="#d6c6ad" roughness={.22} /></mesh><mesh position={[.055,.92,-.62]}><boxGeometry args={[.016,.4,.46]} /><meshPhysicalMaterial color="#20171a" metalness={.2} roughness={.58} /></mesh></group>; }
function ChoreographyArchive() { return <group name="daniela-choreography-notebooks-signed-albums" position={[.37,-.64,0]}>{[-.56,-.18,.2,.58].map((z,index)=><mesh key={z} position={[0,-.68+(index%2)*.58,z]}><boxGeometry args={[.13,.19,.25]} /><meshPhysicalMaterial color={index===2?'#7a2633':'#211719'} metalness={.14} roughness={.64} /></mesh>)}<mesh position={[0,.72,-.25]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.34,.34,.045,40]} /><meshPhysicalMaterial color="#171719" metalness={.44} roughness={.28} /></mesh><mesh position={[.026,.72,-.25]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.1,.1,.05,22]} /><Brass /></mesh><mesh position={[0,.72,.42]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.34,.34,.045,40]} /><meshPhysicalMaterial color="#d2c7bb" metalness={.78} roughness={.16} /></mesh></group>; }
function AccessoriesArchive() { return <group name="daniela-jewelry-perfume-sunglasses-accessories" position={[.37,-.58,0]}><mesh position={[0,-.96,0]}><boxGeometry args={[.14,.17,1.72]} /><meshPhysicalMaterial color="#181417" metalness={.3} roughness={.62} /></mesh><mesh position={[.03,.14,-.5]} scale={[.17,.35,.22]}><sphereGeometry args={[1,22,16]} /><meshStandardMaterial color="#171316" roughness={.9} /></mesh><mesh position={[.05,.32,-.5]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.29,.018,10,30]} /><Brass color="#e0b476" /></mesh>{[-.22,.22].map((z)=><mesh key={z} position={[.02,.4,z+.38]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.16,.026,8,24]} /><meshPhysicalMaterial color="#090a0c" metalness={.72} roughness={.18} /></mesh>)}<mesh position={[.02,.4,.38]}><boxGeometry args={[.035,.026,.44]} /><Brass /></mesh><mesh position={[0,-.34,.52]}><cylinderGeometry args={[.14,.18,.42,28]} /><meshPhysicalMaterial color="#351914" metalness={.3} roughness={.18} clearcoat={.66} /></mesh><mesh position={[0,-.08,.52]}><cylinderGeometry args={[.09,.09,.12,24]} /><Brass /></mesh></group>; }
function MinimalPlant({ side }) { return <group name={`daniela-minimal-plant-${side}`} position={[side*3.18,.1,-7.75]}><mesh position={[0,.16,0]}><cylinderGeometry args={[.2,.25,.32,24]} /><Brass color="#3e2d23" roughness={.36} /></mesh>{[-.3,-.1,.12,.31].map((x,index)=><mesh key={x} position={[x,.48+index*.05,0]} scale={[.1,.28,.06]} rotation={[0,0,x*.9]}><sphereGeometry args={[1,16,12]} /><meshStandardMaterial color={index%2?'#35472c':'#273a25'} roughness={.82} /></mesh>)}</group>; }

function DanielaMuseumCuration() { return <group name="daniela-asymmetric-performance-museum-curation"><Showcase side={-1} z={7.08} width={1.7} height={3.65} title="awards archive"><AwardsAndCertificates /></Showcase><Showcase side={-1} z={-6.62} width={2.05} height={3.9} title="stage wardrobe"><PerformanceWardrobe /></Showcase><Showcase side={1} z={7.02} width={1.82} height={3.75} title="dance archive"><ChoreographyArchive /></Showcase><Showcase side={1} z={-6.4} width={2.18} height={3.92} title="accessories archive"><AccessoriesArchive /></Showcase><MinimalPlant side={-1} /><MinimalPlant side={1} /></group>; }

export default function DanielaFinalMuseum() { return <><DanielaIdentityArchitecture /><DanielaRunner /><DanielaMuseumCuration /><MemberStoryProps member="daniela" /></>; }
