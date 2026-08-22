import { baseTheme } from './baseTheme';
import { lazy } from 'react';
import { getRoomGalleryFrames } from '../roomGalleryFrames';

const LaraFinalMuseum = lazy(() => import('../LaraFinalMuseum'));

export default Object.freeze({
  ...baseTheme,
  id: 'lara',
  surfacePreset: 'lara-cheetah-temp',
  lightingPreset: 'lara-cheetah',
  architecturePreset: Object.freeze({ id: 'black-fashion-penthouse' }),
  decorComponent: LaraFinalMuseum,
  frameStyle: Object.freeze({
    decorPreset: 'lara',
    borderColor: '#4a3022',
    borderMetalness: .78,
    borderRoughness: .3,
    backingColor: '#100d0c',
    borderThickness: .11,
    depth: .1,
  }),
  frames: Object.freeze(getRoomGalleryFrames('lara')),
});
