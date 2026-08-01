import RoomLighting from '../RoomLighting';

// Every member begins in the same approved master-room light rig. Individual
// themes may opt into a different rig later, once their decoration pass starts.
export default function Lighting() {
  return <RoomLighting isLara />;
}
