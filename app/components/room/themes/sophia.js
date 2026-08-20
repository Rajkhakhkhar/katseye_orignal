import { baseTheme } from './baseTheme';
import SofiaLuxuryDecor from '../SofiaLuxuryDecor';

export default Object.freeze({
  ...baseTheme,
  id: 'sophia',
  materialPreset: 'sophia-luxury',
  lightingPreset: 'sophia-luxury',
  architecturePreset: Object.freeze({ id: 'luxury-gallery' }),
  decorComponent: SofiaLuxuryDecor,
  frameStyle: Object.freeze({ borderColor: '#d1a567', borderMetalness: .9, borderRoughness: .18, backingColor: '#3a2419', borderThickness: .21, depth: .16 }),
  frames: Object.freeze([
    { id: 'sophia-left-portrait', src: '/hero-sophia-hq.png', position: [-3.9, 2.74, 4.92], rotation: [0, Math.PI / 2, 0], maxWidth: 2.9, maxHeight: 3.72 },
    { id: 'sophia-left-editorial', src: '/sophia.png', position: [-3.9, 2.42, -2.15], rotation: [0, Math.PI / 2, 0], maxWidth: 2.48, maxHeight: 2.92 },
    { id: 'sophia-right-portrait', src: '/hero-sophia-hq.png', position: [3.9, 2.74, 4.92], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.9, maxHeight: 3.72 },
    { id: 'sophia-right-editorial', src: '/sophia.png', position: [3.9, 2.42, -2.15], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.48, maxHeight: 2.92 },
  ]),
  props: Object.freeze([]),
});
