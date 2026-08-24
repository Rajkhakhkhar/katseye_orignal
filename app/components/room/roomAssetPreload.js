import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import laraRunner from '../../assets/room/lara/lara-bronze-cheetah-runner.jpg';
import danielaRunner from '../../assets/room/daniela/daniela-burgundy-dance-runner.jpg';
import sofiaRug from '../../assets/room/sophia/sophia-ivory-monogram-rug.jpg';
import { getRoomGalleryFrames } from './roomGalleryFrames';
import { preloadRoomMaterialAssets } from './RoomMaterials';

const MEMBER_IDS = ['lara', 'sophia', 'daniela', 'megan', 'manon', 'yoonchae'];
const ROOM_MODULES = [
  () => import('./LaraFinalMuseum'),
  () => import('./SofiaLuxuryDecor'),
  () => import('./DanielaFinalMuseum'),
  () => import('./MeganIdentityArchitecture'),
  () => import('./ManonShowroomDecor'),
  () => import('./YoonchaeLuxuryDecor'),
];

const roomTextureUrls = Object.freeze([
  ...MEMBER_IDS.flatMap((member) => getRoomGalleryFrames(member).map((frame) => frame.src)),
  laraRunner,
  danielaRunner,
  sofiaRug,
]);

let roomPreloadStarted = false;

// This warms the exact R3F cache consumed by frames and decor. Fetch/decode is
// asynchronous; issuing the requests together lets the browser queue them
// before a visitor chooses a room, rather than serializing that work at entry.
export function preloadRoomAssets() {
  if (roomPreloadStarted || typeof window === 'undefined') return;
  roomPreloadStarted = true;
  THREE.Cache.enabled = true;
  preloadRoomMaterialAssets();
  useLoader.preload(THREE.TextureLoader, roomTextureUrls);
  ROOM_MODULES.forEach((loadRoomModule) => loadRoomModule().catch(() => {}));
}
