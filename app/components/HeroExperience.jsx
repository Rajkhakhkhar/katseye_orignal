import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroExperience.css';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value) => Math.min(1, Math.max(0, value));
const between = (value, start, end) => clamp((value - start) / (end - start));
const smooth = (value) => value * value * (3 - 2 * value);
const mix = (from, to, amount) => from + ((to - from) * amount);

const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    vec2 offset = vUv - vec2(0.5);
    float falloff = 1.0 - smoothstep(0.05, 0.7, length(vec2(offset.x * 0.72, offset.y)));
    vec3 color = mix(vec3(0.02, 0.32, 0.14), vec3(0.94, 1.0, 0.96), falloff * .72);
    gl_FragColor = vec4(color, falloff * opacity);
  }
`;

function Backlight({ progressRef }) {
  const plane = useRef();
  const point = useRef();
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { opacity: { value: 0 } },
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);
  useFrame(() => {
    const progress = progressRef.current;
    const reveal = smooth(between(progress, .2, .43));
    const bloomExit = 1 - smooth(between(progress, .88, .98));
    const scale = mix(.86, 1.3, smooth(between(progress, .48, .87)));
    if (plane.current) plane.current.scale.setScalar(scale);
    material.uniforms.opacity.value = reveal * bloomExit * .82;
    if (point.current) point.current.intensity = reveal * bloomExit * 4;
  });
  return <group position={[0, .05, -1.8]}>
    <mesh ref={plane} material={material}><planeGeometry args={[14.6, 7.6]} /></mesh>
    <pointLight ref={point} color="#caffdc" distance={15} decay={2} intensity={0} />
  </group>;
}

function SilhouetteCard({ progressRef }) {
  const mesh = useRef();
  const material = useRef();
  const texture = useLoader(THREE.TextureLoader, '/hero-six-silhouettes.png');
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
  }, [texture]);
  useFrame(() => {
    const progress = progressRef.current;
    const reveal = smooth(between(progress, .26, .45));
    const push = smooth(between(progress, .5, .91));
    const bloomExit = 1 - smooth(between(progress, .9, .98));
    if (mesh.current) {
      mesh.current.visible = reveal * bloomExit > .002;
      mesh.current.position.set(0, mix(-.7, -.15, push), mix(-.72, .7, push));
      mesh.current.scale.setScalar(mix(.9, 1.55, push));
    }
    if (material.current) material.current.opacity = reveal * bloomExit;
  });
  return <mesh ref={mesh} position={[0, -.7, -.72]}>
    <planeGeometry args={[12.4, 4.5]} />
    <meshBasicMaterial ref={material} map={texture} transparent opacity={0} depthWrite={false} />
  </mesh>;
}

function HeroWorld({ progressRef }) {
  const { camera, scene } = useThree();
  const bloom = useRef();
  useFrame(() => {
    const progress = progressRef.current;
    const push = smooth(between(progress, .5, .92));
    const whiteBloom = smooth(between(progress, .9, .995));
    camera.position.z = mix(14.5, 3, push);
    camera.position.y = mix(.16, .02, push);
    camera.lookAt(0, -.05, -.7);
    scene.fog.density = mix(.038, .09, smooth(between(progress, .18, .78)));
    if (bloom.current) bloom.current.material.opacity = whiteBloom;
  });
  return <>
    <color attach="background" args={['#000000']} />
    <fog attach="fog" args={['#000000', .038, 32]} />
    <Backlight progressRef={progressRef} />
    <SilhouetteCard progressRef={progressRef} />
    <mesh ref={bloom} position={[0, 0, 2.55]} renderOrder={10}>
      <planeGeometry args={[40, 26]} />
      <meshBasicMaterial color="#fffefb" transparent opacity={0} depthTest={false} depthWrite={false} />
    </mesh>
  </>;
}

export default function HeroExperience() {
  const container = useRef();
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const logoReveal = smooth(between(progress, .63, .75));
  const bloom = smooth(between(progress, .9, .995));
  const logoScale = mix(.92, 1.22, smooth(between(progress, .63, .9)));

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: .35,
        onUpdate: (trigger) => {
          progressRef.current = trigger.progress;
          setProgress(trigger.progress);
        },
      });
    }, container);
    return () => context.revert();
  }, []);

  return <section className="hero-r3f" ref={container} id="top" aria-label="KATSEYE introduction">
    <div className="hero-r3f-pin">
      <Canvas className="hero-r3f-canvas" camera={{ position: [0, .16, 14.5], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
        <HeroWorld progressRef={progressRef} />
      </Canvas>
      <div className="hero-r3f-logo" aria-label="KATSEYE" style={{ opacity: logoReveal * (1 - bloom), transform: `translate(-50%, -50%) scale(${logoScale})` }}>
        KATSEYE<span>*</span>
      </div>
    </div>
  </section>;
}
