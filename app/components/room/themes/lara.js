import { baseTheme } from './baseTheme';
import LaraFinalMuseum from '../LaraFinalMuseum';

export default Object.freeze({
  ...baseTheme,
  id: 'lara',
  surfacePreset: 'lara-cheetah-temp',
  lightingPreset: 'lara-cheetah',
  architecturePreset: Object.freeze({ id: 'black-fashion-penthouse' }),
  decorComponent: LaraFinalMuseum,
  frameStyle: Object.freeze({
    decorPreset: 'lara',
    borderColor: '#8f7658',
    borderMetalness: .78,
    borderRoughness: .3,
    backingColor: '#130f0c',
    borderThickness: .075,
    depth: .06,
  }),
  frames: Object.freeze([]),
});
