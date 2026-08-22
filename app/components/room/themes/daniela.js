import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const DanielaFinalMuseum = lazy(() => import('../DanielaFinalMuseum'));

export default Object.freeze({
  ...baseTheme,
  id: 'daniela',
  materialPreset: 'daniela-burgundy',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'performance-gallery' }),
  decorComponent: DanielaFinalMuseum,
  frameStyle: Object.freeze({ borderColor: '#9d7054', borderMetalness: .88, borderRoughness: .22, backingColor: '#210d14', borderThickness: .14, depth: .11 }),
  frames: Object.freeze(getRoomGalleryFrames('daniela')),
  props: Object.freeze([]),
});
