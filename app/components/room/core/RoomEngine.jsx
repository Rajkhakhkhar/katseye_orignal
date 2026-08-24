import CameraController from './CameraController';
import Lighting from './Lighting';
import RoomAudio from './RoomAudio';
import RoomAtmosphere from './RoomAtmosphere';
import RoomLayout from './RoomLayout';
import { getMemberRoomTheme } from '../themes';

// The shared runtime for every member room. Theme files only describe identity;
// movement, rendering, loading, and exit flow stay in one place.
export default function RoomEngine({ member, onReady }) {
  const theme = getMemberRoomTheme(member);

  return <>
    <RoomAudio member={member} />
    <CameraController onReady={onReady} />
    {/* Lara's completed museum layer already supplies its own art-directed
        lighting. Mounting the generic rig as well created more than sixty
        duplicate dynamic lights and was the primary room-entry bottleneck. */}
    {theme.id !== 'lara' && <Lighting theme={theme} />}
    <RoomAtmosphere />
    <RoomLayout member={member} theme={theme} />
  </>;
}
