import RoomArchitecture from '../RoomArchitecture';

// Every member begins with the exact same approved master room. The selected
// member still travels through the engine for future theme content, but never
// changes the shell during this foundation phase.
export default function RoomLayout({ member }) {
  return <RoomArchitecture member={{ ...member, id: 'lara' }} />;
}
