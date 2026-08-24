import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import './HeroExperience.css';

const clamp = (value) => Math.max(0, Math.min(1, value));
const damp = (speed, delta) => 1 - Math.exp(-speed * delta);

function useHeroProgress(containerRef, progressRef) {
  useEffect(() => {
    let active = true;
    const update = () => {
      if (!active) return;
      const element = containerRef.current;
      if (!element) return;
      progressRef.current = clamp(-element.getBoundingClientRect().top / Math.max(1, element.offsetHeight - window.innerHeight));
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    }, { rootMargin: '160px 0px' });
    if (containerRef.current) observer.observe(containerRef.current);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [containerRef, progressRef]);
}

function createMarkStar() {
  const points = [[0, 1.38], [-.15, .24], [-.92, .74], [-.29, .02], [-.91, -.72], [-.15, -.3], [0, -1.38], [.15, -.24], [.92, -.74], [.29, -.02], [.91, .72], [.15, .3]];
  const shape = new THREE.Shape();
  shape.moveTo(...points[0]);
  points.slice(1).forEach((point) => shape.lineTo(...point));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .18, bevelEnabled: true, bevelSegments: 3, bevelSize: .035, bevelThickness: .045, curveSegments: 12 });
  geometry.center();
  return geometry;
}

function IntegratedRings({ progressRef, interactionRef }) {
  const ringOne = useRef();
  const ringTwo = useRef();
  const ringOneMaterial = useRef();
  const ringTwoMaterial = useRef();
  useFrame((state, delta) => {
    const activity = interactionRef.current;
    const speed = 2.625 * (1 + progressRef.current * .18 + activity);
    const glint = .5 + Math.sin(state.clock.elapsedTime * 1.435) * .5;
    ringOne.current.rotation.y += delta * .092 * speed;
    ringOne.current.rotation.z += delta * .012 * speed;
    ringTwo.current.rotation.x -= delta * .074 * speed;
    ringTwo.current.rotation.z -= delta * .016 * speed;
    ringOneMaterial.current.emissiveIntensity = THREE.MathUtils.damp(ringOneMaterial.current.emissiveIntensity, .014 + activity * .045 + glint * .008, 4.8, delta);
    ringTwoMaterial.current.emissiveIntensity = THREE.MathUtils.damp(ringTwoMaterial.current.emissiveIntensity, .012 + activity * .04 + (1 - glint) * .007, 4.8, delta);
    ringOneMaterial.current.roughness = THREE.MathUtils.damp(ringOneMaterial.current.roughness, .05 - activity * .018, 4.8, delta);
    ringTwoMaterial.current.roughness = THREE.MathUtils.damp(ringTwoMaterial.current.roughness, .055 - activity * .018, 4.8, delta);
  });
  const chrome = { color: '#e0e5f1', emissive: '#171827', emissiveIntensity: .014, metalness: 1, roughness: .05, clearcoat: 1, clearcoatRoughness: .02, envMapIntensity: 2.45, iridescence: .32, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 460] };
  return <group name="integrated-mark-rings">
    <group ref={ringOne} rotation={[.76, .24, -.25]}><mesh><torusGeometry args={[1.39, .045, 14, 120]} /><meshPhysicalMaterial ref={ringOneMaterial} {...chrome} /></mesh></group>
    <group ref={ringTwo} rotation={[1.14, -.38, .52]}><mesh><torusGeometry args={[1.31, .036, 14, 120]} /><meshPhysicalMaterial ref={ringTwoMaterial} {...chrome} color="#d2dcec" /></mesh></group>
  </group>;
}

function SculptedLogo({ progressRef, interactionRef }) {
  const root = useRef();
  const starMaterial = useRef();
  const rimMaterial = useRef();
  const starGeometry = useMemo(createMarkStar, []);
  const scaleTarget = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => () => starGeometry.dispose(), [starGeometry]);
  useFrame((state, delta) => {
    const activity = interactionRef.current;
    const glint = .5 + Math.sin(state.clock.elapsedTime * 1.26) * .5;
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, Math.sin(state.clock.elapsedTime * .4725) * .025, 1.8, delta);
    root.current.position.y = Math.sin(state.clock.elapsedTime * .8925) * .045;
    const energy = 1 + activity * .026;
    root.current.scale.lerp(scaleTarget.setScalar(energy), damp(5.2, delta));
    starMaterial.current.emissiveIntensity = THREE.MathUtils.damp(starMaterial.current.emissiveIntensity, .016 + activity * .052 + glint * .008, 4.8, delta);
    rimMaterial.current.emissiveIntensity = THREE.MathUtils.damp(rimMaterial.current.emissiveIntensity, .012 + activity * .044 + (1 - glint) * .007, 4.8, delta);
    starMaterial.current.roughness = THREE.MathUtils.damp(starMaterial.current.roughness, .045 - activity * .016, 4.8, delta);
    rimMaterial.current.roughness = THREE.MathUtils.damp(rimMaterial.current.roughness, .05 - activity * .016, 4.8, delta);
  });
  const chrome = { color: '#e1e5ee', emissive: '#171827', emissiveIntensity: .016, metalness: 1, roughness: .045, clearcoat: 1, clearcoatRoughness: .02, envMapIntensity: 2.65, iridescence: .36, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 460] };
  return <group ref={root} name="katseye-sculpted-mark">
    <mesh position={[0, 0, -.13]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.42, 1.42, .1, 96]} /><meshPhysicalMaterial color="#8f99ad" metalness={1} roughness={.065} clearcoat={1} clearcoatRoughness={.02} envMapIntensity={2.25} iridescence={.22} iridescenceIOR={1.3} transparent opacity={.16} depthWrite={false} /></mesh>
    <mesh position={[0, 0, .02]}><torusGeometry args={[1.52, .07, 18, 160]} /><meshPhysicalMaterial ref={rimMaterial} {...chrome} color="#d7dce8" /></mesh>
    <IntegratedRings progressRef={progressRef} interactionRef={interactionRef} />
    <mesh position={[0, 0, .14]} castShadow receiveShadow><primitive object={starGeometry} attach="geometry" /><meshPhysicalMaterial ref={starMaterial} {...chrome} color="#dce1ec" side={THREE.DoubleSide} /></mesh>
  </group>;
}

function HeroWorld({ pointerRef, progressRef }) {
  const rig = useRef();
  const keyLight = useRef();
  const coolLight = useRef();
  const violetLight = useRef();
  const interactionRef = useRef(0);
  const rigScaleTarget = useMemo(() => new THREE.Vector3(), []);
  const { camera, gl, scene } = useThree();
  useEffect(() => {
    const previousEnvironment = scene.environment;
    const studio = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(gl);
    const environment = pmrem.fromScene(studio, .04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 1.15;
    return () => {
      scene.environment = previousEnvironment;
      environment.dispose();
      pmrem.dispose();
      studio.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
    };
  }, [gl, scene]);
  useFrame((state, delta) => {
    const { x, y, proximity } = pointerRef.current;
    const scroll = progressRef.current;
    const time = state.clock.elapsedTime;
    interactionRef.current = THREE.MathUtils.damp(interactionRef.current, proximity, 8, delta);
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .05, 2.6, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .04, 2.6, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .09, 2.4, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .055, 2.4, delta);
    const scale = 1 + scroll * .18;
    rig.current.scale.lerp(rigScaleTarget.setScalar(scale), damp(2.4, delta));
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.3 - scroll * .9, 2, delta);
    camera.lookAt(0, 0, 0);
    const energy = interactionRef.current;
    scene.environmentIntensity = THREE.MathUtils.damp(scene.environmentIntensity, 1.15 + energy * .28, 4.8, delta);
    gl.toneMappingExposure = THREE.MathUtils.damp(gl.toneMappingExposure, 1.1 + energy * .045, 4.8, delta);
    keyLight.current.position.x = THREE.MathUtils.damp(keyLight.current.position.x, 2.2 + Math.cos(time * 1.1025) * .55 + x * .8, 2.2, delta);
    keyLight.current.position.y = THREE.MathUtils.damp(keyLight.current.position.y, 2.1 + Math.sin(time * 1.1025) * .34 + y * .55, 2.2, delta);
    keyLight.current.intensity = THREE.MathUtils.damp(keyLight.current.intensity, 3.15 + energy * 1.05, 4.8, delta);
    coolLight.current.position.x = THREE.MathUtils.damp(coolLight.current.position.x, -2.55 + Math.sin(time * .81375) * .42, 1.8, delta);
    coolLight.current.position.y = THREE.MathUtils.damp(coolLight.current.position.y, -1.38 + Math.cos(time * .81375) * .28, 1.8, delta);
    coolLight.current.intensity = THREE.MathUtils.damp(coolLight.current.intensity, 1.25 + energy * .28, 4.8, delta);
    violetLight.current.position.x = THREE.MathUtils.damp(violetLight.current.position.x, .25 + Math.cos(time * 1.365) * .2, 1.8, delta);
    violetLight.current.intensity = THREE.MathUtils.damp(violetLight.current.intensity, .86 + energy * .22, 4.8, delta);
    scene.fog.density = THREE.MathUtils.damp(scene.fog.density, .03 + scroll * .01, 2, delta);
  });
  return <>
    <fogExp2 attach="fog" args={['#07091b', .03]} />
    <ambientLight color="#c6c8e4" intensity={.34} />
    <directionalLight position={[0, 1.8, 4]} color="#fff8ff" intensity={2.15} />
    <directionalLight position={[-3, .5, 2]} color="#9ee8f0" intensity={.48} />
    <pointLight ref={keyLight} position={[2.4, 2.3, 3]} color="#fff1ff" intensity={3.15} distance={9} decay={2} />
    <pointLight ref={coolLight} position={[-2.5, -1.6, 2.5]} color="#72e5ef" intensity={1.25} distance={7} decay={2} />
    <pointLight ref={violetLight} position={[.2, -2.5, 2]} color="#c487ef" intensity={.86} distance={6} decay={2} />
    <group ref={rig}><SculptedLogo progressRef={progressRef} interactionRef={interactionRef} /></group>
  </>;
}

export default function HeroExperience() {
  const container = useRef();
  const pointerRef = useRef({ x: 0, y: 0, proximity: 0 });
  const progressRef = useRef(0);
  useHeroProgress(container, progressRef);
  return <section className="hero-r3f hero-logo-orbit" ref={container} id="top" aria-label="KATSEYE sculpted logo" onPointerMove={(event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    pointerRef.current.y = -((event.clientY - bounds.top) / bounds.height - .5) * 2;
    const pointerDistance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
    pointerRef.current.proximity = clamp(1 - pointerDistance / (Math.min(bounds.width, bounds.height) * .56));
  }} onPointerLeave={() => { pointerRef.current.x = 0; pointerRef.current.y = 0; pointerRef.current.proximity = 0; }}>
    <div className="hero-r3f-pin hero-logo-orbit-pin">
      <div className="hero-logo-orbit-atmosphere" aria-hidden="true"><i /><i /></div>
      <div className="hero-logo-orbit-threads" aria-hidden="true"><i /><i /><i /></div>
      <Canvas className="hero-r3f-canvas" camera={{ position: [0, 0, 7.3], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.1; }}><HeroWorld pointerRef={pointerRef} progressRef={progressRef} /></Canvas>
    </div>
  </section>;
}
