import { useLayoutEffect, useRef } from 'react';
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
  return <group name="lara-backstage-flight-case" position={[4.34, 1.66, -1.38]} rotation={[0, Math.PI, 0]} scale={[1.62, 1.62, 1.62]}>
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
  return <group name="lara-abstract-panther-accent" position={[-4.34, 3.28, 1.65]} rotation={[0, -.28, 0]} scale={[2.08, 2.08, 2.08]}>
    <mesh scale={[.34, .14, .16]} castShadow><sphereGeometry args={[1, 20, 14]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
    <mesh position={[-.25, .07, -.02]} rotation={[0, 0, -.2]} scale={[.14, .1, .1]}><sphereGeometry args={[1, 16, 12]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
    <mesh position={[.27, .03, .03]} rotation={[0, -.6, .22]}><coneGeometry args={[.07, .42, 12]} /><meshPhysicalMaterial color="#0c0d0f" metalness={.43} roughness={.5} /></mesh>
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

    <ExhibitSpotlight position={[-2.65, 3.78, 5.45]} target={[-3.78, 2.64, 5.45]} intensity={.74} />
    <ExhibitSpotlight position={[2.65, 3.46, 5.32]} target={[3.78, 1.84, 5.32]} intensity={.68} />
    <ExhibitSpotlight position={[-2.68, 3.36, 5.98]} target={[-3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.36, 5.98]} target={[3.78, 1.86, 5.98]} intensity={.54} />
    <ExhibitSpotlight position={[2.68, 3.28, -1.38]} target={[3.78, 1.92, -1.38]} intensity={.62} />
    <ExhibitSpotlight position={[-2.68, 4.08, 1.65]} target={[-3.78, 3.3, 1.65]} intensity={.58} />
  </group>;
}
export default function LaraRoomDecor() {
  return <>
    <FeatureWallBorder />
    <StandingMicrophone />
    <LaraExhibitionWalls />
    <LaraIdentityObjects />
  </>;
}
