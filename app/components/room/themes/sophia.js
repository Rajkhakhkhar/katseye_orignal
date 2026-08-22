import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const SofiaLuxuryDecor = lazy(() => import('../SofiaLuxuryDecor'));

export default Object.freeze({
  ...baseTheme,
  id: 'sophia',
  materialPreset: 'sophia-luxury',
  lightingPreset: 'sophia-luxury',
  architecturePreset: Object.freeze({ id: 'luxury-gallery' }),
  decorComponent: SofiaLuxuryDecor,
  frameStyle: Object.freeze({ borderColor: '#d8b36b', borderMetalness: .9, borderRoughness: .2, backingColor: '#3a2b21', borderThickness: .16, depth: .12 }),
  frames: Object.freeze(getRoomGalleryFrames('sophia')),
  props: Object.freeze([]),
});
