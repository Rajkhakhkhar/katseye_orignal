import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadRoomAssets } from './components/room/roomAssetPreload';
import './lightstick.css';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const memberCards = [
  ['Yoonchae', 'Soothing Shell', '/charm-card-backs/yoonchae.png'],
  ['Sophia', 'Dream Anchor', '/charm-card-backs/sophia.png'],
  ['Megan', 'Dual Cherry', '/charm-card-backs/megan.png'],
  ['Daniela', 'Guardian Shield', '/charm-card-backs/daniela.png'],
  ['Lara', 'Limitless Key', '/charm-card-backs/lara.png'],
  ['Manon', 'Stellar Tiara', '/charm-card-backs/manon.png'],
];

// This configuration is the clean hand-off point for each future member
// universe. Later prompts can replace `destination: 'placeholder'` without
// changing the hall, portal interactions, or the other members' worlds.
const universePortals = [
  { id: 'lara', name: 'Lara', symbol: 'key', color: '#e7edf7', destination: 'lara' },
  { id: 'daniela', name: 'Daniela', symbol: 'shield', color: '#e7edf7', destination: 'placeholder' },
  { id: 'megan', name: 'Megan', symbol: 'cherry', color: '#e7edf7', destination: 'placeholder' },
  { id: 'yoonchae', name: 'Yoonchae', symbol: 'shell', color: '#e7edf7', destination: 'placeholder' },
  { id: 'manon', name: 'Manon', symbol: 'tiara', color: '#e7edf7', destination: 'placeholder' },
  { id: 'sophia', name: 'Sophia', symbol: 'anchor', color: '#e7edf7', destination: 'placeholder' },
];

function CrackLines({ visible }) {
  const lines = useMemo(() => [
    [[0.02, 3.27, 0.72], [0.16, 3.04, 0.82], [0.07, 2.82, 0.86]],
    [[0.16, 3.04, 0.82], [0.42, 3.12, 0.66], [0.50, 2.94, 0.57]],
    [[0.07, 2.82, 0.86], [-0.13, 2.68, 0.79], [-0.19, 2.49, 0.66]],
  ], []);
  return <group visible={visible}>{lines.map((points, index) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map((point) => new THREE.Vector3(...point)));
    return <line geometry={geometry} key={index}><lineBasicMaterial color="#f5ebff" transparent opacity={0.9} /></line>;
  })}</group>;
}

function ImpactParticles({ progressRef, frozen }) {
  const positions = useMemo(() => {
    const values = [];
    for (let index = 0; index < 56; index += 1) {
      const angle = index * 2.399;
      const radius = 0.18 + (index % 7) * 0.055;
      values.push(Math.cos(angle) * radius, 2.95 + ((index % 5) * 0.12), Math.sin(angle) * radius);
    }
    return new Float32Array(values);
  }, []);
  const ref = useRef();
  useFrame(() => {
    const intensity = clamp(((frozen ? 1 : progressRef.current) - 0.95) / 0.05);
    if (ref.current) {
      ref.current.visible = intensity > 0.01;
      ref.current.material.opacity = intensity * 0.86;
    }
  });
  return <points ref={ref} visible={frozen}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#f4edff" size={0.042} sizeAttenuation transparent opacity={0} depthWrite={false} /></points>;
}

function Atmosphere() {
  const positions = useMemo(() => {
    const values = [];
    for (let index = 0; index < 130; index += 1) values.push(((index * 37) % 17 - 8) * 0.8, ((index * 29) % 80 - 40) * 0.1, ((index * 17) % 10) - 5);
    return new Float32Array(values);
  }, []);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#c4d5ef" transparent opacity={0.24} size={0.025} sizeAttenuation depthWrite={false} /></points>;
}

function FluidField() {
  const group = useRef();
  const ribbons = useMemo(() => {
    const paths = [
      [[-7.4, 1.8, -2.8], [-4.8, 2.9, -2.8], [-1.5, -0.25, -2.8], [2.1, 2.3, -2.8], [7.5, 1.1, -2.8]],
      [[-7.2, -1.9, -3.1], [-4.2, -3.1, -3.1], [-1.2, -0.25, -3.1], [2.5, -2.7, -3.1], [7.4, -1.1, -3.1]],
      [[-6.8, 0.1, -3.5], [-3.6, -1.1, -3.5], [0.1, 1.2, -3.5], [3.8, -0.55, -3.5], [7.0, 0.5, -3.5]],
    ];
    return paths.map((points, index) => ({
      geometry: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))), 80, index === 1 ? 0.032 : 0.024, 8, false),
      opacity: index === 1 ? 0.46 : 0.31,
    }));
  }, []);
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.position.x = Math.sin(time * 0.16) * 0.35;
    group.current.position.y = Math.cos(time * 0.19) * 0.22;
    group.current.rotation.z = Math.sin(time * 0.11) * 0.025;
  });
  return <group ref={group}>{ribbons.map(({ geometry, opacity }, index) => <mesh geometry={geometry} key={index} renderOrder={-2}>
    <meshBasicMaterial color="#ffffff" transparent opacity={opacity} depthWrite={false} />
  </mesh>)}</group>;
}

function PortalSymbol({ symbol, active }) {
  const material = <meshPhysicalMaterial color="#eef2f8" emissive="#aeb8ca" emissiveIntensity={active ? .72 : .14} metalness={.96} roughness={.1} clearcoat={1} clearcoatRoughness={.04} envMapIntensity={2.1} />;
  if (symbol === 'shield') return <group scale={[0.72, 0.9, 0.3]}><mesh><octahedronGeometry args={[0.56, 0]} />{material}</mesh><mesh position={[0, 0.04, 0.45]} scale={[0.36, 0.36, 0.12]}><octahedronGeometry args={[0.42, 0]} />{material}</mesh></group>;
  if (symbol === 'key') return <group rotation={[0, 0, -0.36]}><mesh position={[0, 0.3, 0]}><torusGeometry args={[0.24, 0.055, 10, 28]} />{material}</mesh><mesh position={[0, -0.18, 0]} scale={[0.11, 0.62, 0.11]}><boxGeometry args={[1, 1, 1]} />{material}</mesh><mesh position={[0.22, -0.52, 0]} scale={[0.34, 0.11, 0.11]}><boxGeometry args={[1, 1, 1]} />{material}</mesh></group>;
  if (symbol === 'tiara') return <group position={[0, -0.12, 0]}>{[-0.34, 0, 0.34].map((x, index) => <mesh key={x} position={[x, index === 1 ? 0.28 : 0.06, 0]} scale={[0.17, index === 1 ? 0.62 : 0.42, 0.12]}><coneGeometry args={[1, 1, 5]} />{material}</mesh>)}<mesh position={[0, -0.28, 0]} scale={[0.7, 0.13, 0.12]}><torusGeometry args={[1, 0.34, 8, 32, Math.PI]} />{material}</mesh></group>;
  if (symbol === 'cherry') return <group><mesh position={[-0.22, -0.12, 0]}><sphereGeometry args={[0.28, 20, 20]} />{material}</mesh><mesh position={[0.23, -0.12, 0]}><sphereGeometry args={[0.28, 20, 20]} />{material}</mesh><mesh position={[0.02, 0.28, 0]} rotation={[0, 0, -0.45]} scale={[0.06, 0.5, 0.06]}><cylinderGeometry args={[1, 1, 1, 10]} />{material}</mesh></group>;
  if (symbol === 'anchor') return <group><mesh position={[0, 0.04, 0]} scale={[0.1, 0.72, 0.1]}><cylinderGeometry args={[1, 1, 1, 14]} />{material}</mesh><mesh position={[0, 0.53, 0]}><torusGeometry args={[0.2, 0.05, 10, 28]} />{material}</mesh><mesh position={[0, -0.45, 0]} scale={[0.56, 0.1, 0.1]}><boxGeometry args={[1, 1, 1]} />{material}</mesh></group>;
  return <group><mesh scale={[0.58, 0.72, 0.2]}><sphereGeometry args={[0.55, 20, 20]} />{material}</mesh>{[-0.22, 0, 0.22].map((x) => <mesh key={x} position={[x, 0.08, 0.18]} scale={[0.035, 0.42, 0.04]}><boxGeometry args={[1, 1, 1]} />{material}</mesh>)}</group>;
}

function UniversePortal({ portal, position, active, onHover, onLeave, onSelect }) {
  const group = useRef();
  const inner = useRef();
  const glow = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(time * 0.64 + position[0]) * 0.07;
    const targetScale = active ? 1.08 : 1;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 10, delta));
    if (inner.current) inner.current.rotation.z = time * (active ? .12 : .045);
    if (glow.current) glow.current.intensity = THREE.MathUtils.damp(glow.current.intensity, active ? 3.4 : .85, 10, delta);
  });
  return <group ref={group} position={position}>
    <pointLight ref={glow} color="#ffffff" intensity={.85} distance={4.7} />
    <group onPointerOver={(event) => { event.stopPropagation(); onHover(portal.id); }} onPointerOut={onLeave} onClick={(event) => { event.stopPropagation(); onSelect(portal); }}>
      <mesh scale={[1, 1.28, 1]}>
        <torusGeometry args={[1.04, active ? .1 : .073, 14, 64]} />
        <meshPhysicalMaterial color="#edf2f9" emissive="#b9c4d8" emissiveIntensity={active ? .58 : .1} metalness={.96} roughness={.11} clearcoat={1} clearcoatRoughness={.04} envMapIntensity={2.15} />
      </mesh>
      <mesh scale={[.93, 1.2, 1]}>
        <circleGeometry args={[1, 48]} />
        <meshPhysicalMaterial color="#d9e1ee" transparent opacity={active ? .21 : .09} transmission={.18} roughness={.12} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <group ref={inner} position={[0, 0, .1]}><PortalSymbol symbol={portal.symbol} active={active} /></group>
    </group>
  </group>;
}

function PortalHall({ hovered, setHovered, onSelect }) {
  const { size } = useThree();
  const narrow = size.width < 720;
  const positions = narrow
    ? [[-1.5, 2.35, 0], [1.5, 2.35, 0], [-1.5, 0, 0], [1.5, 0, 0], [-1.5, -2.35, 0], [1.5, -2.35, 0]]
    : [[-4.1, 1.65, 0], [0, 1.82, 0], [4.1, 1.65, 0], [-4.1, -1.65, 0], [0, -1.82, 0], [4.1, -1.65, 0]];
  return <>
    <ambientLight intensity={.42} /><directionalLight position={[2.8, 5.2, 5]} color="#ffffff" intensity={1.7} /><pointLight position={[-4, 1.8, 4]} color="#dce8ff" intensity={.85} distance={10} /><pointLight position={[4, -1.5, 3]} color="#ffffff" intensity={.72} distance={9} />
    {universePortals.map((portal, index) => <UniversePortal key={portal.id} portal={portal} position={positions[index]} active={hovered === portal.id} onHover={setHovered} onLeave={() => setHovered(null)} onSelect={onSelect} />)}
  </>;
}

function UniverseHub({ onMemberSelect, sectionRef }) {
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    // All six rooms are part of the same experience. Warm their code, gallery
    // textures, and shared material maps while visitors explore the earlier
    // chapters instead of starting that work at the doorway.
    const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 120));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const task = schedule(() => preloadRoomAssets(), { timeout: 1200 });
    return () => cancel(task);
  }, []);
  const enterPortal = (portal) => {
    onMemberSelect?.(portal);
  };
  return <section ref={sectionRef} className="afterglow-section universe-hub door-handoff-pending" aria-label="Entrance to the six Katseye universes">
    <div className="universe-hub-stage">
      <Canvas className="universe-hub-canvas" camera={{ position: [0, 0, 12.5], fov: 45 }} dpr={[1, 1.75]} shadows gl={{ antialias: true }}>
        <PortalHall hovered={hovered} setHovered={(id) => { preloadRoomAssets(); setHovered(id); }} onSelect={enterPortal} />
      </Canvas>
      <div className="universe-hub-ribbons" aria-hidden="true"><i /><i /><i /></div>
      <div className="universe-symbol-labels" aria-live="polite">{universePortals.map((portal, index) => <span className={hovered === portal.id ? 'is-visible' : ''} style={{ '--symbol-slot': index }} key={portal.id}>{portal.name.toUpperCase()}</span>)}</div>
    </div>
  </section>;
}

const laraTrees = [
  [-5.2, -2.65, -2.5, 1.5], [-3.55, -2.55, -1.2, 1.08], [-1.55, -2.75, -3.4, 1.35],
  [2.45, -2.7, -3.1, 1.55], [4.65, -2.58, -1.5, 1.22], [5.65, -2.86, -3.7, 1.75], [0.65, -2.7, -4.2, 1.2],
];

function LaraCamera() {
  const { camera, pointer } = useThree();
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x += (((pointer.x * 0.42) + Math.sin(time * 0.18) * 0.16) - camera.position.x) * 0.022;
    camera.position.y += ((0.18 + Math.cos(time * 0.22) * 0.08 + pointer.y * 0.12) - camera.position.y) * 0.022;
    camera.lookAt(0, -0.35, 0);
  });
  return null;
}

function LaraTree({ position }) {
  const [x, y, z, scale] = position;
  const leaves = useMemo(() => [-0.68, -0.25, 0.28, 0.7], []);
  return <group position={[x, y, z]} scale={scale}>
    <mesh position={[0, 1.55, 0]}><cylinderGeometry args={[0.19, 0.38, 3.7, 10]} /><meshStandardMaterial color="#150c23" metalness={0.42} roughness={0.66} /></mesh>
    <mesh position={[0, 2.2, 0]} rotation={[0.14, .18, 0]}><torusGeometry args={[.62, .035, 6, 34]} /><meshStandardMaterial color="#8b55cf" emissive="#6d2ca9" emissiveIntensity={.45} metalness={.8} roughness={.24} /></mesh>
    {leaves.map((offset, index) => <group key={offset} position={[offset * .62, 3.2 + (index % 2) * .36, -.1 + (index % 3) * .18]} rotation={[.25 * index, .3 * index, offset * .55]}>
      <mesh scale={[.86, .48, .18]}><sphereGeometry args={[1, 14, 12]} /><meshStandardMaterial color={index % 2 ? '#251038' : '#1b0b2d'} emissive="#3b1165" emissiveIntensity={.16} metalness={.46} roughness={.45} /></mesh>
      <mesh position={[0, 0, .17]} scale={[.5, .025, .02]}><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="#cf9bff" transparent opacity={.22} /></mesh>
    </group>)}
  </group>;
}

function LaraParticles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const values = [];
    for (let index = 0; index < 260; index += 1) values.push(((index * 37) % 37 - 18) * .34, ((index * 29) % 40 - 18) * .21, -4.5 + (index % 13) * .38);
    return new Float32Array(values);
  }, []);
  useFrame((state) => { if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * .016; ref.current.position.y = Math.sin(state.clock.elapsedTime * .16) * .12; } });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#d9b4ff" transparent opacity={.65} size={.026} sizeAttenuation depthWrite={false} /></points>;
}

function MoonRays() {
  const group = useRef();
  useFrame((state) => { if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * .08) * .035; });
  return <group ref={group} position={[0, 1.7, -4.8]}>
    {[-2.6, 0, 2.6].map((x, index) => <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, index === 1 ? 0 : (index ? -.22 : .22)]}><planeGeometry args={[1.3, 9]} /><meshBasicMaterial color="#b26eff" transparent opacity={.045} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>)}
  </group>;
}

function LaraPresence() {
  const presence = useRef();
  useFrame((state) => {
    if (!presence.current) return;
    const phase = state.clock.elapsedTime % 16;
    presence.current.visible = phase > 3.8 && phase < 10.2;
    presence.current.position.x = -2.15 + Math.sin(state.clock.elapsedTime * .65) * .22;
    presence.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.1) * .14;
  });
  return <group ref={presence} position={[-2.2, -1.65, -4.35]}>
    <mesh position={[0, .88, 0]} scale={[.45, 1.5, .16]}><capsuleGeometry args={[1, 1, 8, 16]} /><meshBasicMaterial color="#15061f" transparent opacity={.72} /></mesh>
    <mesh position={[-.42, .5, 0]} rotation={[0, 0, .6]} scale={[.17, .8, .12]}><capsuleGeometry args={[1, 1, 6, 12]} /><meshBasicMaterial color="#1e0830" transparent opacity={.58} /></mesh>
    <pointLight color="#c36bff" intensity={1.1} distance={3} />
  </group>;
}

function Butterfly({ position, index, onDiscover }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime * (1 + index * .08);
    ref.current.position.x = position[0] + Math.sin(time * .8 + index) * .42;
    ref.current.position.y = position[1] + Math.cos(time * 1.4 + index) * .25;
    ref.current.rotation.y = Math.sin(time * 3.5) * .7;
  });
  return <group ref={ref} position={position} onClick={(event) => { event.stopPropagation(); onDiscover('A small laugh moves through the leaves.'); }}>
    <mesh position={[-.09, 0, 0]} rotation={[0, .38, .18]} scale={[.17, .11, .02]}><circleGeometry args={[1, 16]} /><meshBasicMaterial color="#ecb0ff" transparent opacity={.9} /></mesh>
    <mesh position={[.09, 0, 0]} rotation={[0, -.38, -.18]} scale={[.17, .11, .02]}><circleGeometry args={[1, 16]} /><meshBasicMaterial color="#9560ff" transparent opacity={.9} /></mesh>
  </group>;
}

function VocalMic({ onDiscover }) {
  const group = useRef();
  const [active, setActive] = useState(false);
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.position.y = -1.85 + Math.sin(time * 1.2) * .06;
    group.current.rotation.y = Math.sin(time * .42) * .16;
  });
  return <group ref={group} position={[1.65, -1.85, .5]} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)} onClick={(event) => { event.stopPropagation(); onDiscover('The microphone answers with a violet vocal signal.'); }}>
    <pointLight color="#cb8cff" intensity={active ? 5 : 2.15} distance={5} />
    <mesh position={[0, .45, 0]}><sphereGeometry args={[.34, 22, 16]} /><meshPhysicalMaterial color="#d9c4ff" emissive="#8f45f0" emissiveIntensity={active ? 2.2 : .7} metalness={.8} roughness={.14} /></mesh>
    <mesh position={[0, -.28, 0]}><cylinderGeometry args={[.12, .18, 1.15, 20]} /><meshStandardMaterial color="#9f92ad" metalness={.9} roughness={.18} /></mesh>
    <mesh position={[0, -1.04, 0]} scale={[.7, .08, .7]}><cylinderGeometry args={[1, 1, 1, 28]} /><meshStandardMaterial color="#1c0c2c" metalness={.75} roughness={.28} /></mesh>
    {[.52, .78, 1.05].map((scale) => <mesh key={scale} rotation={[Math.PI / 2, 0, 0]} scale={active ? scale * 1.2 : scale} position={[0, .45, -.04]}><torusGeometry args={[.5, .012, 6, 32]} /><meshBasicMaterial color="#d4a2ff" transparent opacity={active ? .55 : .16} /></mesh>)}
  </group>;
}

function FloatingMemory({ position, index, onDiscover }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime + index * 2;
    ref.current.position.y = position[1] + Math.sin(time * .6) * .18;
    ref.current.rotation.y = time * .22;
    ref.current.scale.setScalar(.86 + Math.sin(time * .8) * .08);
  });
  return <group ref={ref} position={position} onClick={(event) => { event.stopPropagation(); onDiscover('A memory materialises, then dissolves into light.'); }}>
    <mesh scale={[.58, .78, .08]}><octahedronGeometry args={[1, 1]} /><meshPhysicalMaterial color="#a15fff" emissive="#6a2cc5" emissiveIntensity={.8} transparent opacity={.52} roughness={.16} metalness={.38} /></mesh>
    <mesh scale={[.32, .43, .1]}><circleGeometry args={[1, 24]} /><meshBasicMaterial color="#f4d7ff" transparent opacity={.55} /></mesh>
  </group>;
}

function LaraWorld({ onDiscover }) {
  return <>
    <LaraCamera /><LaraParticles /><MoonRays /><LaraPresence />
    <ambientLight color="#7651a2" intensity={.34} /><directionalLight position={[-4, 7, 4]} color="#cda7ff" intensity={1.25} />
    <spotLight position={[1, 7, 3]} color="#ba63ff" intensity={3.1} angle={.52} penumbra={1} distance={18} />
    <mesh position={[0, -2.72, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 19]} /><meshStandardMaterial color="#0b0614" metalness={.58} roughness={.34} /></mesh>
    <mesh position={[0, -.06, -6.2]}><planeGeometry args={[24, 15]} /><meshBasicMaterial color="#10071b" /></mesh>
    {laraTrees.map((tree, index) => <LaraTree key={index} position={tree} />)}
    <VocalMic onDiscover={onDiscover} />
    <Butterfly position={[-2.8, 1.55, .7]} index={1} onDiscover={onDiscover} /><Butterfly position={[2.8, .62, -.3]} index={2} onDiscover={onDiscover} /><Butterfly position={[.35, 2.16, -1.7]} index={3} onDiscover={onDiscover} />
    <FloatingMemory position={[-1.2, .55, -1.5]} index={1} onDiscover={onDiscover} /><FloatingMemory position={[3.45, 1.1, -2.8]} index={2} onDiscover={onDiscover} /><FloatingMemory position={[-4.05, .55, -3]} index={3} onDiscover={onDiscover} />
  </>;
}

function LaraUniverse({ onExit }) {
  const [arriving, setArriving] = useState(true);
  const [discovery, setDiscovery] = useState('');
  useEffect(() => { const timer = window.setTimeout(() => setArriving(false), 1500); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (!discovery) return undefined; const timer = window.setTimeout(() => setDiscovery(''), 3200); return () => window.clearTimeout(timer); }, [discovery]);
  return <section className="lara-universe" aria-label="Lara's immersive universe">
    <Canvas className="lara-universe-canvas" camera={{ position: [0, .18, 12.4], fov: 47 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color attach="background" args={['#0d0617']} /><fog attach="fog" args={['#0d0617', 5.8, 18]} />
      <LaraWorld onDiscover={setDiscovery} />
    </Canvas>
    <div className="lara-universe-vignette" aria-hidden="true" />
    <div className="lara-universe-title"><span>LARA / 01</span><strong>THE PURPLE WILD</strong><i /></div>
    <button className="universe-return" onClick={onExit} aria-label="Return to the six universe hall">RETURN TO THE HALL</button>
    <div className="lara-whisper" aria-live="polite">{discovery}</div>
    <div className={`lara-arrival ${arriving ? 'is-arriving' : ''}`} aria-hidden="true"><span>ENTERING LARA'S UNIVERSE</span></div>
  </section>;
}

function Platform({ progressRef, frozen }) {
  const material = useRef();
  const group = useRef();
  useFrame(() => {
    const vanish = frozen ? 1 : clamp((progressRef.current - 0.18) / 0.06);
    if (material.current) material.current.opacity = 1 - vanish;
    if (group.current) {
      group.current.position.x = -3.3 - vanish * 1.4;
      // The platform is a Section 3-only object. It cannot remain under the
      // lightstick during the free-fall / impact sections.
      group.current.visible = vanish < 0.98;
    }
  });
  return <group ref={group} position={[-3.3, -3.33, 0]}>
    <mesh receiveShadow><boxGeometry args={[2.15, 0.14, 1.08]} /><meshStandardMaterial ref={material} color="#1f4348" metalness={0.7} roughness={0.28} transparent /></mesh>
    <mesh position={[0, 0.11, 0]}><boxGeometry args={[2.19, 0.04, 1.12]} /><meshStandardMaterial color="#91d8cf" emissive="#4daaa2" emissiveIntensity={0.4} transparent opacity={0.75} /></mesh>
  </group>;
}

function Ground({ progressRef, frozen }) {
  const material = useRef();
  useFrame(() => { if (material.current) material.current.opacity = clamp(((frozen ? 1 : progressRef.current) - 0.9) / 0.05); });
  return <group position={[0, -3.75, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[30, 22]} /><meshStandardMaterial ref={material} color="#142b30" metalness={0.24} roughness={0.86} transparent opacity={frozen ? 1 : 0} /></mesh>
    <mesh position={[0, -0.08, 0]} receiveShadow><boxGeometry args={[30, 0.16, 22]} /><meshStandardMaterial color="#091317" metalness={0.24} roughness={0.93} /></mesh>
  </group>;
}

function KatseyeModel() {
  const gltf = useLoader(GLTFLoader, '/katseye-lightstick.glb');
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    scene.traverse((object) => {
      if (!object.isMesh) return;
      // Keep the authored GLB materials intact.  The model's original dome,
      // star, body and details are what make it recognisable as a lightstick;
      // this sequence only animates it, never replaces it with a generic shape.
      object.castShadow = true;
      object.receiveShadow = true;
    });
    scene.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(scene);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    // The lightstick is the subject of the shot: it deliberately occupies most
    // of the frame, as in the storyboard, without clipping the initial pose.
    const scale = 7.7 / Math.max(size.y, 0.001);
    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return scene;
  }, [gltf]);
  return <primitive object={model} />;
}

function Lightstick({ progressRef, frozen = false }) {
  const group = useRef();
  const light = useRef();
  const cracks = useRef();
  useFrame((state) => {
    const progress = frozen ? 1 : progressRef.current;
    const releaseRaw = clamp((progress - 0.02) / 0.30);
    const release = releaseRaw * releaseRaw * (3 - 2 * releaseRaw);
    const loopRaw = clamp((progress - 0.25) / 0.46);
    const loop = loopRaw * loopRaw * (3 - 2 * loopRaw);
    const descentRaw = clamp((progress - 0.71) / 0.24);
    const descent = descentRaw * descentRaw * (3 - 2 * descentRaw);
    const impact = clamp((progress - 0.95) / 0.05);
    const idle = progress < 0.03 ? Math.sin(state.clock.elapsedTime * 1.25) * 0.018 : 0;
    // The first part of the scroll spends time on the platform: a light,
    // growing wobble communicates the loss of balance before it leaves.
    const wobbleProgress = clamp((progress - 0.025) / 0.22);
    const wobbleEnvelope = Math.sin(wobbleProgress * Math.PI);
    const wobble = Math.sin(wobbleProgress * Math.PI * 3.25) * wobbleEnvelope;
    if (group.current) {
      if (progress < 0.95) {
        // A single, wide airborne loop: it leaves on the left, travels across
        // the frame, circles back, then drops. This avoids a spinner-like
        // rotation at one point and makes the object itself draw the fall path.
        const loopAngle = -Math.PI / 2 + Math.PI * loop;
        const broadTurn = -Math.PI * 2 * (0.18 * loop + 0.82 * loop * loop);
        const baseTilt = -0.22 - 0.60 * release * release;
        const finalTilt = -Math.PI / 2 - 0.24;
        const settleTilt = (finalTilt + 0.82) * descent;
        if (loopRaw < 1) {
          group.current.position.x = loopRaw > 0 ? -0.1 + 1.55 * Math.sin(loopAngle) : -2.25 + 0.60 * release + wobble * 0.16;
          group.current.position.y = loopRaw > 0 ? 0.02 - 1.25 * loop + 0.34 * Math.cos(loopAngle) : 0.55 - 0.55 * release + Math.abs(wobble) * 0.035;
        } else {
          // Gravity makes the final Section 5 leg much faster than the loop.
          const gravity = 0.16 * descent + 0.84 * descent * descent;
          group.current.position.x = 1.45 - 0.30 * descent;
          group.current.position.y = -1.23 - 1.62 * gravity;
        }
        group.current.position.y += idle * 0.6;
        group.current.rotation.z = baseTilt + broadTurn + settleTilt + wobble * 0.16 - Math.sin(loop * Math.PI * 3) * 0.045 * (1 - descent) + idle;
        group.current.rotation.y = -Math.sin(loop * Math.PI) * 0.11 * (1 - descent);
      } else {
        // The head makes contact first; the handle then settles down with one
        // restrained, weighty movement rather than a rubbery bounce.
        const settle = impact * impact * (3 - 2 * impact);
        const contactBounce = Math.sin(impact * Math.PI) * 0.055 * (1 - impact);
        group.current.position.x = 1.15 - 0.14 * settle;
        group.current.position.y = -2.85 - 0.36 * settle + contactBounce;
        group.current.rotation.z = -Math.PI * 2 - Math.PI / 2 - 0.24 * (1 - settle) - Math.sin(impact * Math.PI * 2) * 0.024 * (1 - impact);
        group.current.rotation.y = 0;
      }
    }
    if (light.current) light.current.intensity = impact * 2.4;
    if (cracks.current) cracks.current.visible = impact > 0.01;
  });
  return <group ref={group}>
    <Suspense fallback={null}><KatseyeModel /></Suspense>
    <pointLight ref={light} position={[0, 3.15, 0.72]} color="#ffffff" intensity={0} distance={4.4} />
    <group ref={cracks} visible={frozen}><CrackLines visible /></group>
    <ImpactParticles progressRef={progressRef} frozen={frozen} />
  </group>;
}

function LightstickCanvas({ progressRef, frozen = false, className = '' }) {
  return <Canvas className={className} camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.75]} shadows gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={['#b6e5ee']} /><fog attach="fog" args={['#b6e5ee', 5, 18]} />
    <ambientLight intensity={0.88} /><directionalLight position={[3, 5, 4]} intensity={2.6} color="#f4fcff" castShadow /><pointLight position={[-3, 1, 3]} intensity={1.3} color="#94dce9" />
    <Atmosphere /><FluidField /><Platform progressRef={progressRef} frozen={frozen} /><Ground progressRef={progressRef} frozen={frozen} /><Lightstick progressRef={progressRef} frozen={frozen} />
  </Canvas>;
}

export default function LightstickExperience({ onMemberSelect }) {
  const sequenceRef = useRef();
  const pinRef = useRef();
  const galleryOverlayRef = useRef();
  const galleryTrackRef = useRef();
  const doorsRef = useRef();
  const progressRef = useRef(0);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const lightstickProgress = { value: 0 };
      const fallDuration = 3.6;
      const galleryDuration = 4.5;
      const settlingHold = 0.45;
      const totalDuration = fallDuration + galleryDuration + settlingHold;
      const finishHandoff = () => doorsRef.current?.classList.add('is-door-ready');
      const resetHandoff = () => doorsRef.current?.classList.remove('is-door-ready');
      sequenceRef.current?.style.setProperty('--lightstick-scroll-height', `${totalDuration * 100}vh`);
      gsap.set(galleryOverlayRef.current, { autoAlpha: 0 });
      const masterTimeline = gsap.timeline({ scrollTrigger: {
        // The wrapper contains three real, one-viewport sections.  Using their
        // measured height keeps the pin and the fall phases locked together.
        trigger: sequenceRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalDuration}`,
        pin: pinRef.current,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: finishHandoff,
        onEnterBack: resetHandoff,
        onRefresh: (trigger) => {
          if (trigger.progress >= .999) finishHandoff();
          else resetHandoff();
        },
        // The impact locks at 100% while the member cards take over the same
        // pinned scene, so the landed lightstick remains on screen throughout.
        onUpdate: (trigger) => { progressRef.current = Math.min(1, trigger.progress / (fallDuration / totalDuration)); },
      } });
      // One uninterrupted, scroll-scrubbed scene: fall → impact → cards.  The
      // cards cannot enter until the lightstick has fully landed.
      masterTimeline
        .to(lightstickProgress, { value: 1, duration: fallDuration, ease: 'none' })
        .set(galleryOverlayRef.current, { autoAlpha: 1 })
        .fromTo(galleryTrackRef.current,
          { x: () => window.innerWidth },
          { x: () => -galleryTrackRef.current.scrollWidth, duration: galleryDuration, ease: 'none' },
        )
        .to({}, { duration: settlingHold })
        .call(finishHandoff);
    });
    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refresh);
      doorsRef.current?.classList.remove('is-door-ready');
      sequenceRef.current?.style.removeProperty('--lightstick-scroll-height');
      context.revert();
    };
  }, []);

  return <>
    <div className="lightstick-transition" aria-label="Katseye lightstick fall sequence" ref={sequenceRef}>
      <div className="fall-pin-stage" ref={pinRef}>
        <LightstickCanvas progressRef={progressRef} className="lightstick-canvas" />
        <div className="lightstick-liquid" aria-hidden="true"><i /><i /><i /></div>
        <div className="lightstick-flow-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="impact-card-gallery" ref={galleryOverlayRef} aria-label="Katseye member cards">
          <div className="impact-card-rail" ref={galleryTrackRef}>
            {memberCards.map(([name, title, image], index) => <article className="impact-card" key={name} style={{ '--member-index': index }}>
              <div className="impact-card-inner">
                <div className="impact-card-face impact-card-front">
                  <img src="/charm-back.png" alt="KATSEYE charm card" />
                </div>
                <div className="impact-card-face impact-card-back">
                  <img src={image} alt={`${name}'s ${title} charm card`} />
                </div>
              </div>
            </article>)}
          </div>
        </div>
        <div className="lightstick-vignette" aria-hidden="true" />
      </div>
      <section className="lightstick-scene-section" id="signal" aria-label="Section 3: lightstick release" />
      <section className="lightstick-scene-section" id="section-4" aria-label="Section 4: lightstick rotations" />
      <section className="lightstick-scene-section" id="section-5" aria-label="Section 5: lightstick impact" />
    </div>
    <UniverseHub onMemberSelect={onMemberSelect} sectionRef={doorsRef} />
  </>;
}
