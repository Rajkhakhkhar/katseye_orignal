import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const ManonShowroomDecor = lazy(() => import('../ManonShowroomDecor'));

export default Object.freeze({
  ...baseTheme,
  id: 'manon',
  materialPreset: 'manon-concrete',
  surfacePreset: 'manon-concrete',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'asymmetrical-paris-showroom' }),
  decorComponent: ManonShowroomDecor,
  frameStyle: Object.freeze({ decorPreset: 'manon', borderColor: '#4b3023', borderMetalness: .72, borderRoughness: .34, backingColor: '#131416', borderThickness: .11, depth: .09 }),
  frames: Object.freeze(getRoomGalleryFrames('manon')),
  props: Object.freeze([]),
});
