import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const MeganIdentityArchitecture = lazy(() => import('../MeganIdentityArchitecture'));

export default Object.freeze({
  ...baseTheme,
  id: 'megan',
  materialPreset: 'megan-charcoal',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'creative-studio' }),
  decorComponent: MeganIdentityArchitecture,
  frameStyle: Object.freeze({ borderColor: '#1d2023', borderMetalness: .84, borderRoughness: .24, backingColor: '#0c0e10', borderThickness: .12, depth: .1 }),
  frames: Object.freeze(getRoomGalleryFrames('megan')),
  props: Object.freeze([]),
});
