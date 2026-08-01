import { Canvas } from '@react-three/fiber';
import { Component, useEffect, useState } from 'react';
import RoomArchitecture from './room/RoomArchitecture';
import RoomLighting from './room/RoomLighting';
import PlayerControls from './room/RoomInteractions';
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


function MuseumRoom({ member, onReady }) {
  return <>
    <PlayerControls onReady={onReady} />
    <RoomLighting isLara={member.id === 'lara'} />
    <RoomArchitecture member={member} />
  </>;
}

export default function DoorExperience({ member, onExit }) {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(false), [member.id]);

  return <section className="door-experience" role="dialog" aria-modal="true" aria-label={`${member.name}'s interactive museum room`}>
    <RoomErrorBoundary fallback={<div className="door-experience-fallback">The room could not start. Please return to the doors and try again.</div>}>
      <Canvas className="door-experience-canvas" camera={{ position: [0, ROOM.cameraHeight, ROOM.entranceZ + 1.4], fov: 60 }} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#0b0b0d']} />
        <fog attach="fog" args={['#0b0b0d', 7, 24]} />
        <MuseumRoom member={member} onReady={() => setReady(true)} />
      </Canvas>
    </RoomErrorBoundary>
    <div className="door-experience-hud" aria-live="polite">
      <span>{member.name.toUpperCase()} / ROOM STUDY</span>
      <p>{ready ? 'CLICK TO LOOK · WASD OR ARROWS TO EXPLORE' : 'ENTERING ROOM'}</p>
    </div>
    <button className="door-experience-exit" type="button" onClick={onExit}>EXIT TO DOORS</button>
  </section>;
}
