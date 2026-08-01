import RoomLighting from '../RoomLighting';

export default function Lighting({ theme }) {
  return <RoomLighting preset={theme?.lightingPreset} />;
}
