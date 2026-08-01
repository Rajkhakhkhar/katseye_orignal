import { Canvas } from '@react-three/fiber';
import { Component, useEffect, useState } from 'react';
import * as THREE from 'three';
import RoomEngine from './room/core/RoomEngine';
import { ROOM } from './room/roomConfig';
import './DoorExperience.css';

class RoomErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}


export default function DoorExperience({ member, onExit }) {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(false), [member.id]);

  return <section className="door-experience" role="dialog" aria-modal="true" aria-label={`${member.name}'s interactive museum room`}>
    <RoomErrorBoundary fallback={<div className="door-experience-fallback">The room could not start. Please return to the doors and try again.</div>}>
      <Canvas className="door-experience-canvas" camera={{ position: [0, ROOM.cameraHeight, ROOM.entranceZ + 1.4], fov: 60 }} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}>
        <color attach="background" args={['#151a20']} />
        <fog attach="fog" args={['#202830', 13, 31]} />
        <RoomEngine member={member} onReady={() => setReady(true)} />
      </Canvas>
    </RoomErrorBoundary>
    <div className="door-experience-hud" aria-live="polite">
      <span>{member.name.toUpperCase()} / ROOM STUDY</span>
      <p>{ready ? 'CLICK TO LOOK · WASD OR ARROWS TO EXPLORE' : 'ENTERING ROOM'}</p>
    </div>
    <button className="door-experience-exit" type="button" onClick={onExit}>EXIT TO DOORS</button>
  </section>;
}
