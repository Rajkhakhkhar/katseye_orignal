export default function EmptyFrame({ position, rotation, accent, hero = false }) {
  const width = hero ? 2.8 : 2.2;
  const height = hero ? 2 : 1.6;
  return <group position={position} rotation={rotation}>
    <mesh>
      <planeGeometry args={[width + 0.3, height + 0.3]} />
      <meshStandardMaterial color={accent} metalness={0.32} roughness={0.48} />
    </mesh>
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#3c3c40" roughness={0.8} />
    </mesh>
  </group>;
}
