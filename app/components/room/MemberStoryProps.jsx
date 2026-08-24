/* Curated, member-specific collections. These sit inside the established
   display bays/edge zones and intentionally leave the central aisle empty. */
import * as THREE from 'three';

const GOLD = '#caa06a';
const BLACK = '#141416';
const GLASS = '#d9eced';

function Metal({ color = GOLD, roughness = .22 }) { return <meshPhysicalMaterial color={color} metalness={.88} roughness={roughness} clearcoat={.24} clearcoatRoughness={.14} />; }
function Soft({ color = '#292226' }) { return <meshPhysicalMaterial color={color} metalness={.04} roughness={.78} clearcoat={.05} />; }
function Glass() { return <meshPhysicalMaterial color={GLASS} transmission={.42} transparent opacity={.22} roughness={.08} thickness={.08} ior={1.45} clearcoat={.7} />; }
function shadowProps() { return { castShadow: true, receiveShadow: true }; }

function GarmentRail({ position, tone = '#211d20', accent = '#b58b65', label }) {
  return <group name={label} position={position} rotation={[0, Math.PI / 2, 0]}>
    {[-.62, .62].map((z) => <mesh key={z} position={[0, 1.02, z]} {...shadowProps()}><cylinderGeometry args={[.025, .025, 2.04, 16]} /><Metal color={accent} /></mesh>)}
    <mesh position={[0, 2.02, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.032, .032, 1.38, 16]} /><Metal color={accent} /></mesh>
    {[-.38, 0, .38].map((z, index) => <group key={z} position={[.02, 1.32, z]}>
      <mesh position={[0, -.34, 0]} {...shadowProps()}><boxGeometry args={[.22, .67, .34]} /><Soft color={index === 1 ? tone : `${tone}`} /></mesh>
      <mesh position={[0, .05, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.13, .012, 8, 18]} /><Metal color={accent} /></mesh>
      <mesh position={[0, -.68, 0]} {...shadowProps()}><boxGeometry args={[.24, .04, .38]} /><Soft color={index === 1 ? '#32272a' : tone} /></mesh>
    </group>)}
    <mesh position={[0, .05, 0]} {...shadowProps()}><boxGeometry args={[.44, .08, 1.56]} /><Soft color="#1b1b1d" /></mesh>
  </group>;
}

function Handbag({ position, color = '#242326', accent = GOLD, name = 'designer-handbag' }) {
  return <group name={name} position={position}>
    <mesh {...shadowProps()} position={[0, .14, 0]} scale={[.27, .17, .2]}><sphereGeometry args={[1, 28, 18]} /><meshPhysicalMaterial color={color} roughness={.34} metalness={.12} clearcoat={.32} /></mesh>
    <mesh position={[0, .32, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.1, .62, 1]}><torusGeometry args={[.16, .018, 8, 24, Math.PI]} /><Metal color={accent} /></mesh>
    <mesh position={[0, .16, .205]}><boxGeometry args={[.09, .04, .012]} /><Metal color={accent} /></mesh>
  </group>;
}

function FootwearPair({ position, color = BLACK, tall = false, name = 'footwear-pair' }) {
  return <group name={name} position={position}>{[-.14, .14].map((x) => <group key={x} position={[x, 0, x * .18]} rotation={[0, x * 1.3, 0]}>
    <mesh position={[0, .075, .07]} {...shadowProps()} scale={[.11, .07, .28]}><sphereGeometry args={[1, 24, 14]} /><meshPhysicalMaterial color={color} metalness={.16} roughness={.48} clearcoat={.16} /></mesh>
    <mesh position={[0, tall ? .42 : .16, -.07]} {...shadowProps()}><boxGeometry args={[.13, tall ? .68 : .17, .14]} /><Soft color={color} /></mesh>
    <mesh position={[0, .04, -.15]}><boxGeometry args={[.06, .08, .04]} /><Metal color="#a78157" /></mesh>
  </group>)}</group>;
}

function JewelryTray({ position, name = 'jewelry-tray' }) {
  return <group name={name} position={position}>
    <mesh {...shadowProps()}><boxGeometry args={[.58, .07, .36]} /><Soft color="#281d20" /></mesh>
    {[-.18, 0, .18].map((x, index) => <mesh key={x} position={[x, .075, index === 1 ? .06 : -.02]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[.07 + index * .012, .009, 8, 20]} /><Metal /></mesh>)}
    <mesh position={[.02, .13, .1]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.12, .009, 8, 24]} /><Metal color="#e2bc82" /></mesh>
  </group>;
}

function PerfumeSet({ position, colors = ['#c59b72', '#3d2528', '#b8936a'], name = 'perfume-collection' }) {
  return <group name={name} position={position}>{[-.2, 0, .2].map((x, index) => <group key={x} position={[x, 0, index % 2 ? .03 : 0]}>
    <mesh position={[0, .12 + index * .015, 0]} {...shadowProps()}><cylinderGeometry args={[.055 + index * .007, .068, .24 + index * .03, 22]} /><meshPhysicalMaterial color={colors[index]} metalness={.38} roughness={.22} clearcoat={.58} /></mesh>
    <mesh position={[0, .27 + index * .03, 0]}><cylinderGeometry args={[.028, .028, .055, 16]} /><Metal color="#d5b476" /></mesh>
  </group>)}</group>;
}

function BookRun({ position, palette = ['#281f21', '#d3a06b', '#e4d0b1', '#463035'], name = 'fashion-book-run' }) {
  return <group name={name} position={position}>{[-.23, -.08, .07, .22].map((x, index) => <mesh key={x} position={[x, .15, 0]} rotation={[0, 0, index === 3 ? -.08 : 0]} {...shadowProps()}><boxGeometry args={[.11, .3 + index * .025, .28]} /><meshPhysicalMaterial color={palette[index % palette.length]} roughness={.48} metalness={.08} clearcoat={.1} /></mesh>)}</group>;
}

function VinylArchive({ position, name = 'vinyl-archive' }) {
  return <group name={name} position={position}>
    <mesh {...shadowProps()} position={[0, .09, 0]}><boxGeometry args={[.68, .18, .36]} /><Soft color="#19191b" /></mesh>
    <mesh position={[-.1, .205, -.02]}><boxGeometry args={[.42, .035, .29]} /><meshPhysicalMaterial color="#282225" metalness={.4} roughness={.32} /></mesh>
    <mesh position={[-.1, .23, -.02]} rotation={[-Math.PI / 2, 0, 0]}><cylinderGeometry args={[.13, .13, .012, 30]} /><meshPhysicalMaterial color="#0b0b0c" metalness={.38} roughness={.34} /></mesh>
    {[-.18, -.06, .06, .18].map((x, index) => <mesh key={x} position={[.22 + index * .035, .32, x]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.13, .13, .018, 30]} /><meshPhysicalMaterial color={index === 2 ? '#963b45' : '#141417'} metalness={.28} roughness={.42} /></mesh>)}
  </group>;
}

function StudioSet({ position, name = 'studio-microphone-and-headphones' }) {
  return <group name={name} position={position}>
    <mesh position={[-.17, .42, 0]}><cylinderGeometry args={[.02, .03, .76, 16]} /><Metal color="#7d8185" /></mesh>
    <mesh position={[-.17, .82, 0]}><capsuleGeometry args={[.075, .16, 6, 16]} /><meshPhysicalMaterial color="#d2d8da" metalness={.84} roughness={.25} /></mesh>
    <mesh position={[.16, .25, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.15, .024, 10, 28, Math.PI]} /><meshPhysicalMaterial color="#222428" metalness={.52} roughness={.28} /></mesh>
    {[-.15, .15].map((x) => <mesh key={x} position={[.16 + x, .16, 0]} scale={[.065, .1, .065]}><sphereGeometry args={[1, 18, 12]} /><Soft color="#1c1d20" /></mesh>)}
  </group>;
}

function Plush({ position, color = '#e9c8ab', ears = false, name = 'plush-companion' }) {
  return <group name={name} position={position}>
    <mesh position={[0, .2, 0]} {...shadowProps()} scale={[.18, .22, .14]}><sphereGeometry args={[1, 26, 18]} /><Soft color={color} /></mesh>
    <mesh position={[0, .46, 0]} {...shadowProps()} scale={[.14, .14, .13]}><sphereGeometry args={[1, 26, 18]} /><Soft color={color} /></mesh>
    {ears ? [-.07, .07].map((x) => <mesh key={x} position={[x, .66, 0]} {...shadowProps()} scale={[.035, .15, .04]}><sphereGeometry args={[1, 16, 10]} /><Soft color={color} /></mesh>) : <mesh position={[0, .6, -.08]} scale={[.12, .05, .05]}><sphereGeometry args={[1, 16, 10]} /><Soft color={color} /></mesh>}
    <mesh position={[0, .17, -.13]} scale={[.1, .04, .025]}><sphereGeometry args={[1, 16, 10]} /><meshPhysicalMaterial color="#f3a9a9" roughness={.68} /></mesh>
  </group>;
}

function FlowerVase({ position, tone = '#e5b4a8', name = 'fresh-flower-vase' }) {
  return <group name={name} position={position}>
    <mesh position={[0, .14, 0]} {...shadowProps()}><cylinderGeometry args={[.11, .15, .28, 28]} /><meshPhysicalMaterial color="#f4e8db" metalness={.12} roughness={.28} clearcoat={.36} /></mesh>
    {[-.1, 0, .1].flatMap((x) => [-.06, .07].map((z) => <group key={`${x}-${z}`} position={[x, .39 + Math.abs(x) * .25, z]}>
      <mesh rotation={[z * 2, 0, x * 1.7]}><cylinderGeometry args={[.008, .008, .32, 8]} /><meshStandardMaterial color="#547d53" roughness={.7} /></mesh>
      <mesh position={[0, .15, 0]} scale={[.07, .04, .07]}><sphereGeometry args={[1, 18, 12]} /><meshPhysicalMaterial color={tone} roughness={.44} clearcoat={.2} /></mesh>
    </group>))}
  </group>;
}

function StreetProps({ position, name = 'streetwear-accessories' }) {
  return <group name={name} position={position}>
    <mesh position={[-.16, .09, 0]} rotation={[0, 0, -.18]} {...shadowProps()}><boxGeometry args={[.14, .055, .58]} /><meshPhysicalMaterial color="#46352e" metalness={.08} roughness={.54} /></mesh>
    {[-.16, .16].map((z) => <mesh key={z} position={[-.16, .055, z]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.04, .015, 8, 16]} /><meshStandardMaterial color="#16171a" metalness={.7} roughness={.25} /></mesh>)}
    <mesh position={[.21, .11, .08]} {...shadowProps()}><sphereGeometry args={[.11, 22, 16]} /><meshPhysicalMaterial color="#9a6339" roughness={.52} /></mesh>
    <mesh position={[.2, .23, -.14]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.13, .025, 8, 24, Math.PI]} /><Soft color="#202124" /></mesh>
  </group>;
}

function Vanity({ position, tone = '#241a1c', name = 'makeup-vanity' }) {
  return <group name={name} position={position} rotation={[0, Math.PI / 2, 0]}>
    <mesh position={[0, .4, 0]} {...shadowProps()}><boxGeometry args={[1.25, .12, .46]} /><meshPhysicalMaterial color={tone} metalness={.3} roughness={.32} clearcoat={.32} /></mesh>
    {[-.48, .48].map((x) => <mesh key={x} position={[x, .2, 0]}><boxGeometry args={[.07, .42, .35]} /><Metal color="#a5795a" /></mesh>)}
    <mesh position={[0, 1.12, .03]}><boxGeometry args={[.72, .92, .045]} /><Glass /></mesh>
    {[-.31, 0, .31].map((x) => <mesh key={x} position={[x, .85, .08]}><sphereGeometry args={[.045, 16, 12]} /><meshStandardMaterial color="#fff1d7" emissive="#e7a65b" emissiveIntensity={.65} /></mesh>)}
    <PerfumeSet position={[-.22, .51, -.06]} name="vanity-cosmetic-organizers" />
  </group>;
}

function TrophySet({ position, name = 'performance-awards' }) {
  return <group name={name} position={position}>{[-.2, 0, .2].map((x, index) => <group key={x} position={[x, 0, 0]}>
    <mesh position={[0, .07, 0]}><cylinderGeometry args={[.09, .12, .14, 18]} /><meshPhysicalMaterial color="#211719" metalness={.44} roughness={.26} /></mesh>
    <mesh position={[0, .27 + index * .05, 0]} scale={[.07 + index * .012, .18 + index * .025, .07 + index * .012]}><sphereGeometry args={[1, 18, 12]} /><Metal color="#d9ad6f" /></mesh>
  </group>)}</group>;
}

const wall = (side, z, y = 1.15) => [side * 3.1, y, z];

function LegacyMemberStoryProps({ member }) {
  if (member === 'lara') return <group name="lara-luxury-dressing-room-story-props">
    <GarmentRail position={wall(-1, -5.7)} tone="#171417" accent="#a97c58" label="lara-fur-jacket-rail" />
    <GarmentRail position={wall(1, -5.65)} tone="#442526" accent="#c29964" label="lara-folded-fashion-rail" />
    <Vanity position={wall(-1, 3.15, .72)} tone="#1c1719" label="lara-illuminated-makeup-vanity" />
    <JewelryTray position={wall(-1, .05, 1.06)} name="lara-rings-necklaces-earrings-tray" />
    <PerfumeSet position={wall(1, .05, 1.03)} name="lara-luxury-perfume-collection" />
    <FootwearPair position={wall(1, 3.0, .33)} tall name="lara-knee-high-boot-pair" />
    <FootwearPair position={wall(1, -1.25, .34)} color="#6f4037" name="lara-high-heel-pair" />
    <Handbag position={wall(-1, -1.08, 1.05)} color="#29181b" name="lara-designer-handbag" />
    <BookRun position={wall(1, -3.42, 1.06)} name="lara-fashion-magazine-stack" />
  </group>;

  if (member === 'sophia') return <group name="sophia-elegant-boutique-story-props">
    <GarmentRail position={wall(-1, -5.85)} tone="#e5d7c4" accent="#d1a467" label="sophia-evening-dress-and-coat-rail" />
    <GarmentRail position={wall(1, -5.85)} tone="#8f7160" accent="#d1a467" label="sophia-tailored-coat-rail" />
    <Handbag position={wall(-1, 2.75, 1.08)} color="#c9a67a" name="sophia-luxury-handbag" />
    <Handbag position={wall(1, 2.75, 1.08)} color="#eee0c8" name="sophia-ivory-handbag" />
    <JewelryTray position={wall(-1, -.18, 1.08)} name="sophia-jewelry-presentation" />
    <PerfumeSet position={wall(1, -.18, 1.06)} colors={['#e8d7bb', '#bf9b72', '#f5ead7']} name="sophia-boutique-perfume-display" />
    <FootwearPair position={wall(-1, -2.55, .34)} color="#d9b985" name="sophia-designer-heel-pair" />
    <BookRun position={wall(1, -2.55, 1.05)} palette={['#312824', '#d1a467', '#eee1ca', '#7b5845']} name="sophia-fashion-book-stack" />
    <TrophySet position={wall(1, 5.45, 1.06)} name="sophia-leadership-awards" />
  </group>;

  if (member === 'megan') return <group name="megan-creative-music-studio-story-props">
    <VinylArchive position={wall(-1, 5.65, 1.05)} name="megan-record-player-and-vinyls" />
    <VinylArchive position={wall(1, 5.65, 1.05)} name="megan-album-and-cassette-archive" />
    <StudioSet position={wall(-1, .18, .75)} name="megan-studio-microphone-and-headphones" />
    <StudioSet position={wall(1, .18, .75)} name="megan-songwriting-studio-set" />
    <TrophySet position={wall(-1, -3.85, 1.02)} name="megan-music-and-dance-awards" />
    <BookRun position={wall(1, -3.85, 1.02)} palette={['#212226', '#784f42', '#d7b68d', '#343238']} name="megan-songwriting-notebooks-and-albums" />
    <Plush position={wall(-1, -1.6, .36)} color="#8c6245" name="megan-brown-teddy-bear" />
    <Vanity position={wall(1, -1.5, .67)} tone="#252124" label="megan-makeup-creative-station" />
  </group>;

  if (member === 'manon') return <group name="manon-street-fashion-story-props">
    <GarmentRail position={wall(-1, -5.85)} tone="#24272b" accent="#b38a58" label="manon-hoodie-cargo-and-jersey-rail" />
    <GarmentRail position={wall(1, -5.85)} tone="#3e302a" accent="#b38a58" label="manon-streetwear-jacket-rail" />
    <FootwearPair position={wall(-1, 3.1, .35)} color="#e3dfd1" name="manon-premium-sneaker-pair" />
    <FootwearPair position={wall(1, 3.1, .35)} color="#25272a" name="manon-black-sneaker-pair" />
    <Handbag position={wall(-1, -.1, 1.04)} color="#26282a" name="manon-crossbody-bag" />
    <Handbag position={wall(1, -.1, 1.04)} color="#433129" name="manon-duffel-bag" />
    <StreetProps position={wall(-1, -1.9, .22)} name="manon-skateboard-basketball-and-cap" />
    <BookRun position={wall(1, -2.55, 1.04)} palette={['#252629', '#837461', '#b58a57', '#393136']} name="manon-editorial-magazine-run" />
    <JewelryTray position={wall(-1, -3.5, 1.04)} name="manon-chains-and-street-accessory-tray" />
  </group>;

  if (member === 'daniela') return <group name="daniela-bold-glam-performance-story-props">
    <GarmentRail position={wall(-1, -5.9)} tone="#55202b" accent="#c89a60" label="daniela-faux-fur-and-leopard-performance-rail" />
    <GarmentRail position={wall(1, -5.9)} tone="#31171e" accent="#c89a60" label="daniela-glam-stage-fashion-rail" />
    <Vanity position={wall(-1, 2.95, .68)} tone="#35161d" label="daniela-lit-glam-vanity" />
    <PerfumeSet position={wall(1, 2.95, 1.06)} colors={['#6c1f31', '#c28759', '#1d1114']} name="daniela-cosmetics-and-perfume-display" />
    <FootwearPair position={wall(-1, -.16, .34)} color="#a6293a" name="daniela-performance-heel-pair" />
    <JewelryTray position={wall(1, -.16, 1.06)} name="daniela-performance-jewelry-tray" />
    <TrophySet position={wall(-1, -3.5, 1.06)} name="daniela-dance-trophies" />
    <BookRun position={wall(1, -3.5, 1.06)} palette={['#411923', '#c79a62', '#e4c2aa', '#682537']} name="daniela-performance-magazine-stack" />
    <Plush position={wall(1, -1.7, .32)} color="#9e6b52" name="daniela-faux-fur-hat-display" />
  </group>;

  return <group name="yoonchae-cute-korean-luxury-story-props">
    <Plush position={wall(-1, 5.55, 1.03)} color="#e8bb9f" name="yoonchae-large-teddy-bear" />
    <Plush position={wall(1, 5.55, 1.03)} color="#f0ded2" ears name="yoonchae-bunny-plush" />
    <Plush position={wall(-1, 1.1, 1.03)} color="#eac8ae" name="yoonchae-small-teddy-collection" />
    <FlowerVase position={wall(1, 1.1, 1.04)} tone="#efa0a9" name="yoonchae-pink-rose-bouquet" />
    <FlowerVase position={wall(-1, -3.45, 1.04)} tone="#f3cabd" name="yoonchae-cute-flower-vase" />
    <Handbag position={wall(1, -3.45, 1.04)} color="#f1c7b3" accent="#d7a36e" name="yoonchae-pastel-handbag" />
    <BookRun position={wall(-1, -5.85, 1.04)} palette={['#efd2c0', '#d99998', '#fbecdb', '#d6a16d']} name="yoonchae-polaroids-and-stationery" />
    <PerfumeSet position={wall(1, -5.85, 1.04)} colors={['#f4e2d0', '#eaa9a5', '#edcf9d']} name="yoonchae-korean-perfume-gift-set" />
    <StreetProps position={wall(1, -1.65, .22)} name="yoonchae-miniature-pastel-car-and-gifts" />
    <Plush position={wall(-1, -1.65, .3)} color="#f4d9d2" ears name="yoonchae-heart-cushion-and-bunny" />
  </group>;
}

/* The first collection pass was intentionally kept above for reference while
   this supported, zone-based composition replaces what is actually mounted. */
function StoryCabinet({ side, z, height = 2.45, width = 1.5, accent = GOLD, label, children }) {
  const inward = side < 0 ? .26 : -.26;
  return <group name={label} position={[side * 3.58, height / 2, z]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh {...shadowProps()}><boxGeometry args={[.46, height, width]} /><meshPhysicalMaterial color="#211c1c" metalness={.22} roughness={.38} clearcoat={.16} /></mesh>
    <mesh position={[inward, 0, 0]}><boxGeometry args={[.03, height - .16, width - .12]} /><meshPhysicalMaterial color="#dbe7e3" transmission={.35} transparent opacity={.16} roughness={.08} thickness={.06} clearcoat={.72} /></mesh>
    {[-height * .28, 0, height * .28].map((y) => <group key={y} position={[inward * .72, y, 0]}>
      <mesh {...shadowProps()}><boxGeometry args={[.1, .05, width - .18]} /><meshPhysicalMaterial color="#422d23" metalness={.1} roughness={.4} clearcoat={.16} /></mesh>
      <mesh position={[inward < 0 ? -.055 : .055, .07, 0]}><boxGeometry args={[.012, .014, width - .28]} /><meshStandardMaterial color="#ffe7bd" emissive="#d99347" emissiveIntensity={.86} /></mesh>
    </group>)}
    {[-1, 1].map((edge) => <mesh key={edge} position={[inward * 1.1, 0, edge * (width / 2 - .035)]}><boxGeometry args={[.04, height + .04, .04]} /><meshPhysicalMaterial color={accent} metalness={.9} roughness={.2} /></mesh>)}
    <mesh position={[inward * 1.1, height / 2 + .02, 0]}><boxGeometry args={[.04, .04, width]} /><meshPhysicalMaterial color={accent} metalness={.9} roughness={.2} /></mesh>
    <mesh position={[inward * 1.1, -height / 2 - .02, 0]}><boxGeometry args={[.04, .04, width]} /><meshPhysicalMaterial color={accent} metalness={.9} roughness={.2} /></mesh>
    <group position={[inward * 1.36, 0, 0]}>{children}</group>
  </group>;
}

function StoryConsole({ side, z, label, top = '#261d20', children }) {
  return <group name={label} position={[side * 3.04, .55, z]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh position={[0, .42, 0]} {...shadowProps()}><boxGeometry args={[1.4, .12, .5]} /><meshPhysicalMaterial color={top} metalness={.3} roughness={.3} clearcoat={.35} /></mesh>
    {[-.54, .54].map((x) => <mesh key={x} position={[x, .2, 0]}><boxGeometry args={[.07, .45, .36]} /><meshPhysicalMaterial color="#9e7757" metalness={.84} roughness={.24} /></mesh>)}
    <group position={[0, .51, 0]}>{children}</group>
  </group>;
}

function StoryBench({ side, z, color = '#30282c', label }) {
  return <group name={label} position={[side * 2.75, .28, z]} rotation={[0, side * .18, 0]}>
    <mesh position={[0, .25, 0]} {...shadowProps()}><boxGeometry args={[1.35, .22, .5]} /><meshPhysicalMaterial color={color} metalness={.04} roughness={.78} /></mesh>
    {[-.52, .52].map((x) => <mesh key={x} position={[x, .1, 0]}><boxGeometry args={[.055, .28, .38]} /><meshPhysicalMaterial color="#262527" metalness={.72} roughness={.28} /></mesh>)}
  </group>;
}

function StoryMannequin({ position, color = '#e7d7c0', label }) {
  return <group name={label} position={position}>
    <mesh position={[0, .06, 0]} {...shadowProps()}><cylinderGeometry args={[.38, .46, .12, 32]} /><meshPhysicalMaterial color="#282326" metalness={.5} roughness={.22} clearcoat={.42} /></mesh>
    <mesh position={[0, 1.1, 0]} {...shadowProps()} scale={[.25, .78, .32]}><capsuleGeometry args={[1, 1, 12, 24]} /><meshPhysicalMaterial color={color} metalness={.04} roughness={.72} /></mesh>
    <mesh position={[0, 2.1, 0]}><sphereGeometry args={[.15, 24, 16]} /><meshPhysicalMaterial color="#a88368" metalness={.35} roughness={.42} /></mesh>
  </group>;
}

function StoryPolaroidBoard({ side, z }) {
  return <group name="yoonchae-supported-polaroid-memory-board" position={[side * 3.81, 2.25, z]} rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <mesh {...shadowProps()}><boxGeometry args={[1.36, 1.58, .045]} /><meshPhysicalMaterial color="#efd4c5" roughness={.72} /></mesh>
    {[-.38, 0, .38].flatMap((x) => [-.42, .08, .42].map((y, index) => <group key={`${x}-${y}`} position={[x, y, .042]} rotation={[0, 0, index % 2 ? .06 : -.04]}>
      <mesh><boxGeometry args={[.27, .35, .02]} /><meshPhysicalMaterial color={index % 3 ? '#fbefe2' : '#dda9a0'} roughness={.6} /></mesh>
      <mesh position={[0, -.11, .014]}><boxGeometry args={[.21, .09, .01]} /><meshStandardMaterial color="#c99d90" roughness={.8} /></mesh>
    </group>))}
  </group>;
}

function StoryDiscoStand({ side, z }) {
  return <group name="daniela-disco-ball-on-spotlight-stand" position={[side * 3.05, .36, z]}>
    <mesh position={[0, .5, 0]}><cylinderGeometry args={[.022, .03, .95, 16]} /><meshPhysicalMaterial color="#b99a7b" metalness={.9} roughness={.18} /></mesh>
    <mesh position={[0, 1.05, 0]} {...shadowProps()}><sphereGeometry args={[.2, 28, 20]} /><meshPhysicalMaterial color="#c7ccd0" metalness={.92} roughness={.14} clearcoat={.36} /></mesh>
    <mesh position={[0, .05, 0]} {...shadowProps()}><cylinderGeometry args={[.28, .34, .1, 28]} /><meshPhysicalMaterial color="#211619" metalness={.6} roughness={.26} /></mesh>
  </group>;
}

function storyWall(side, z, y = 1.1) { return [side * 3.14, y, z]; }

export default function MemberStoryProps({ member }) {
  if (member === 'lara') return <group name="lara-celebrity-dressing-room-zones">
    <GarmentRail position={storyWall(-1, -5.85)} tone="#181519" accent="#ae805b" label="lara-hero-fur-and-luxury-dress-wardrobe" />
    <StoryCabinet side={1} z={-5.8} label="lara-supported-shoe-display" accent="#b98660"><FootwearPair position={[0, .72, -.26]} tall name="lara-knee-high-boots" /><FootwearPair position={[0, .02, .27]} color="#6a3a36" name="lara-evening-heels" /><Handbag position={[0, -.66, 0]} color="#271719" name="lara-handbag-in-shoe-cabinet" /></StoryCabinet>
    <StoryConsole side={1} z={1.45} label="lara-jewelry-island" top="#21171a"><JewelryTray position={[-.23, .04, 0]} name="lara-necklace-rings-and-bracelets" /><Handbag position={[.27, .04, 0]} color="#2b1b1e" name="lara-open-luxury-box" /></StoryConsole>
    <StoryConsole side={-1} z={1.45} label="lara-perfume-and-makeup-vanity" top="#1f1719"><PerfumeSet position={[-.2, .04, 0]} name="lara-perfume-collection" /><BookRun position={[.24, .04, 0]} name="lara-fashion-book-stack" /><mesh position={[0, .62, .02]}><boxGeometry args={[.7, .82, .04]} /><meshPhysicalMaterial color="#dce5e0" transmission={.25} transparent opacity={.2} roughness={.08} /></mesh></StoryConsole>
    <StoryBench side={-1} z={5.9} color="#34252b" label="lara-fur-dressing-bench" />
  </group>;

  if (member === 'megan') return <group name="megan-personal-music-studio-zones">
    <StoryCabinet side={-1} z={-5.85} label="megan-vinyl-and-cd-display-wall" accent="#ad895f"><VinylArchive position={[0, .72, -.24]} name="megan-record-player-and-vinyls" /><BookRun position={[0, .02, .25]} palette={['#202126', '#703f3a', '#d0b18d', '#36343a']} name="megan-cd-and-album-spines" /><TrophySet position={[0, -.66, 0]} name="megan-music-awards" /></StoryCabinet>
    <StoryCabinet side={1} z={-5.85} label="megan-studio-storage-cabinet" accent="#ad895f"><StudioSet position={[0, .72, -.24]} name="megan-headphones-and-microphone-display" /><BookRun position={[0, .02, .26]} name="megan-songwriting-notebooks" /><Plush position={[0, -.66, 0]} color="#8d6347" name="megan-brown-teddy-in-cabinet" /></StoryCabinet>
    <StoryConsole side={-1} z={1.55} label="megan-speaker-and-album-console" top="#252226"><VinylArchive position={[-.19, .04, 0]} name="megan-second-record-player" /><StudioSet position={[.25, .05, 0]} name="megan-studio-mic-stand" /></StoryConsole>
    <StoryBench side={1} z={5.95} color="#342e2b" label="megan-cozy-listening-bench" />
  </group>;

  if (member === 'daniela') return <group name="daniela-glam-backstage-zones">
    <StoryConsole side={-1} z={-5.65} label="daniela-backstage-illuminated-vanity" top="#35161d"><PerfumeSet position={[-.23, .04, 0]} colors={['#742036', '#c78e60', '#251116']} name="daniela-open-makeup-kit" /><JewelryTray position={[.25, .04, 0]} name="daniela-glam-accessory-tray" /><mesh position={[0, .66, .03]}><boxGeometry args={[.76, .9, .04]} /><meshPhysicalMaterial color="#dfe7e3" transmission={.22} transparent opacity={.2} roughness={.08} /></mesh></StoryConsole>
    <GarmentRail position={storyWall(1, -5.85)} tone="#6c2034" accent="#c89a60" label="daniela-sequined-and-animal-print-outfit-rack" />
    <StoryCabinet side={-1} z={1.38} label="daniela-performance-heels-and-trophy-case" accent="#c89a60"><FootwearPair position={[0, .72, -.25]} color="#a3283d" name="daniela-performance-heels" /><TrophySet position={[0, .02, .25]} name="daniela-dance-trophies" /><BookRun position={[0, -.66, 0]} palette={['#35131d', '#d2a16a', '#8b2436', '#ead0b1']} name="daniela-fashion-magazines" /></StoryCabinet>
    <StoryDiscoStand side={1} z={1.48} />
    <StoryBench side={1} z={5.9} color="#4b202b" label="daniela-backstage-dance-bench" />
  </group>;

  if (member === 'manon') return <group name="manon-streetwear-studio-zones">
    <StoryCabinet side={-1} z={-5.8} label="manon-sneaker-display-wall" accent="#b38a58"><FootwearPair position={[0, .72, -.28]} color="#ebe4d7" name="manon-white-sneakers" /><FootwearPair position={[0, .02, .28]} color="#222427" name="manon-black-sneakers" /><Handbag position={[0, -.66, 0]} color="#302a28" name="manon-crossbody-bag" /></StoryCabinet>
    <GarmentRail position={storyWall(1, -5.85)} tone="#2b2d2f" accent="#b38a58" label="manon-jersey-hoodie-and-cargo-rail" />
    <StoryConsole side={-1} z={1.5} label="manon-caps-chains-and-magazine-console" top="#292726"><BookRun position={[-.22, .04, 0]} palette={['#252629', '#887361', '#c79b63', '#42363a']} name="manon-street-editorials" /><JewelryTray position={[.25, .04, 0]} name="manon-chain-accessory-tray" /></StoryConsole>
    <StoryConsole side={1} z={1.5} label="manon-duffel-and-skateboard-storage" top="#292726"><Handbag position={[-.22, .04, 0]} color="#413229" name="manon-duffel-bag" /><mesh position={[.26, .08, 0]} rotation={[0, 0, -.16]} {...shadowProps()}><boxGeometry args={[.14, .045, .62]} /><meshPhysicalMaterial color="#45352e" roughness={.54} /></mesh></StoryConsole>
    <StoryBench side={1} z={6.0} color="#343335" label="manon-sports-bench" />
  </group>;

  if (member === 'sophia') return <group name="sophia-luxury-fashion-boutique-zones">
    <StoryCabinet side={-1} z={-5.85} label="sophia-designer-handbag-and-eyewear-cabinet" accent="#d1a467"><Handbag position={[0, .72, -.27]} color="#d0ae7e" name="sophia-champagne-handbag" /><Handbag position={[0, .02, .28]} color="#eee2ce" name="sophia-ivory-handbag" /><BookRun position={[0, -.66, 0]} palette={['#362b26', '#d1a467', '#eee2cf', '#715142']} name="sophia-luxury-fashion-books" /></StoryCabinet>
    <StoryCabinet side={1} z={-5.85} label="sophia-hats-sunglasses-and-jewelry-cabinet" accent="#d1a467"><JewelryTray position={[0, .72, -.26]} name="sophia-gold-accessories" /><PerfumeSet position={[0, .02, .25]} colors={['#ead7b9', '#c49b70', '#f5e9d6']} name="sophia-boutique-perfumes" /><FootwearPair position={[0, -.66, 0]} color="#d6b983" name="sophia-premium-heels" /></StoryCabinet>
    <StoryConsole side={-1} z={1.5} label="sophia-marble-pedestal-and-sculpture" top="#ddd0ba"><JewelryTray position={[-.22, .04, 0]} name="sophia-brass-sculpture-and-jewels" /><Handbag position={[.24, .04, 0]} color="#c8a478" name="sophia-clutch-on-pedestal" /></StoryConsole>
    <GarmentRail position={storyWall(1, 1.45)} tone="#e6d8c4" accent="#d1a467" label="sophia-premium-coat-stand" />
  </group>;

  return <group name="yoonchae-cute-cozy-luxury-zones">
    <StoryConsole side={-1} z={-5.75} label="yoonchae-cozy-plush-and-blanket-corner" top="#f2d8c6"><Plush position={[-.22, .04, 0]} color="#e8bc9f" name="yoonchae-large-teddy-bear" /><Plush position={[.22, .04, 0]} color="#f2e0d5" ears name="yoonchae-bunny-plush" /><mesh position={[0, .08, .18]} {...shadowProps()}><boxGeometry args={[.5, .09, .24]} /><meshPhysicalMaterial color="#e9b5af" roughness={.8} /></mesh></StoryConsole>
    <StoryCabinet side={1} z={-5.8} label="yoonchae-cute-bookshelf-and-toy-storage" accent="#d8a36f"><BookRun position={[0, .72, -.26]} palette={['#efd0bf', '#dd9997', '#f8eadb', '#d7a36f']} name="yoonchae-diary-and-stationery" /><Plush position={[0, .02, .24]} color="#eac8b0" name="yoonchae-small-teddy-collection" /><Handbag position={[0, -.66, 0]} color="#f1c7b2" name="yoonchae-gift-box-display" /></StoryCabinet>
    <StoryPolaroidBoard side={-1} z={1.6} />
    <StoryConsole side={1} z={1.5} label="yoonchae-flowers-and-pastel-lamp-table" top="#f4ded0"><FlowerVase position={[-.2, .04, 0]} tone="#ef9fa7" name="yoonchae-pink-rose-bouquet" /><PerfumeSet position={[.25, .04, 0]} colors={['#f5e3d0', '#eba9a3', '#efd39d']} name="yoonchae-small-gifts-and-perfume" /></StoryConsole>
    <StoryBench side={1} z={6.0} color="#efc5bc" label="yoonchae-heart-cushion-reading-bench" />
  </group>;
}
