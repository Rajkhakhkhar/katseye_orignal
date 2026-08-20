import { useLayoutEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ROOM } from './roomConfig';
import LaraExhibitionWalls from './ExhibitionWalls';

const SMOKED_BRONZE = '#8f7158';
const CHAMPAGNE = '#c7ae86';

function SmokedBronze() {
  return <meshPhysicalMaterial color={SMOKED_BRONZE} metalness={.78} roughness={.34} clearcoat={.05} />;
}

function FeatureWallBorder() {
  const z = ROOM.backWallZ + .33;
  const material = <meshStandardMaterial color="#9d835f" emissive="#6e5539" emissiveIntensity={.16} metalness={.66} roughness={.4} />;

  return <group name="feature-wall-presentation-border">
    <mesh position={[0, 3.91, z]}><boxGeometry args={[4.76, .032, .035]} />{material}</mesh>
    <mesh position={[0, .79, z]}><boxGeometry args={[4.76, .032, .035]} />{material}</mesh>
    <mesh position={[-2.36, 2.35, z]}><boxGeometry args={[.032, 3.15, .035]} />{material}</mesh>
    <mesh position={[2.36, 2.35, z]}><boxGeometry args={[.032, 3.15, .035]} />{material}</mesh>
  </group>;
}

function StandingMicrophone() {
  const stageY = .37;
  const stageZ = ROOM.backWallZ + .95;

  return <group name="stage-microphone" position={[0, stageY, stageZ]}>
    <mesh position={[0, .045, 0]}><cylinderGeometry args={[.34, .4, .09, 32]} /><SmokedBronze /></mesh>
    <mesh position={[0, .72, 0]}><cylinderGeometry args={[.038, .052, 1.35, 20]} /><SmokedBronze /></mesh>
    <mesh position={[0, 1.43, 0]}><cylinderGeometry args={[.092, .092, .18, 24]} /><SmokedBronze /></mesh>
    <mesh position={[0, 1.62, 0]}>
      <sphereGeometry args={[.15, 24, 16]} />
      <meshPhysicalMaterial color="#c9c2b8" metalness={.76} roughness={.31} />
    </mesh>
    <mesh position={[0, 1.62, .12]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[.108, .108, .035, 24]} />
      <meshStandardMaterial color="#25262a" metalness={.7} roughness={.43} />
    </mesh>
    <pointLight color={CHAMPAGNE} intensity={.16} distance={1.8} decay={2} position={[0, 1.35, .16]} />
  </group>;
}

const MATTE_BLACK = '#111214';
const GRAPHITE = '#26272b';
const WARM_METAL = '#9d7658';

function JewelleryDisplay() {
  return <group name="lara-jewellery-display" position={[-4.34, 2.34, 5.45]} scale={[2.25, 2.25, 2.25]}>
    <mesh position={[0, .07, 0]} castShadow receiveShadow>
      <boxGeometry args={[.22, .12, .72]} />
      <meshPhysicalMaterial color="#171619" metalness={.22} roughness={.78} />
    </mesh>
    <mesh position={[0, .32, 0]} scale={[.11, .23, .15]}>
      <sphereGeometry args={[1, 20, 14]} />
      <meshStandardMaterial color="#171416" roughness={.92} />
    </mesh>
    <mesh position={[-.12, .48, 0]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[.105, .011, 8, 24]} />
      <meshPhysicalMaterial color={WARM_METAL} metalness={.78} roughness={.3} />
    </mesh>
    <mesh position={[-.12, .33, 0]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[.075, .009, 8, 20]} />
      <meshPhysicalMaterial color={WARM_METAL} metalness={.78} roughness={.3} />
    </mesh>
    {[-.22, .22].map((z) => <mesh key={z} position={[-.12, .18, z]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[.034, .008, 8, 16]} />
      <meshPhysicalMaterial color="#c6a56e" metalness={.82} roughness={.28} />
    </mesh>)}
  </group>;
}

function DesignerBootPair() {
  return <group name="lara-designer-boots" position={[4.34, 1.48, 5.32]} rotation={[0, Math.PI, 0]} scale={[1.82, 1.82, 1.82]}>
    {[-.22, .22].map((z) => <group key={z} position={[0, 0, z]}>
      <mesh position={[0, .08, .07]} castShadow receiveShadow>
        <boxGeometry args={[.19, .16, .42]} />
        <meshPhysicalMaterial color={MATTE_BLACK} roughness={.78} metalness={.12} />
      </mesh>
      <mesh position={[0, .43, -.06]} castShadow>
        <boxGeometry args={[.16, .65, .19]} />
        <meshPhysicalMaterial color="#17181b" roughness={.68} metalness={.2} />
      </mesh>
      <mesh position={[0, .11, -.22]}>
        <boxGeometry args={[.16, .08, .12]} />
        <meshStandardMaterial color={WARM_METAL} metalness={.74} roughness={.31} />
      </mesh>
    </group>)}
  </group>;
}

function CompactSpeaker({ position, rotation = [0, 0, 0], scale = [1.45, 1.45, 1.45] }) {
  return <group position={position} rotation={rotation} scale={scale}>
    <mesh position={[0, .24, 0]} castShadow receiveShadow>
      <boxGeometry args={[.32, .48, .28]} />
      <meshPhysicalMaterial color={GRAPHITE} metalness={.38} roughness={.56} />
    </mesh>
    {[.14, .34].map((y, index) => <mesh key={y} position={[-.166, y, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[index ? .062 : .09, index ? .062 : .09, .012, 20]} />
      <meshStandardMaterial color="#0a0a0b" metalness={.42} roughness={.46} />
    </mesh>)}
  </group>;
}

function BackstageFlightCase() {
  return <group name="lara-backstage-flight-case" position={[3.2, .28, -4.7]} rotation={[0, -.25, 0]} scale={[1.7, 1.7, 1.7]}>
    <mesh position={[0, .22, 0]} castShadow receiveShadow>
      <boxGeometry args={[.52, .44, .82]} />
      <meshPhysicalMaterial color="#171719" metalness={.56} roughness={.47} clearcoat={.04} />
    </mesh>
    {[-.31, .31].map((z) => <mesh key={z} position={[-.275, .22, z]}>
      <boxGeometry args={[.02, .34, .05]} />
      <meshStandardMaterial color={WARM_METAL} metalness={.76} roughness={.31} />
    </mesh>)}
    {[0, .07, .14].map((y, index) => <mesh key={y} position={[-.03, .47 + y, -.05 + index * .04]} rotation={[0, .13, 0]}>
      <boxGeometry args={[.3, .055, .46]} />
      <meshStandardMaterial color={index === 1 ? '#4b252b' : '#242126'} roughness={.76} metalness={.08} />
    </mesh>)}
  </group>;
}

function AbstractPantherAccent() {
  return <group name="lara-abstract-panther-accent" position={[-3.12, .52, -4.72]} rotation={[0, -.4, 0]} scale={[2.38, 2.38, 2.38]}>
    <mesh scale={[.34, .14, .16]} castShadow><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
    <mesh position={[-.25, .07, -.02]} rotation={[0, 0, -.2]} scale={[.14, .1, .1]}><sphereGeometry args={[1, 16, 12]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
    <mesh position={[.27, .03, .03]} rotation={[0, -.6, .22]}><coneGeometry args={[.07, .42, 12]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
  </group>;
}

function LaraPortrait() {
  const texture = useLoader(THREE.TextureLoader, '/hero-lara-hq.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  return <group name="lara-portrait" position={[-4.34, 3.34, 1.65]}>
    <mesh>
      <boxGeometry args={[.035, 1.02, 1.36]} />
      <meshPhysicalMaterial color="#180f0e" metalness={.28} roughness={.64} />
    </mesh>
    <mesh position={[.024, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[1.15, .88]} />
      <meshStandardMaterial map={texture} transparent alphaTest={.04} roughness={.68} />
    </mesh>
    <mesh position={[.048, .5, 0]}><boxGeometry args={[.016, .025, 1.28]} /><meshStandardMaterial color="#c69a61" emissive="#805128" emissiveIntensity={.16} roughness={.5} /></mesh>
    <mesh position={[.048, -.5, 0]}><boxGeometry args={[.016, .025, 1.28]} /><meshStandardMaterial color="#c69a61" emissive="#805128" emissiveIntensity={.16} roughness={.5} /></mesh>
  </group>;
}

function ScentAndJewelleryShelf() {
  return <group name="lara-scent-and-jewellery-shelf" position={[-4.34, 1.54, -1.45]} scale={[1.38, 1.38, 1.38]}>
    <mesh position={[0, .08, 0]} castShadow receiveShadow>
      <boxGeometry args={[.18, .12, .66]} />
      <meshPhysicalMaterial color="#181517" metalness={.28} roughness={.7} />
    </mesh>
    {[-.21, 0, .21].map((z, index) => <group key={z} position={[-.09, .22 + index * .03, z]}>
      <mesh><cylinderGeometry args={[index === 1 ? .065 : .052, .07, .22 + index * .035, 20]} /><meshPhysicalMaterial color={index === 1 ? '#6d3d3b' : '#b89969'} metalness={.5} roughness={.3} clearcoat={.2} /></mesh>
      <mesh position={[0, .14 + index * .018, 0]}><cylinderGeometry args={[.025, .025, .07, 16]} /><meshStandardMaterial color="#1c1919" metalness={.75} roughness={.28} /></mesh>
    </group>)}
    <mesh position={[-.09, .23, .33]}><cylinderGeometry args={[.075, .075, .16, 24]} /><meshStandardMaterial color="#2a2020" roughness={.64} /></mesh>
    <mesh position={[-.09, .325, .33]}><cylinderGeometry args={[.057, .057, .012, 20]} /><meshStandardMaterial color="#c59b63" emissive="#8b6137" emissiveIntensity={.22} roughness={.5} /></mesh>
    <mesh position={[-.09, .44, .33]}><sphereGeometry args={[.025, 14, 10]} /><meshStandardMaterial color="#e3b46e" emissive="#b67336" emissiveIntensity={.3} /></mesh>
  </group>;
}

function VinylArchiveShelf() {
  return <group name="lara-vinyl-archive-shelf" position={[4.34, 1.42, 1.95]} rotation={[0, Math.PI, 0]} scale={[1.3, 1.3, 1.3]}>
    <mesh position={[0, .08, 0]} castShadow receiveShadow>
      <boxGeometry args={[.19, .12, .58]} />
      <meshPhysicalMaterial color="#171719" metalness={.32} roughness={.62} />
    </mesh>
    {[-.18, -.075, .03, .135].map((z, index) => <mesh key={z} position={[-.105, .31 + index * .008, z]} rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[.115, .115, .018, 28]} />
      <meshStandardMaterial color={index === 2 ? '#6a3334' : '#141417'} metalness={.35} roughness={.48} />
    </mesh>)}
    <mesh position={[-.105, .31, .245]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.12, .12, .021, 28]} /><meshStandardMaterial color="#b78a58" metalness={.45} roughness={.36} /></mesh>
    <mesh position={[-.119, .31, .245]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.035, .035, .024, 18]} /><meshStandardMaterial color="#211c1d" roughness={.46} /></mesh>
  </group>;
}

function EntryVignettes() {
  const lacquer = <meshPhysicalMaterial color="#21191a" metalness={.44} roughness={.34} clearcoat={.42} clearcoatRoughness={.18} />;
  return <group name="lara-entry-vignettes">
    <group position={[-3.26, .2, 7.08]} rotation={[0, .18, 0]}>
      <mesh position={[0, .12, 0]} castShadow receiveShadow><boxGeometry args={[.56, .24, .8]} />{lacquer}</mesh>
      <mesh position={[0, .29, 0]}><boxGeometry args={[.62, .035, .86]} /><meshPhysicalMaterial color="#9d7658" metalness={.78} roughness={.3} /></mesh>
      {[-.18, 0, .18].map((z, index) => <mesh key={z} position={[.02, .39 + index * .045, z]} rotation={[0, .08, 0]}><boxGeometry args={[.42, .055, .14]} /><meshStandardMaterial color={index === 1 ? '#6f3636' : '#2c2020'} roughness={.72} /></mesh>)}
      <mesh position={[-.05, .51, -.18]}><sphereGeometry args={[.09, 20, 14]} /><meshPhysicalMaterial color="#b89567" metalness={.68} roughness={.3} /></mesh>
    </group>
    <group position={[3.26, .19, 7.18]} rotation={[0, -.15, 0]}>
      <mesh position={[0, .115, 0]} castShadow receiveShadow><cylinderGeometry args={[.34, .4, .23, 32]} />{lacquer}</mesh>
      <mesh position={[0, .245, 0]}><cylinderGeometry args={[.29, .34, .04, 32]} /><meshPhysicalMaterial color="#a77d58" metalness={.78} roughness={.29} /></mesh>
      <mesh position={[0, .43, 0]}><sphereGeometry args={[.14, 20, 14]} /><meshPhysicalMaterial color="#171618" metalness={.52} roughness={.42} /></mesh>
      <mesh position={[0, .65, 0]} scale={[.48, .18, .48]}><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#c09a68" metalness={.68} roughness={.3} /></mesh>
    </group>
  </group>;
}

function BackWallVignettes() {
  return <group name="lara-back-wall-vignettes">
    {[-1, 1].map((side) => <group key={side} position={[side * 3.32, .17, -5.65]} rotation={[0, side * -.2, 0]}>
      <mesh position={[0, .1, 0]} castShadow receiveShadow><boxGeometry args={[.5, .2, .68]} /><meshPhysicalMaterial color="#171619" metalness={.4} roughness={.54} /></mesh>
      <mesh position={[0, .225, 0]}><boxGeometry args={[.54, .035, .72]} /><meshPhysicalMaterial color="#a77d58" metalness={.76} roughness={.3} /></mesh>
      <mesh position={[0, .45, 0]} scale={[.55, side < 0 ? .25 : .34, .55]}><sphereGeometry args={[1, 22, 14]} /><meshPhysicalMaterial color={side < 0 ? '#2a2021' : '#806047'} metalness={.38} roughness={.44} /></mesh>
      <mesh position={[0, .63, 0]} scale={[.21, .08, .21]}><sphereGeometry args={[1, 18, 12]} /><meshStandardMaterial color="#c89d62" emissive="#8c5d32" emissiveIntensity={.2} roughness={.5} /></mesh>
    </group>)}
  </group>;
}

function ExhibitSpotlight({ position, target, intensity = .34 }) {
  const light = useRef(null);
  const focus = useRef(null);

  useLayoutEffect(() => {
    if (light.current && focus.current) light.current.target = focus.current;
  }, []);

  return <group>
    <object3D ref={focus} position={target} />
    <spotLight ref={light} position={position} color="#d9a865" intensity={intensity} distance={3.1} angle={.52} penumbra={.9} decay={2} />
    <pointLight position={target} color="#b98758" intensity={.055} distance={1.2} decay={2} />
  </group>;
}
function LaraIdentityObjects() {
  return <group name="lara-identity-objects">
    <JewelleryDisplay />
    <DesignerBootPair />
    <CompactSpeaker position={[-4.34, 1.64, 5.98]} scale={[1.9, 1.9, 1.9]} />
    <CompactSpeaker position={[4.34, 1.64, 5.98]} rotation={[0, Math.PI, 0]} scale={[1.9, 1.9, 1.9]} />
    <BackstageFlightCase />
    <AbstractPantherAccent />
    <LaraPortrait />
    <ScentAndJewelleryShelf />
    <VinylArchiveShelf />
    <EntryVignettes />
    <BackWallVignettes />

    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.78, 2.64, 5.45]} intensity={.74} />
    <ExhibitSpotlight position={[2.65, 3.46, 5.32]} target={[3.78, 1.84, 5.32]} intensity={.68} />
    <ExhibitSpotlight position={[-2.68, 3.36, 5.98]} target={[-3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.36, 5.98]} target={[3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.28, -1.38]} target={[3.78, 1.92, -1.38]} intensity={.62} />
    <ExhibitSpotlight position={[-2.68, 4.08, 1.65]} target={[-3.78, 3.3, 1.65]} intensity={.58} />
  </group>;
}

function useCuratedLaraImages() {
  const textures = useLoader(THREE.TextureLoader, ['/hero-lara-hq.png', '/lara.png', '/charm-lara-hq.png']);
  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  });
  return textures;
}

function CuratedFrame({ side, position, width, height, texture, featured = false }) {
  const depth = featured ? .14 : .09;
  return <group position={position} rotation={side < 0 ? [0, 0, 0] : [0, Math.PI, 0]}>
    <mesh><boxGeometry args={[depth, height + .18, width + .18]} /><meshPhysicalMaterial color="#201719" metalness={.48} roughness={.4} clearcoat={.12} /></mesh>
    <mesh position={[depth / 2 + .008, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[width, height]} /><meshStandardMaterial map={texture} roughness={.68} /></mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[depth / 2 + .017, direction * (height / 2 + .04), 0]}><boxGeometry args={[.026, .035, width + .1]} /><meshPhysicalMaterial color="#c39863" metalness={.84} roughness={.27} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`edge-${direction}`} position={[depth / 2 + .017, 0, direction * (width / 2 + .04)]}><boxGeometry args={[.026, height + .1, .035]} /><meshPhysicalMaterial color="#c39863" metalness={.84} roughness={.27} /></mesh>)}
  </group>;
}

function CuratedJewelleryDisplay() {
  return <group name="lara-curated-jewellery" position={[-4.34, 2.1, -1.45]} scale={[2.08, 2.08, 2.08]}>
    <mesh position={[0, .08, 0]} castShadow receiveShadow><boxGeometry args={[.26, .14, .76]} /><meshPhysicalMaterial color="#151517" metalness={.38} roughness={.62} /></mesh>
    <mesh position={[-.07, .31, 0]} scale={[.1, .24, .18]}><sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color="#171416" roughness={.92} /></mesh>
    {[.13, .22].map((radius, index) => <mesh key={radius} position={[-.18, .37 + index * .1, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[radius, .012, 8, 24]} /><meshPhysicalMaterial color="#a77d58" metalness={.82} roughness={.28} /></mesh>)}
    {[-.25, .25].map((z) => <mesh key={z} position={[-.18, .18, z]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.042, .008, 8, 16]} /><meshPhysicalMaterial color="#d4ae70" metalness={.85} roughness={.26} /></mesh>)}
  </group>;
}

function CuratedPerfumeDisplay() {
  return <group name="lara-curated-perfume" position={[-4.34, 2.35, 1.65]} scale={[1.82, 1.82, 1.82]}>
    <mesh position={[0, .08, 0]} castShadow receiveShadow><boxGeometry args={[.24, .12, .68]} /><meshPhysicalMaterial color="#191518" metalness={.34} roughness={.58} /></mesh>
    {[-.22, 0, .22].map((z, index) => <group key={z} position={[-.14, .27 + index * .025, z]}>
      <mesh><cylinderGeometry args={[index === 1 ? .072 : .054, .07, .25 + index * .035, 20]} /><meshPhysicalMaterial color={index === 1 ? '#542b2c' : '#bf996a'} metalness={.5} roughness={.25} clearcoat={.35} /></mesh>
      <mesh position={[0, .16, 0]}><cylinderGeometry args={[.026, .026, .07, 16]} /><meshStandardMaterial color="#171518" metalness={.78} roughness={.24} /></mesh>
    </group>)}
    <mesh position={[-.14, .2, .34]}><cylinderGeometry args={[.075, .075, .14, 24]} /><meshStandardMaterial color="#241b1b" roughness={.62} /></mesh>
    <mesh position={[-.14, .29, .34]}><cylinderGeometry args={[.056, .056, .012, 20]} /><meshStandardMaterial color="#d7ae71" emissive="#945f2e" emissiveIntensity={.2} /></mesh>
  </group>;
}

function CuratedFashionHero() {
  return <group name="lara-curated-fashion-hero" position={[4.34, 2.58, 5.35]} rotation={[0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.72, 3.55, 2.45]} /><meshPhysicalMaterial color="#171719" metalness={.34} roughness={.54} /></mesh>
    <mesh position={[.38, 0, 0]}><boxGeometry args={[.02, 3.28, 2.18]} /><meshPhysicalMaterial color="#c9a66d" transparent opacity={.1} transmission={.25} roughness={.16} /></mesh>
    <mesh position={[.4, 1.56, 0]}><boxGeometry args={[.025, .035, 2.05]} /><meshStandardMaterial color="#d3a063" emissive="#86522a" emissiveIntensity={.2} /></mesh>
    <mesh position={[.02, .14, 0]}><boxGeometry args={[.46, .08, 1.78]} /><meshPhysicalMaterial color="#a57a57" metalness={.76} roughness={.3} /></mesh>
    <mesh position={[.02, .62, 0]} scale={[.17, .62, .32]}><capsuleGeometry args={[1, 1, 8, 16]} /><meshPhysicalMaterial color="#221416" metalness={.25} roughness={.68} /></mesh>
    <mesh position={[.02, 1.34, 0]}><sphereGeometry args={[.15, 20, 14]} /><meshPhysicalMaterial color="#b78868" metalness={.45} roughness={.3} /></mesh>
    <mesh position={[.16, .88, 0]}><boxGeometry args={[.08, .7, 1.04]} /><meshPhysicalMaterial color="#542b2c" metalness={.12} roughness={.75} /></mesh>
    <mesh position={[.21, .96, 0]}><boxGeometry args={[.015, .43, 1.14]} /><meshStandardMaterial color="#c89e65" metalness={.65} roughness={.36} /></mesh>
  </group>;
}

function CuratedVinylDisplay() {
  return <group name="lara-curated-vinyl" position={[4.34, 2.42, 1.95]} rotation={[0, Math.PI, 0]} scale={[1.65, 1.65, 1.65]}>
    <mesh position={[0, .1, 0]} castShadow receiveShadow><boxGeometry args={[.28, .2, .68]} /><meshPhysicalMaterial color="#151517" metalness={.45} roughness={.5} /></mesh>
    <mesh position={[.02, .25, 0]}><boxGeometry args={[.24, .05, .62]} /><meshPhysicalMaterial color="#a77d58" metalness={.74} roughness={.28} /></mesh>
    {[-.23, -.1, .03, .16].map((z, index) => <mesh key={z} position={[-.16, .48 + index * .01, z]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.13, .13, .024, 28]} /><meshStandardMaterial color={index === 2 ? '#542b2c' : '#121215'} metalness={.34} roughness={.45} /></mesh>)}
    <mesh position={[-.175, .48, .3]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.14, .14, .026, 28]} /><meshStandardMaterial color="#c49860" metalness={.45} roughness={.34} /></mesh>
  </group>;
}

function CuratedBootsAndSpeaker() {
  return <>
    <group name="lara-curated-boots" position={[4.34, 1.82, -1.35]} rotation={[0, Math.PI, 0]} scale={[1.7, 1.7, 1.7]}>
      <mesh position={[0, .08, 0]} castShadow receiveShadow><boxGeometry args={[.3, .16, .8]} /><meshPhysicalMaterial color="#171719" metalness={.4} roughness={.56} /></mesh>
      {[-.22, .22].map((z) => <group key={z} position={[-.12, .12, z]}><mesh position={[0, .07, .06]}><boxGeometry args={[.2, .16, .42]} /><meshPhysicalMaterial color="#121215" roughness={.73} metalness={.18} /></mesh><mesh position={[0, .41, -.05]}><boxGeometry args={[.16, .65, .2]} /><meshPhysicalMaterial color="#181719" roughness={.64} metalness={.28} /></mesh><mesh position={[-.02, .1, -.22]}><boxGeometry args={[.17, .07, .12]} /><meshStandardMaterial color="#a77d58" metalness={.78} roughness={.28} /></mesh></group>)}
    </group>
    <group name="lara-curated-speaker" position={[4.34, 1.56, 4.35]} rotation={[0, Math.PI, 0]} scale={[1.7, 1.7, 1.7]}>
      <mesh position={[0, .32, 0]} castShadow receiveShadow><boxGeometry args={[.34, .62, .44]} /><meshPhysicalMaterial color="#232429" metalness={.42} roughness={.5} /></mesh>
      {[.2, .45].map((y, index) => <mesh key={y} position={[-.18, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[index ? .065 : .105, index ? .065 : .105, .014, 24]} /><meshStandardMaterial color="#080809" metalness={.48} roughness={.42} /></mesh>)}
      <mesh position={[-.19, .57, 0]}><boxGeometry args={[.018, .025, .24]} /><meshStandardMaterial color="#d0a166" emissive="#845329" emissiveIntensity={.2} /></mesh>
    </group>
  </>;
}

function CuratedFloorObjects() {
  return <>
    <group name="lara-curated-panther" position={[-3.18, .48, -4.72]} rotation={[0, -.38, 0]} scale={[2.65, 2.65, 2.65]}>
      <mesh scale={[.38, .15, .17]} castShadow receiveShadow><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#0d0e10" metalness={.5} roughness={.42} /></mesh><mesh position={[-.28, .08, -.02]} rotation={[0, 0, -.2]} scale={[.16, .11, .11]}><sphereGeometry args={[1, 18, 14]} /><meshPhysicalMaterial color="#0d0e10" metalness={.5} roughness={.42} /></mesh><mesh position={[.31, .03, .03]} rotation={[0, -.6, .22]}><coneGeometry args={[.075, .46, 12]} /><meshPhysicalMaterial color="#0d0e10" metalness={.5} roughness={.42} /></mesh>
    </group>
    <group name="lara-curated-flight-case" position={[3.18, .28, -4.75]} rotation={[0, -.22, 0]} scale={[1.82, 1.82, 1.82]}>
      <mesh position={[0, .22, 0]} castShadow receiveShadow><boxGeometry args={[.56, .44, .86]} /><meshPhysicalMaterial color="#171719" metalness={.58} roughness={.44} clearcoat={.05} /></mesh>{[-.32, .32].map((z) => <mesh key={z} position={[-.295, .22, z]}><boxGeometry args={[.025, .34, .05]} /><meshStandardMaterial color="#a77d58" metalness={.8} roughness={.28} /></mesh>)}
    </group>
    <group name="lara-curated-travel-bag" position={[-3.18, .34, 7.08]} rotation={[0, .2, 0]} scale={[1.35, 1.35, 1.35]}>
      <mesh position={[0, .2, 0]} castShadow receiveShadow><boxGeometry args={[.5, .38, .85]} /><meshPhysicalMaterial color="#542b2c" metalness={.12} roughness={.56} clearcoat={.18} /></mesh><mesh position={[0, .47, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.21, .035, 8, 24, Math.PI]} /><meshPhysicalMaterial color="#a77d58" metalness={.8} roughness={.28} /></mesh>
    </group>
    <group name="lara-curated-low-plinth" position={[3.18, .2, 7.18]} rotation={[0, -.16, 0]}><mesh position={[0, .12, 0]} castShadow receiveShadow><cylinderGeometry args={[.42, .5, .24, 40]} /><meshPhysicalMaterial color="#20191a" metalness={.5} roughness={.4} clearcoat={.26} /></mesh><mesh position={[0, .26, 0]}><cylinderGeometry args={[.36, .42, .045, 40]} /><meshPhysicalMaterial color="#a77d58" metalness={.78} roughness={.28} /></mesh><mesh position={[0, .48, 0]} scale={[.32, .14, .32]}><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#c49a68" metalness={.72} roughness={.26} /></mesh></group>
  </>;
}

function LaraRedesignedComposition() {
  const [hero, editorial, charm] = useCuratedLaraImages();
  return <group name="lara-redesigned-decor-composition">
    <CuratedFrame side={-1} position={[-4.34, 2.65, 5.45]} width={2.32} height={3.35} texture={hero} featured />
    <CuratedFrame side={-1} position={[-4.05, 3.45, .15]} width={1.32} height={1.72} texture={editorial} />
    <CuratedFrame side={-1} position={[-4.05, 2.05, -3.18]} width={1.16} height={1.48} texture={charm} />
    <CuratedJewelleryDisplay /><CuratedPerfumeDisplay />
    <CuratedFashionHero /><CuratedVinylDisplay /><CuratedBootsAndSpeaker />
    <CuratedFloorObjects />
    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.78, 2.64, 5.45]} intensity={.74} />
    <ExhibitSpotlight position={[2.65, 3.46, 5.32]} target={[3.78, 1.84, 5.32]} intensity={.68} />
    <ExhibitSpotlight position={[-2.68, 3.36, 5.98]} target={[-3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.36, 5.98]} target={[3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.28, -1.38]} target={[3.78, 1.92, -1.38]} intensity={.62} />
    <ExhibitSpotlight position={[-2.68, 4.08, 1.65]} target={[-3.78, 3.3, 1.65]} intensity={.58} />
  </group>;
}

function ArchiveFashionCabinet({ side, position }) {
  return <group name={`lara-fashion-cabinet-${side}`} position={position} rotation={side < 0 ? [0, 0, 0] : [0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.78, 3.8, 1.72]} /><meshPhysicalMaterial color="#171518" metalness={.4} roughness={.46} clearcoat={.1} /></mesh>
    <mesh position={[.41, 0, 0]}><boxGeometry args={[.025, 3.5, 1.46]} /><meshPhysicalMaterial color="#d2ad78" transparent opacity={.1} transmission={.28} roughness={.13} /></mesh>
    <mesh position={[.43, 1.65, 0]}><boxGeometry args={[.025, .035, 1.36]} /><meshStandardMaterial color="#d6a567" emissive="#8d592e" emissiveIntensity={.28} /></mesh>
    <mesh position={[.04, .05, 0]}><boxGeometry args={[.5, .12, 1.2]} /><meshPhysicalMaterial color="#9e7655" metalness={.78} roughness={.28} /></mesh>
    <mesh position={[.04, .68, 0]} scale={[.2, .7, .34]}><capsuleGeometry args={[1, 1, 8, 16]} /><meshPhysicalMaterial color="#2b1519" metalness={.18} roughness={.68} /></mesh>
    <mesh position={[.04, 1.48, 0]}><sphereGeometry args={[.18, 20, 14]} /><meshPhysicalMaterial color="#bd9070" metalness={.42} roughness={.33} /></mesh>
    <mesh position={[.2, .94, 0]}><boxGeometry args={[.08, .74, 1.18]} /><meshPhysicalMaterial color="#5e2a30" metalness={.12} roughness={.72} /></mesh>
  </group>;
}

function ArchiveJewelleryShowcase() {
  return <group name="lara-archive-jewellery-showcase" position={[-4.32, 2.1, -.78]} scale={[2.75, 2.75, 2.75]}>
    <mesh position={[0, .1, 0]} castShadow receiveShadow><boxGeometry args={[.3, .18, .88]} /><meshPhysicalMaterial color="#151517" metalness={.4} roughness={.55} /></mesh>
    <mesh position={[.16, .48, 0]}><boxGeometry args={[.018, .56, .68]} /><meshPhysicalMaterial color="#dfbc82" transparent opacity={.12} transmission={.25} roughness={.14} /></mesh>
    <mesh position={[-.07, .37, 0]} scale={[.12, .28, .2]}><sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color="#171416" roughness={.92} /></mesh>
    {[.16, .27].map((radius, index) => <mesh key={radius} position={[-.2, .43 + index * .12, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[radius, .014, 8, 24]} /><meshPhysicalMaterial color="#c89d62" metalness={.86} roughness={.24} /></mesh>)}
    {[-.28, .28].map((z) => <mesh key={z} position={[-.2, .22, z]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.052, .01, 8, 16]} /><meshPhysicalMaterial color="#ddb779" metalness={.88} roughness={.22} /></mesh>)}
  </group>;
}

function ArchiveVinylBlock() {
  return <group name="lara-archive-vinyl-block" position={[4.32, 2.18, 1.75]} rotation={[0, Math.PI, 0]} scale={[2.2, 2.2, 2.2]}>
    <mesh position={[0, .12, 0]} castShadow receiveShadow><boxGeometry args={[.32, .24, .82]} /><meshPhysicalMaterial color="#131417" metalness={.48} roughness={.48} /></mesh>
    <mesh position={[.02, .28, 0]}><boxGeometry args={[.28, .055, .74]} /><meshPhysicalMaterial color="#a77d58" metalness={.78} roughness={.26} /></mesh>
    {[-.29, -.12, .06, .23].map((z, index) => <mesh key={z} position={[-.19, .59 + index * .012, z]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.15, .15, .027, 30]} /><meshStandardMaterial color={index === 2 ? '#642c32' : '#0d0d0f'} metalness={.4} roughness={.4} /></mesh>)}
    <mesh position={[-.21, .59, .34]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.16, .16, .03, 30]} /><meshStandardMaterial color="#d0a269" metalness={.5} roughness={.31} /></mesh>
  </group>;
}

function ArchiveBootDisplay() {
  return <group name="lara-archive-boots" position={[4.32, 1.65, -.72]} rotation={[0, Math.PI, 0]} scale={[2.25, 2.25, 2.25]}>
    <mesh position={[0, .1, 0]} castShadow receiveShadow><boxGeometry args={[.34, .2, .94]} /><meshPhysicalMaterial color="#151517" metalness={.42} roughness={.52} /></mesh>
    {[-.26, .26].map((z) => <group key={z} position={[-.14, .14, z]}><mesh position={[0, .08, .08]}><boxGeometry args={[.22, .18, .46]} /><meshPhysicalMaterial color="#111114" roughness={.72} metalness={.2} /></mesh><mesh position={[0, .48, -.05]}><boxGeometry args={[.18, .75, .22]} /><meshPhysicalMaterial color="#17171a" roughness={.62} metalness={.28} /></mesh><mesh position={[-.02, .1, -.24]}><boxGeometry args={[.19, .08, .14]} /><meshStandardMaterial color="#c39961" metalness={.82} roughness={.25} /></mesh></group>)}
  </group>;
}

function ArchiveSpeakerInstallation() {
  return <group name="lara-archive-speaker-installation" position={[4.32, 2.35, 3.7]} rotation={[0, Math.PI, 0]} scale={[2.25, 2.25, 2.25]}>
    <mesh position={[0, .48, 0]} castShadow receiveShadow><boxGeometry args={[.38, .92, .62]} /><meshPhysicalMaterial color="#23242a" metalness={.45} roughness={.46} /></mesh>
    {[.28, .65].map((y, index) => <mesh key={y} position={[-.205, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[index ? .085 : .14, index ? .085 : .14, .018, 26]} /><meshStandardMaterial color="#070708" metalness={.52} roughness={.36} /></mesh>)}
    <mesh position={[-.21, .82, 0]}><boxGeometry args={[.02, .03, .38]} /><meshStandardMaterial color="#d6a668" emissive="#87542a" emissiveIntensity={.28} /></mesh>
  </group>;
}

function ArchiveFloorCluster() {
  return <group name="lara-archive-floor-cluster">
    <group name="lara-panther-sculpture" position={[-3.08, .55, -4.55]} rotation={[0, -.34, 0]} scale={[3.15, 3.15, 3.15]}><mesh scale={[.4, .16, .18]} castShadow receiveShadow><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#090a0c" metalness={.58} roughness={.36} /></mesh><mesh position={[-.3, .09, -.02]} rotation={[0, 0, -.2]} scale={[.17, .12, .12]}><sphereGeometry args={[1, 18, 14]} /><meshPhysicalMaterial color="#090a0c" metalness={.58} roughness={.36} /></mesh><mesh position={[.33, .03, .03]} rotation={[0, -.6, .22]}><coneGeometry args={[.08, .5, 12]} /><meshPhysicalMaterial color="#090a0c" metalness={.58} roughness={.36} /></mesh></group>
    <group name="lara-luxury-flight-case" position={[3.08, .3, -4.55]} rotation={[0, -.24, 0]} scale={[2.2, 2.2, 2.2]}><mesh position={[0, .22, 0]} castShadow receiveShadow><boxGeometry args={[.62, .5, .95]} /><meshPhysicalMaterial color="#151518" metalness={.62} roughness={.4} clearcoat={.06} /></mesh>{[-.36, .36].map((z) => <mesh key={z} position={[-.33, .22, z]}><boxGeometry args={[.03, .38, .06]} /><meshStandardMaterial color="#a77d58" metalness={.82} roughness={.25} /></mesh>)}</group>
    <group name="lara-fashion-travel-bag" position={[-3.05, .37, 7.05]} rotation={[0, .2, 0]} scale={[1.75, 1.75, 1.75]}><mesh position={[0, .22, 0]} castShadow receiveShadow><boxGeometry args={[.56, .42, .94]} /><meshPhysicalMaterial color="#5d2930" metalness={.15} roughness={.52} clearcoat={.2} /></mesh><mesh position={[0, .53, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.24, .04, 8, 24, Math.PI]} /><meshPhysicalMaterial color="#bc8e59" metalness={.82} roughness={.25} /></mesh></group>
    <group name="lara-black-marble-plinth" position={[3.05, .22, 7.08]} rotation={[0, -.16, 0]}><mesh position={[0, .13, 0]} castShadow receiveShadow><cylinderGeometry args={[.5, .6, .26, 48]} /><meshPhysicalMaterial color="#09090b" metalness={.45} roughness={.2} clearcoat={.65} clearcoatRoughness={.1} /></mesh><mesh position={[0, .28, 0]}><cylinderGeometry args={[.43, .5, .04, 48]} /><meshPhysicalMaterial color="#bb8f5d" metalness={.82} roughness={.24} /></mesh><mesh position={[0, .55, 0]} scale={[.38, .16, .38]}><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#d0a36c" metalness={.76} roughness={.23} /></mesh></group>
  </group>;
}

function LaraCelebrityArchive() {
  const [hero, editorial, charm] = useCuratedLaraImages();
  return <group name="lara-celebrity-archive">
    <group name="lara-left-wall-archive">
      <CuratedFrame side={-1} position={[-4.34, 2.72, 5.08]} width={2.72} height={3.8} texture={hero} featured />
      <CuratedFrame side={-1} position={[-4.02, 3.35, 1.72]} width={1.55} height={2.02} texture={editorial} />
      <CuratedFrame side={-1} position={[-4.02, 1.72, -2.35]} width={1.42} height={1.82} texture={charm} />
      <ArchiveFashionCabinet side={-1} position={[-4.34, 2.42, 3.08]} />
      <ArchiveJewelleryShowcase />
    </group>
    <group name="lara-right-wall-archive">
      <ArchiveFashionCabinet side={1} position={[4.34, 2.7, 5.08]} />
      <ArchiveVinylBlock /><ArchiveBootDisplay /><ArchiveSpeakerInstallation />
    </group>
    <ArchiveFloorCluster />
    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.78, 2.64, 5.45]} intensity={.74} />
    <ExhibitSpotlight position={[2.65, 3.46, 5.32]} target={[3.78, 1.84, 5.32]} intensity={.68} />
    <ExhibitSpotlight position={[-2.68, 3.36, 5.98]} target={[-3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.36, 5.98]} target={[3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.28, -1.38]} target={[3.78, 1.92, -1.38]} intensity={.62} />
    <ExhibitSpotlight position={[-2.68, 4.08, 1.65]} target={[-3.78, 3.3, 1.65]} intensity={.58} />
  </group>;
}

function MonumentalFashionDisplay({ side, position, name, costumeColor = '#542b2c' }) {
  return <group name={name} position={position} rotation={side < 0 ? [0, 0, 0] : [0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.86, 4.48, 2.2]} /><meshPhysicalMaterial color="#141417" metalness={.46} roughness={.42} clearcoat={.12} /></mesh>
    <mesh position={[.46, 0, 0]}><boxGeometry args={[.024, 4.16, 1.94]} /><meshPhysicalMaterial color="#d9b57c" transparent opacity={.1} transmission={.3} roughness={.1} /></mesh>
    <mesh position={[.48, 1.96, 0]}><boxGeometry args={[.024, .04, 1.82]} /><meshStandardMaterial color="#ddaa68" emissive="#895127" emissiveIntensity={.28} /></mesh>
    <mesh position={[.06, .12, 0]}><boxGeometry args={[.58, .12, 1.55]} /><meshPhysicalMaterial color="#a57a57" metalness={.82} roughness={.25} /></mesh>
    <mesh position={[.04, .82, 0]} scale={[.23, .82, .4]}><capsuleGeometry args={[1, 1, 8, 16]} /><meshPhysicalMaterial color={costumeColor} metalness={.18} roughness={.62} /></mesh>
    <mesh position={[.04, 1.74, 0]}><sphereGeometry args={[.2, 22, 16]} /><meshPhysicalMaterial color="#bd9070" metalness={.45} roughness={.3} /></mesh>
    <mesh position={[.26, 1.1, 0]}><boxGeometry args={[.08, .9, 1.42]} /><meshPhysicalMaterial color="#c59a63" metalness={.68} roughness={.34} /></mesh>
  </group>;
}

function MonumentalJewelleryShowcase() {
  return <group name="lara-monumental-jewellery-showcase" position={[-4.34, 2.15, -3.65]} scale={[3.4, 3.4, 3.4]}>
    <mesh position={[0, .12, 0]} castShadow receiveShadow><boxGeometry args={[.38, .22, .96]} /><meshPhysicalMaterial color="#121215" metalness={.48} roughness={.48} clearcoat={.14} /></mesh>
    <mesh position={[.21, .65, 0]}><boxGeometry args={[.02, .82, .78]} /><meshPhysicalMaterial color="#e2bf88" transparent opacity={.14} transmission={.32} roughness={.12} /></mesh>
    <mesh position={[-.08, .5, 0]} scale={[.15, .36, .24]}><sphereGeometry args={[1, 22, 16]} /><meshStandardMaterial color="#141316" roughness={.9} /></mesh>
    <mesh position={[-.24, .6, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.31, .02, 10, 32]} /><meshPhysicalMaterial color="#d8ae70" metalness={.9} roughness={.2} /></mesh>
    <mesh position={[-.24, .31, -.32]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.09, .014, 8, 20]} /><meshPhysicalMaterial color="#e3bc79" metalness={.92} roughness={.18} /></mesh>
    <mesh position={[-.24, .31, .32]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.09, .014, 8, 20]} /><meshPhysicalMaterial color="#e3bc79" metalness={.92} roughness={.18} /></mesh>
  </group>;
}

function MonumentalVinylInstallation() {
  return <group name="lara-monumental-vinyl-installation" position={[4.34, 2.15, .45]} rotation={[0, Math.PI, 0]} scale={[3.15, 3.15, 3.15]}>
    <mesh position={[0, .14, 0]} castShadow receiveShadow><boxGeometry args={[.4, .28, 1.05]} /><meshPhysicalMaterial color="#131417" metalness={.52} roughness={.42} /></mesh>
    <mesh position={[.03, .34, 0]}><boxGeometry args={[.34, .07, .95]} /><meshPhysicalMaterial color="#b98a58" metalness={.82} roughness={.24} /></mesh>
    <mesh position={[-.23, .79, -.22]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.27, .27, .034, 36]} /><meshStandardMaterial color="#0c0c0e" metalness={.42} roughness={.35} /></mesh>
    <mesh position={[-.25, .79, -.22]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.075, .075, .04, 20]} /><meshStandardMaterial color="#c79c63" metalness={.62} roughness={.25} /></mesh>
    <mesh position={[-.23, .79, .31]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.24, .24, .034, 36]} /><meshStandardMaterial color="#5e2730" metalness={.34} roughness={.4} /></mesh>
  </group>;
}

function MonumentalSpeakerInstallation() {
  return <group name="lara-monumental-speaker-installation" position={[4.34, 2.15, -4.15]} rotation={[0, Math.PI, 0]} scale={[3.3, 3.3, 3.3]}>
    <mesh position={[0, .6, 0]} castShadow receiveShadow><boxGeometry args={[.44, 1.18, .84]} /><meshPhysicalMaterial color="#1e2026" metalness={.48} roughness={.42} clearcoat={.08} /></mesh>
    {[.33, .82].map((y, index) => <mesh key={y} position={[-.24, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[index ? .12 : .19, index ? .12 : .19, .022, 30]} /><meshStandardMaterial color="#070708" metalness={.58} roughness={.3} /></mesh>)}
    <mesh position={[-.245, 1.04, 0]}><boxGeometry args={[.024, .038, .54]} /><meshStandardMaterial color="#dda868" emissive="#8a5128" emissiveIntensity={.32} /></mesh>
  </group>;
}

function MonumentalFloorIdentity() {
  return <group name="lara-monumental-floor-identity">
    <group name="lara-black-panther" position={[-3.05, .62, -4.65]} rotation={[0, -.32, 0]} scale={[4.3, 4.3, 4.3]}><mesh scale={[.42, .17, .19]} castShadow receiveShadow><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color="#060709" metalness={.64} roughness={.3} clearcoat={.18} /></mesh><mesh position={[-.32, .1, -.02]} rotation={[0, 0, -.2]} scale={[.18, .13, .13]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#060709" metalness={.64} roughness={.3} clearcoat={.18} /></mesh><mesh position={[.36, .03, .04]} rotation={[0, -.62, .22]}><coneGeometry args={[.085, .54, 14]} /><meshPhysicalMaterial color="#060709" metalness={.64} roughness={.3} clearcoat={.18} /></mesh></group>
    <group name="lara-luxury-travel-case" position={[3.08, .34, -4.65]} rotation={[0, -.22, 0]} scale={[2.85, 2.85, 2.85]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.66, .54, 1.02]} /><meshPhysicalMaterial color="#121316" metalness={.68} roughness={.34} clearcoat={.1} /></mesh>{[-.39, .39].map((z) => <mesh key={z} position={[-.36, .24, z]}><boxGeometry args={[.035, .42, .07]} /><meshStandardMaterial color="#ba8a56" metalness={.86} roughness={.22} /></mesh>)}</group>
    <group name="lara-designer-travel-bag" position={[-3.05, .42, 7.08]} rotation={[0, .2, 0]} scale={[2.45, 2.45, 2.45]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.62, .48, 1.06]} /><meshPhysicalMaterial color="#5a2730" metalness={.16} roughness={.5} clearcoat={.24} /></mesh><mesh position={[0, .58, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.27, .045, 8, 26, Math.PI]} /><meshPhysicalMaterial color="#c49760" metalness={.86} roughness={.22} /></mesh></group>
  </group>;
}

function LaraIdentityMonuments() {
  const [hero] = useCuratedLaraImages();
  return <group name="lara-identity-monuments">
    <group name="lara-left-identity-wall">
      <CuratedFrame side={-1} position={[-4.34, 2.6, 5.0]} width={3.15} height={4.35} texture={hero} featured />
      <MonumentalFashionDisplay side={-1} position={[-4.34, 2.42, .62]} name="lara-full-height-fashion-display" costumeColor="#2c1519" />
      <MonumentalJewelleryShowcase />
    </group>
    <group name="lara-right-identity-wall">
      <MonumentalFashionDisplay side={1} position={[4.34, 2.58, 5.0]} name="lara-performance-costume-display" costumeColor="#642a31" />
      <MonumentalVinylInstallation />
      <MonumentalSpeakerInstallation />
    </group>
    <MonumentalFloorIdentity />
    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.78, 2.64, 5.45]} intensity={.74} />
    <ExhibitSpotlight position={[2.65, 3.46, 5.32]} target={[3.78, 1.84, 5.32]} intensity={.68} />
    <ExhibitSpotlight position={[-2.68, 3.36, 5.98]} target={[-3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.36, 5.98]} target={[3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.28, -1.38]} target={[3.78, 1.92, -1.38]} intensity={.62} />
    <ExhibitSpotlight position={[-2.68, 4.08, 1.65]} target={[-3.78, 3.3, 1.65]} intensity={.58} />
  </group>;
}

function LaraRunway() {
  const rings = [5.9, 2.6, -.7, -4.0, -7.2];
  return <group name="lara-after-hours-runway">
    <mesh position={[0, .045, -.35]} receiveShadow><boxGeometry args={[3.72, .09, 16.9]} /><meshPhysicalMaterial color="#09090b" metalness={.58} roughness={.22} clearcoat={.72} clearcoatRoughness={.11} /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * 1.72, .102, -.35]}><boxGeometry args={[.032, .018, 16.65]} /><meshStandardMaterial color="#c7965f" emissive="#6e3e1d" emissiveIntensity={.34} metalness={.82} roughness={.24} /></mesh>)}
    {rings.map((z) => <mesh key={z} position={[0, .105, z]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.56, .012, 6, 40]} /><meshStandardMaterial color="#8f633e" emissive="#4f2914" emissiveIntensity={.22} metalness={.72} roughness={.3} /></mesh>)}
  </group>;
}

function LaraVocalSignature() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 760;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.fillStyle = '#d8ad6d';
    context.font = '700 232px Georgia, serif';
    context.letterSpacing = '24px';
    context.fillText('LARA', canvas.width / 2, 315);
    context.strokeStyle = 'rgba(216, 173, 109, .72)';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(265, 390);
    context.lineTo(1135, 390);
    context.stroke();
    context.fillStyle = '#b98654';
    context.font = '600 38px Arial, sans-serif';
    context.letterSpacing = '11px';
    context.fillText('VOICE IN THE WILD', canvas.width / 2, 465);
    const textureResult = new THREE.CanvasTexture(canvas);
    textureResult.colorSpace = THREE.SRGBColorSpace;
    textureResult.needsUpdate = true;
    return textureResult;
  }, []);

  return <group name="lara-vocal-signature" position={[0, 2.55, ROOM.backWallZ + .11]}>
    <mesh><planeGeometry args={[4.65, 2.52]} /><meshBasicMaterial map={texture} transparent depthWrite={false} /></mesh>
    {[-1.56, -.78, 0, .78, 1.56].map((x, index) => <mesh key={x} position={[x, -1.08 + (index % 2) * .1, .012]}><boxGeometry args={[.055, .18 + index * .075, .025]} /><meshStandardMaterial color="#bc8b58" emissive="#70401e" emissiveIntensity={.3} /></mesh>)}
  </group>;
}

function LaraJewelleryHalo() {
  return <group name="lara-jewellery-halo" position={[0, 4.28, 2.75]}>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.16, .045, 10, 48]} /><meshPhysicalMaterial color="#d3a266" metalness={.9} roughness={.2} clearcoat={.16} /></mesh>
    <mesh position={[0, -.16, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.7, .026, 8, 40]} /><meshPhysicalMaterial color="#a97c4e" metalness={.88} roughness={.22} /></mesh>
    {[-.72, -.36, 0, .36, .72].map((x, index) => <group key={x} position={[x, 0, (index % 2 ? .25 : -.2)]}>
      <mesh position={[0, -.42 - (index % 2) * .16, 0]}><cylinderGeometry args={[.014, .014, .78 + (index % 2) * .32, 10]} /><meshPhysicalMaterial color="#c8975f" metalness={.86} roughness={.22} /></mesh>
      <mesh position={[0, -.88 - (index % 2) * .27, 0]} rotation={[0, .24 * index, 0]}><octahedronGeometry args={[.12 + (index % 2) * .035, 1]} /><meshPhysicalMaterial color={index === 2 ? '#a85a56' : '#d3a66a'} metalness={.75} roughness={.18} clearcoat={.2} /></mesh>
    </group>)}
  </group>;
}

function LaraPortraitShrine({ texture }) {
  return <group name="lara-portrait-shrine">
    <CuratedFrame side={-1} position={[-3.84, 2.62, 5.02]} width={3.3} height={4.48} texture={texture} featured />
    <mesh position={[-3.65, 4.52, 5.02]}><boxGeometry args={[.025, .055, 3.58]} /><meshStandardMaterial color="#d2a165" emissive="#79502a" emissiveIntensity={.28} metalness={.88} roughness={.22} /></mesh>
    <mesh position={[-3.64, .7, 5.02]}><boxGeometry args={[.03, .18, 3.72]} /><meshPhysicalMaterial color="#1a1516" metalness={.56} roughness={.34} clearcoat={.2} /></mesh>
    <mesh position={[-3.6, .82, 4.0]} rotation={[0, Math.PI / 2, 0]}><circleGeometry args={[.14, 24]} /><meshStandardMaterial color="#d8ad6d" emissive="#845126" emissiveIntensity={.24} /></mesh>
    <mesh position={[-3.6, .82, 6.05]} rotation={[0, Math.PI / 2, 0]}><circleGeometry args={[.14, 24]} /><meshStandardMaterial color="#d8ad6d" emissive="#845126" emissiveIntensity={.24} /></mesh>
  </group>;
}

function LaraFurCoatMonument() {
  const tufts = [[-.18, .68, -.48], [-.16, 1.1, -.22], [-.16, 1.52, .08], [-.16, .98, .42], [-.16, 1.55, .5]];
  return <group name="lara-fur-coat-monument" position={[-3.76, .2, .66]} scale={[1.08, 1.08, 1.08]}>
    <mesh position={[0, 2.15, 0]}><boxGeometry args={[.48, .07, 1.72]} /><meshPhysicalMaterial color="#a77b56" metalness={.86} roughness={.24} /></mesh>
    <mesh position={[0, .1, 0]} castShadow receiveShadow><boxGeometry args={[.68, .2, 1.95]} /><meshPhysicalMaterial color="#161518" metalness={.46} roughness={.5} /></mesh>
    <mesh position={[-.05, 1.28, 0]} scale={[.28, 1.14, .58]}><capsuleGeometry args={[1, 1, 10, 18]} /><meshStandardMaterial color="#111114" roughness={.94} /></mesh>
    {tufts.map(([x, y, z], index) => <mesh key={index} position={[x, y, z]} scale={[.22 + (index % 2) * .05, .36, .34]}><sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color={index % 2 ? '#1b1718' : '#0c0c0e'} roughness={.98} /></mesh>)}
    <mesh position={[-.22, 1.42, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.23, .03, 8, 28]} /><meshPhysicalMaterial color="#c89861" metalness={.86} roughness={.22} /></mesh>
    <mesh position={[-.42, 1.72, 0]} rotation={[0, Math.PI / 2, 0]} scale={[.78, .34, 1]}><torusGeometry args={[.4, .055, 8, 28]} /><meshPhysicalMaterial color="#08090b" metalness={.68} roughness={.18} /></mesh>
  </group>;
}

function LaraJewelleryAltar() {
  return <group name="lara-jewellery-altar" position={[-3.76, .24, -3.55]} scale={[1.23, 1.23, 1.23]}>
    <mesh position={[0, .26, 0]} castShadow receiveShadow><cylinderGeometry args={[.92, 1.08, .52, 40]} /><meshPhysicalMaterial color="#0b0b0d" metalness={.56} roughness={.24} clearcoat={.72} clearcoatRoughness={.1} /></mesh>
    <mesh position={[0, .55, 0]}><cylinderGeometry args={[.8, .92, .06, 40]} /><meshPhysicalMaterial color="#b98958" metalness={.86} roughness={.22} /></mesh>
    <mesh position={[-.14, 1.18, 0]} scale={[.28, .65, .42]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color="#141316" roughness={.9} /></mesh>
    <mesh position={[-.46, 1.32, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.54, .032, 10, 36]} /><meshPhysicalMaterial color="#d9af70" metalness={.92} roughness={.18} /></mesh>
    {[-.38, .38].map((z) => <mesh key={z} position={[-.46, .72, z]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.14, .022, 8, 20]} /><meshPhysicalMaterial color="#e0b87a" metalness={.94} roughness={.16} /></mesh>)}
  </group>;
}

function LaraPerformanceMonument() {
  return <group name="lara-performance-monument" position={[3.76, .2, 5.0]} rotation={[0, Math.PI, 0]} scale={[1.08, 1.08, 1.08]}>
    <mesh position={[0, 2.38, 0]}><boxGeometry args={[.9, 4.72, 3.16]} /><meshPhysicalMaterial color="#151316" metalness={.48} roughness={.38} clearcoat={.16} /></mesh>
    <mesh position={[.48, 2.38, 0]}><boxGeometry args={[.025, 4.36, 2.8]} /><meshPhysicalMaterial color="#d6b17a" transparent opacity={.09} transmission={.26} roughness={.12} /></mesh>
    <mesh position={[.51, 4.36, 0]}><boxGeometry args={[.024, .05, 2.62]} /><meshStandardMaterial color="#d9a765" emissive="#855028" emissiveIntensity={.32} /></mesh>
    <mesh position={[.05, .25, 0]}><boxGeometry args={[.62, .12, 2.3]} /><meshPhysicalMaterial color="#a77a57" metalness={.84} roughness={.23} /></mesh>
    <mesh position={[.05, 1.15, 0]} scale={[.29, 1.23, .61]}><capsuleGeometry args={[1, 1, 10, 18]} /><meshPhysicalMaterial color="#54252d" metalness={.2} roughness={.66} /></mesh>
    <mesh position={[.05, 2.52, 0]}><sphereGeometry args={[.23, 22, 16]} /><meshPhysicalMaterial color="#c09373" metalness={.42} roughness={.3} /></mesh>
    <mesh position={[.27, 1.72, 0]}><boxGeometry args={[.09, 1.32, 1.8]} /><meshPhysicalMaterial color="#1a1517" metalness={.48} roughness={.44} /></mesh>
    {[-.52, .52].map((z) => <mesh key={z} position={[.22, .82, z]}><boxGeometry args={[.2, .35, .38]} /><meshPhysicalMaterial color="#0b0b0d" metalness={.34} roughness={.68} /></mesh>)}
  </group>;
}

function LaraMusicSanctuary() {
  return <group name="lara-music-sanctuary" position={[3.76, .25, .28]} rotation={[0, Math.PI, 0]} scale={[1.18, 1.18, 1.18]}>
    <mesh position={[0, .32, 0]} castShadow receiveShadow><boxGeometry args={[.72, .64, 2.55]} /><meshPhysicalMaterial color="#111216" metalness={.55} roughness={.38} clearcoat={.12} /></mesh>
    <mesh position={[.03, .68, 0]}><boxGeometry args={[.66, .07, 2.36]} /><meshPhysicalMaterial color="#b88957" metalness={.86} roughness={.22} /></mesh>
    {[-.78, 0, .78].map((z, index) => <mesh key={z} position={[-.39, 1.12, z]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.42, .42, .05, 40]} /><meshStandardMaterial color={index === 1 ? '#642b33' : '#090a0c'} metalness={.48} roughness={.3} /></mesh>)}
    {[-.78, 0, .78].map((z) => <mesh key={`label-${z}`} position={[-.425, 1.12, z]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.11, .11, .057, 24]} /><meshStandardMaterial color="#d5a56a" metalness={.7} roughness={.22} /></mesh>)}
    <mesh position={[-.1, 1.13, 0]}><boxGeometry args={[.4, .05, .72]} /><meshPhysicalMaterial color="#171518" metalness={.5} roughness={.38} /></mesh>
    <mesh position={[-.1, 1.18, 0]}><cylinderGeometry args={[.28, .28, .035, 36]} /><meshStandardMaterial color="#0a0a0c" metalness={.45} roughness={.32} /></mesh>
  </group>;
}

function LaraSpeakerTotem() {
  return <group name="lara-speaker-totem" position={[3.76, .2, -4.2]} rotation={[0, Math.PI, 0]} scale={[1.26, 1.26, 1.26]}>
    <mesh position={[0, 1.15, 0]} castShadow receiveShadow><boxGeometry args={[.62, 2.3, 1.42]} /><meshPhysicalMaterial color="#202228" metalness={.56} roughness={.34} clearcoat={.08} /></mesh>
    {[.56, 1.56].map((y, index) => <mesh key={y} position={[-.34, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[index ? .24 : .36, index ? .24 : .36, .035, 32]} /><meshStandardMaterial color="#060608" metalness={.66} roughness={.24} /></mesh>)}
    <mesh position={[-.35, 2.0, 0]}><boxGeometry args={[.034, .05, .98]} /><meshStandardMaterial color="#d6a465" emissive="#895126" emissiveIntensity={.36} /></mesh>
    <mesh position={[-.16, 2.56, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.56, .045, 8, 32]} /><meshPhysicalMaterial color="#bb8957" metalness={.86} roughness={.21} /></mesh>
  </group>;
}

function LaraFloorIcons() {
  return <group name="lara-floor-icons">
    <group name="lara-panther" position={[-2.92, .72, -4.8]} rotation={[0, -.36, 0]} scale={[5.1, 5.1, 5.1]}><mesh scale={[.42, .17, .2]} castShadow receiveShadow><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color="#050609" metalness={.7} roughness={.25} clearcoat={.22} /></mesh><mesh position={[-.33, .1, -.02]} rotation={[0, 0, -.2]} scale={[.19, .14, .14]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#050609" metalness={.7} roughness={.25} clearcoat={.22} /></mesh><mesh position={[.38, .03, .04]} rotation={[0, -.62, .22]}><coneGeometry args={[.09, .58, 14]} /><meshPhysicalMaterial color="#050609" metalness={.7} roughness={.25} clearcoat={.22} /></mesh></group>
    <group name="lara-backstage-travel-case" position={[3.05, .38, -4.72]} rotation={[0, -.24, 0]} scale={[3.3, 3.3, 3.3]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.72, .58, 1.12]} /><meshPhysicalMaterial color="#101114" metalness={.72} roughness={.3} clearcoat={.12} /></mesh>{[-.43, .43].map((z) => <mesh key={z} position={[-.4, .24, z]}><boxGeometry args={[.04, .46, .07]} /><meshStandardMaterial color="#bd8c58" metalness={.88} roughness={.2} /></mesh>)}</group>
    <group name="lara-designer-bag" position={[-3.02, .48, 7.12]} rotation={[0, .18, 0]} scale={[2.8, 2.8, 2.8]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.66, .5, 1.12]} /><meshPhysicalMaterial color="#5b2830" metalness={.16} roughness={.48} clearcoat={.25} /></mesh><mesh position={[0, .62, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.29, .05, 8, 28, Math.PI]} /><meshPhysicalMaterial color="#d0a065" metalness={.88} roughness={.2} /></mesh></group>
  </group>;
}

function LaraAfterHoursArchive() {
  const [hero] = useCuratedLaraImages();
  return <group name="lara-after-hours-archive">
    <LaraRunway />
    <LaraJewelleryHalo />
    <LaraVocalSignature />
    <LaraPortraitShrine texture={hero} />
    <LaraFurCoatMonument />
    <LaraJewelleryAltar />
    <LaraPerformanceMonument />
    <LaraMusicSanctuary />
    <LaraSpeakerTotem />
    <LaraFloorIcons />
    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.58, 2.64, 5.02]} intensity={.9} />
    <ExhibitSpotlight position={[-2.68, 3.9, .62]} target={[-3.58, 2.4, .62]} intensity={.82} />
    <ExhibitSpotlight position={[-2.65, 3.55, -3.25]} target={[-3.55, 1.65, -3.55]} intensity={.72} />
    <ExhibitSpotlight position={[2.65, 3.78, 5.45]} target={[3.58, 2.7, 5.0]} intensity={.9} />
    <ExhibitSpotlight position={[2.64, 3.7, .5]} target={[3.58, 1.8, .28]} intensity={.78} />
    <ExhibitSpotlight position={[2.62, 4.0, -3.55]} target={[3.58, 1.8, -4.2]} intensity={.74} />
  </group>;
}

function BronzeGalleryFrame({ side, position, width, height, texture, depth = .16 }) {
  const rotation = side < 0 ? [0, 0, 0] : [0, Math.PI, 0];
  return <group position={position} rotation={rotation}>
    <mesh><boxGeometry args={[depth, height + .34, width + .34]} /><meshPhysicalMaterial color="#2a1b18" metalness={.56} roughness={.3} clearcoat={.16} /></mesh>
    <mesh position={[depth / 2 + .012, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[width, height]} />{texture ? <meshStandardMaterial map={texture} roughness={.62} /> : <meshPhysicalMaterial color="#110f11" metalness={.46} roughness={.36} clearcoat={.2} />}</mesh>
    {[-1, 1].map((direction) => <mesh key={direction} position={[depth / 2 + .024, direction * (height / 2 + .09), 0]}><boxGeometry args={[.04, .08, width + .22]} /><meshPhysicalMaterial color="#bd8b55" metalness={.9} roughness={.19} /></mesh>)}
    {[-1, 1].map((direction) => <mesh key={`side-${direction}`} position={[depth / 2 + .024, 0, direction * (width / 2 + .09)]}><boxGeometry args={[.04, height + .22, .08]} /><meshPhysicalMaterial color="#bd8b55" metalness={.9} roughness={.19} /></mesh>)}
  </group>;
}

function TallGlassCabinet({ side, position, name }) {
  return <group name={name} position={position} rotation={side < 0 ? [0, 0, 0] : [0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.86, 4.58, 2.28]} /><meshPhysicalMaterial color="#121214" metalness={.52} roughness={.36} clearcoat={.18} /></mesh>
    <mesh position={[.46, 0, 0]}><boxGeometry args={[.022, 4.24, 1.98]} /><meshPhysicalMaterial color="#e0bd86" transparent opacity={.13} transmission={.34} roughness={.1} /></mesh>
    {[-.9, 0, .9].map((z) => <mesh key={z} position={[.06, z === 0 ? 0 : z * 1.45, z]}><boxGeometry args={[.62, .045, 1.76]} /><meshPhysicalMaterial color="#a97a52" metalness={.84} roughness={.22} /></mesh>)}
    <mesh position={[.49, 1.98, 0]}><boxGeometry args={[.025, .04, 1.84]} /><meshStandardMaterial color="#d6a264" emissive="#825028" emissiveIntensity={.3} /></mesh>
  </group>;
}

function LeftArchiveWall({ hero, editorial }) {
  return <group name="lara-left-architectural-archive">
    <BronzeGalleryFrame side={-1} position={[-3.78, 2.62, 5.05]} width={3.38} height={4.48} texture={hero} depth={.2} />
    <BronzeGalleryFrame side={-1} position={[-3.84, 2.58, 1.02]} width={2.6} height={4.24} texture={editorial} depth={.18} />
    <BronzeGalleryFrame side={-1} position={[-3.9, 2.4, -2.1]} width={2.16} height={3.5} depth={.14} />
    <TallGlassCabinet side={-1} position={[-3.74, 2.42, -5.48]} name="lara-left-luxury-glass-cabinet" />
  </group>;
}

function RightFashionInstallation() {
  return <group name="lara-right-fashion-installation" position={[3.76, 2.42, 5.02]} rotation={[0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.94, 4.74, 3.45]} /><meshPhysicalMaterial color="#141215" metalness={.52} roughness={.32} clearcoat={.18} /></mesh>
    <mesh position={[.5, 0, 0]}><boxGeometry args={[.025, 4.38, 3.04]} /><meshPhysicalMaterial color="#e2bf89" transparent opacity={.1} transmission={.28} roughness={.1} /></mesh>
    <mesh position={[.52, 2.06, 0]}><boxGeometry args={[.024, .045, 2.82]} /><meshStandardMaterial color="#d5a365" emissive="#875029" emissiveIntensity={.3} /></mesh>
    <mesh position={[.04, -.1, 0]}><boxGeometry args={[.66, .14, 2.62]} /><meshPhysicalMaterial color="#a57853" metalness={.86} roughness={.2} /></mesh>
    <mesh position={[.02, .92, 0]} scale={[.32, 1.05, .72]}><capsuleGeometry args={[1, 1, 10, 20]} /><meshPhysicalMaterial color="#4e222c" metalness={.24} roughness={.62} /></mesh>
    <mesh position={[.02, 2.1, 0]}><sphereGeometry args={[.25, 24, 18]} /><meshPhysicalMaterial color="#c09272" metalness={.46} roughness={.3} /></mesh>
    <mesh position={[.26, 1.36, 0]}><boxGeometry args={[.1, 1.5, 2.12]} /><meshPhysicalMaterial color="#181417" metalness={.48} roughness={.4} /></mesh>
  </group>;
}

function RightMusicArchiveWall() {
  const records = [-1.35, -.45, .45, 1.35];
  return <group name="lara-right-music-archive-wall" position={[3.78, 2.48, .12]} rotation={[0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.7, 4.4, 4.5]} /><meshPhysicalMaterial color="#111216" metalness={.54} roughness={.32} clearcoat={.2} /></mesh>
    <mesh position={[.37, 0, 0]}><boxGeometry args={[.026, 4.04, 4.12]} /><meshPhysicalMaterial color="#161317" metalness={.42} roughness={.42} /></mesh>
    {records.map((z, index) => <group key={z} position={[.4, .52 + (index % 2) * .95, z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh><cylinderGeometry args={[.54, .54, .05, 40]} /><meshStandardMaterial color={index === 1 ? '#682b34' : '#090a0c'} metalness={.48} roughness={.28} /></mesh>
      <mesh position={[.032, 0, 0]}><cylinderGeometry args={[.16, .16, .06, 24]} /><meshStandardMaterial color="#d0a065" metalness={.72} roughness={.2} /></mesh>
    </group>)}
    <mesh position={[.41, -1.64, 0]}><boxGeometry args={[.03, .05, 3.82]} /><meshStandardMaterial color="#c5955d" emissive="#77431f" emissiveIntensity={.28} /></mesh>
  </group>;
}

function RightSculpturalCabinet() {
  return <group name="lara-right-sculptural-cabinet" position={[3.76, 2.38, -5.5]} rotation={[0, Math.PI, 0]}>
    <mesh><boxGeometry args={[.88, 4.48, 2.5]} /><meshPhysicalMaterial color="#19191c" metalness={.58} roughness={.3} clearcoat={.18} /></mesh>
    <mesh position={[.47, 0, 0]}><boxGeometry args={[.022, 4.12, 2.18]} /><meshPhysicalMaterial color="#dfba82" transparent opacity={.12} transmission={.3} roughness={.1} /></mesh>
    <mesh position={[.05, -.85, 0]} scale={[.64, .22, .82]}><sphereGeometry args={[1, 24, 16]} /><meshPhysicalMaterial color="#090a0c" metalness={.62} roughness={.28} clearcoat={.16} /></mesh>
    <mesh position={[.05, .32, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.68, .05, 8, 36]} /><meshPhysicalMaterial color="#be8b56" metalness={.88} roughness={.2} /></mesh>
    <mesh position={[.49, 1.92, 0]}><boxGeometry args={[.024, .04, 2.02]} /><meshStandardMaterial color="#d7a566" emissive="#875128" emissiveIntensity={.3} /></mesh>
  </group>;
}

function ArchiveFloorHeroes() {
  return <group name="lara-archive-floor-heroes">
    <group name="lara-black-panther-sculpture" position={[-2.94, .72, -4.55]} rotation={[0, -.34, 0]} scale={[5.25, 5.25, 5.25]}><mesh scale={[.43, .17, .2]} castShadow receiveShadow><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color="#050609" metalness={.72} roughness={.23} clearcoat={.24} /></mesh><mesh position={[-.34, .1, -.02]} rotation={[0, 0, -.2]} scale={[.2, .14, .14]}><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#050609" metalness={.72} roughness={.23} clearcoat={.24} /></mesh><mesh position={[.4, .03, .04]} rotation={[0, -.62, .22]}><coneGeometry args={[.09, .6, 14]} /><meshPhysicalMaterial color="#050609" metalness={.72} roughness={.23} clearcoat={.24} /></mesh></group>
    <group name="lara-luxury-flight-case" position={[3.05, .4, -4.55]} rotation={[0, -.22, 0]} scale={[3.45, 3.45, 3.45]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.74, .6, 1.14]} /><meshPhysicalMaterial color="#111216" metalness={.74} roughness={.28} clearcoat={.12} /></mesh>{[-.44, .44].map((z) => <mesh key={z} position={[-.42, .24, z]}><boxGeometry args={[.04, .48, .08]} /><meshStandardMaterial color="#bd8c57" metalness={.9} roughness={.18} /></mesh>)}</group>
    <group name="lara-designer-travel-bag" position={[-2.96, .46, 7.02]} rotation={[0, .18, 0]} scale={[3.0, 3.0, 3.0]}><mesh position={[0, .24, 0]} castShadow receiveShadow><boxGeometry args={[.68, .52, 1.16]} /><meshPhysicalMaterial color="#5b2730" metalness={.16} roughness={.48} clearcoat={.26} /></mesh><mesh position={[0, .64, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.3, .05, 8, 28, Math.PI]} /><meshPhysicalMaterial color="#d0a064" metalness={.9} roughness={.18} /></mesh></group>
  </group>;
}

function LaraArchitecturalArchive() {
  const [hero, editorial] = useCuratedLaraImages();
  return <group name="lara-architectural-archive">
    <LeftArchiveWall hero={hero} editorial={editorial} />
    <RightFashionInstallation />
    <RightMusicArchiveWall />
    <RightSculpturalCabinet />
    <ArchiveFloorHeroes />
    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.56, 2.62, 5.05]} intensity={1.08} />
    <ExhibitSpotlight position={[-2.68, 3.95, .9]} target={[-3.6, 2.58, 1.02]} intensity={.96} />
    <ExhibitSpotlight position={[-2.64, 3.76, -4.7]} target={[-3.58, 2.4, -5.48]} intensity={.9} />
    <ExhibitSpotlight position={[2.65, 3.8, 5.45]} target={[3.55, 2.42, 5.02]} intensity={1.1} />
    <ExhibitSpotlight position={[2.64, 3.85, .3]} target={[3.55, 2.48, .12]} intensity={1.0} />
    <ExhibitSpotlight position={[2.65, 3.76, -4.7]} target={[3.55, 2.38, -5.5]} intensity={.94} />
  </group>;
}

const MEMBER_IDENTITY_FINISHES = Object.freeze({
  sophia: { rug: '#d9c3a0', rugTrim: '#b98b50', panel: '#f0dfc4', panelAccent: '#62442e', cabinet: '#3b281f', glass: '#f7dfb3', ceiling: '#765137' },
  daniela: { rug: '#4a1823', rugTrim: '#b54552', panel: '#6c2733', panelAccent: '#1a0d11', cabinet: '#160d11', glass: '#e89272', ceiling: '#2f1017' },
  megan: { rug: '#25282d', rugTrim: '#aab2bb', panel: '#3b4047', panelAccent: '#14171b', cabinet: '#171a1f', glass: '#c9d1d8', ceiling: '#5a6068' },
  manon: { rug: '#1b1c20', rugTrim: '#70757b', panel: '#4d5055', panelAccent: '#17181b', cabinet: '#151619', glass: '#aab0b5', ceiling: '#303237' },
  yoonchae: { rug: '#f0b89a', rugTrim: '#d78d66', panel: '#f7d5bd', panelAccent: '#bc7654', cabinet: '#6d4937', glass: '#ffe7cf', ceiling: '#c68b67' },
});

function IdentityRug({ finish }) {
  return <group name="member-identity-rug" position={[0, .045, -.6]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6.45, 13.2]} /><meshPhysicalMaterial color={finish.rug} metalness={.12} roughness={.78} clearcoat={.06} /></mesh>
    <mesh position={[0, .012, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.97, 1, 4, 1]} /><meshBasicMaterial color={finish.rugTrim} transparent opacity={.62} /></mesh>
  </group>;
}

function IdentityWallPanel({ side, z, finish, rounded = false }) {
  return <group position={[side * 3.97, 2.55, z]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh><boxGeometry args={[3.15, 4.18, .055]} /><meshPhysicalMaterial color={finish.panel} metalness={.16} roughness={.64} clearcoat={.08} /></mesh>
    <mesh position={[0, 0, .037]}><boxGeometry args={[2.82, 3.84, .022]} /><meshPhysicalMaterial color={finish.panelAccent} metalness={.42} roughness={.42} clearcoat={.12} /></mesh>
    {rounded && <mesh position={[0, .02, .055]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[1.18, .055, 12, 48, Math.PI]} /><meshPhysicalMaterial color={finish.rugTrim} metalness={.68} roughness={.27} /></mesh>}
  </group>;
}

function EmptyDisplayCabinet({ side, z, finish }) {
  return <group name={`member-display-cabinet-${side}-${z}`} position={[side * 3.72, 2.28, z]} rotation={[0, side < 0 ? 0 : Math.PI, 0]}>
    <mesh><boxGeometry args={[.48, 4.25, 2.08]} /><meshPhysicalMaterial color={finish.cabinet} metalness={.58} roughness={.32} clearcoat={.18} /></mesh>
    <mesh position={[.255, .08, 0]}><boxGeometry args={[.025, 3.88, 1.75]} /><meshPhysicalMaterial color={finish.glass} transparent opacity={.13} transmission={.28} roughness={.11} /></mesh>
    <mesh position={[.27, 1.82, 0]}><boxGeometry args={[.02, .04, 1.62]} /><meshStandardMaterial color={finish.rugTrim} emissive={finish.rugTrim} emissiveIntensity={.32} /></mesh>
    <mesh position={[.02, -.98, 0]}><boxGeometry args={[.32, .035, 1.6]} /><meshPhysicalMaterial color={finish.rugTrim} metalness={.78} roughness={.22} /></mesh>
  </group>;
}

function CeilingTreatment({ finish }) {
  return <group name="member-ceiling-treatment">
    <mesh position={[0, 4.91, -.5]}><boxGeometry args={[5.9, .042, 15.8]} /><meshPhysicalMaterial color={finish.ceiling} metalness={.2} roughness={.58} /></mesh>
    {[-2.65, 2.65].map((x) => <mesh key={x} position={[x, 4.86, -.5]}><boxGeometry args={[.11, .05, 16.1]} /><meshPhysicalMaterial color={finish.rugTrim} metalness={.72} roughness={.24} /></mesh>)}
  </group>;
}

function MemberIdentityBuild({ preset }) {
  const finish = MEMBER_IDENTITY_FINISHES[preset];
  if (!finish) return null;
  const rounded = preset === 'yoonchae';
  return <group name={`${preset}-identity-build`}>
    <IdentityRug finish={finish} />
    <CeilingTreatment finish={finish} />
    <IdentityWallPanel side={-1} z={4.65} finish={finish} rounded={rounded} />
    <IdentityWallPanel side={-1} z={-2.75} finish={finish} rounded={rounded} />
    <IdentityWallPanel side={1} z={4.65} finish={finish} rounded={rounded} />
    <IdentityWallPanel side={1} z={-2.75} finish={finish} rounded={rounded} />
    <EmptyDisplayCabinet side={-1} z={-6.35} finish={finish} />
    <EmptyDisplayCabinet side={1} z={-6.35} finish={finish} />
  </group>;
}

function LaraLuxuryFinish() {
  return <group name="lara-luxury-finish">
    <IdentityRug finish={{ rug: '#08090b', rugTrim: '#9f7048' }} />
    <CeilingTreatment finish={{ ceiling: '#171316', rugTrim: '#9f7048' }} />
  </group>;
}

export default function LaraRoomDecor({ preset = 'lara' }) {
  if (preset !== 'lara') return <MemberIdentityBuild preset={preset} />;
  return <>
    <LaraLuxuryFinish />
    <FeatureWallBorder />
    <StandingMicrophone />
    <LaraExhibitionWalls />
    <LaraArchitecturalArchive />
  </>;
}
