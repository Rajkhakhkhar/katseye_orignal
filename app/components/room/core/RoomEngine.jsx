import CameraController from './CameraController';
import Lighting from './Lighting';
import RoomLayout from './RoomLayout';
import { getMemberRoomTheme } from '../themes';

// The shared runtime for every member room. Theme files only describe identity;
// movement, rendering, loading, and exit flow stay in one place.
export default function RoomEngine({ member, onReady }) {
  const theme = getMemberRoomTheme(member);

  return <>
    <CameraController onReady={onReady} />
    <Lighting theme={theme} />
    <RoomLayout member={member} theme={theme} />
  </>;
}
