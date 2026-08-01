import PlayerControls from '../RoomInteractions';

// Backed by the established controller so this refactor cannot change movement.
export default function CameraController(props) {
  return <PlayerControls {...props} />;
}
