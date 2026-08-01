import { baseTheme } from './baseTheme';

export default Object.freeze({
  ...baseTheme,
  id: 'lara',
  surfacePreset: 'lara-cheetah-temp',
  lightingPreset: 'lara-cheetah',
  frameStyle: Object.freeze({
    borderColor: '#8f7658',
    borderMetalness: .78,
    borderRoughness: .3,
    backingColor: '#130f0c',
    borderThickness: .075,
    depth: .06,
  }),
  frames: Object.freeze([]),
});
