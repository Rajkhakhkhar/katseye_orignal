import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const YoonchaeLuxuryDecor = lazy(() => import('../YoonchaeLuxuryDecor'));

export default Object.freeze({
  ...baseTheme,
  id: 'yoonchae',
  materialPreset: 'yoonchae-peach',
  surfacePreset: 'yoonchae-peach',
  lightingPreset: 'yoonchae-daylight',
  architecturePreset: Object.freeze({ id: 'yoonchae-korean-luxury-gallery' }),
  decorComponent: YoonchaeLuxuryDecor,
  frameStyle: Object.freeze({ decorPreset: 'yoonchae', borderColor: '#f0e4cf', borderMetalness: .58, borderRoughness: .3, backingColor: '#e8d2b5', borderThickness: .1, depth: .09 }),
  frames: Object.freeze(getRoomGalleryFrames('yoonchae')),
  props: Object.freeze([]),
});
