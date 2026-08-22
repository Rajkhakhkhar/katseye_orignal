import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

// One inexpensive particle system shared by every room. It adds only the
// barely perceptible suspended dust expected in a lit museum, without adding
// per-object animation or shadow work.
export default function RoomAtmosphere() {
  const dust = useRef(null);
  const positions = useMemo(() => {
    const values = [];
    for (let index = 0; index < 44; index += 1) {
      values.push(
        ((index * 29) % 19 - 9) * .31,
        .55 + ((index * 17) % 39) * .1,
        -8.7 + ((index * 41) % 71) * .24,
      );
    }
    return new Float32Array(values);
  }, []);

  useFrame((state) => {
    if (!dust.current) return;
    dust.current.rotation.y = state.clock.elapsedTime * .0035;
    dust.current.position.y = Math.sin(state.clock.elapsedTime * .11) * .025;
  });

  return <points ref={dust} frustumCulled={false}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#fff4df" size={.018} sizeAttenuation transparent opacity={.13} depthWrite={false} />
  </points>;
}
