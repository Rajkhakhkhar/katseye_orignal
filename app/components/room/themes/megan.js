import { baseTheme } from './baseTheme';
import MeganIdentityArchitecture from '../MeganIdentityArchitecture';

export default Object.freeze({
  ...baseTheme,
  id: 'megan',
  materialPreset: 'megan-charcoal',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'creative-studio' }),
  decorComponent: MeganIdentityArchitecture,
  frameStyle: Object.freeze({ borderColor: '#b9c2ca', borderMetalness: .9, borderRoughness: .16, backingColor: '#111317', borderThickness: .18, depth: .16 }),
  frames: Object.freeze([
    { id: 'megan-left-hero', src: '/hero-megan-hq.png', position: [-3.9, 2.76, 5.0], rotation: [0, Math.PI / 2, 0], maxWidth: 2.92, maxHeight: 3.58 },
    { id: 'megan-left-look', src: '/megan.png', position: [-3.9, 2.4, -2.28], rotation: [0, Math.PI / 2, 0], maxWidth: 2.5, maxHeight: 3.04 },
    { id: 'megan-right-hero', src: '/hero-megan-hq.png', position: [3.9, 2.76, 5.0], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.92, maxHeight: 3.58 },
    { id: 'megan-right-look', src: '/megan.png', position: [3.9, 2.4, -2.28], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.5, maxHeight: 3.04 },
  ]),
  props: Object.freeze([]),
});
