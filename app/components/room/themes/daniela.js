import { baseTheme } from './baseTheme';
import DanielaFinalMuseum from '../DanielaFinalMuseum';

export default Object.freeze({
  ...baseTheme,
  id: 'daniela',
  materialPreset: 'daniela-burgundy',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'performance-gallery' }),
  decorComponent: DanielaFinalMuseum,
  frameStyle: Object.freeze({ borderColor: '#171419', borderMetalness: .84, borderRoughness: .2, backingColor: '#210d14', borderThickness: .18, depth: .16 }),
  frames: Object.freeze([
    { id: 'daniela-left-performance', src: '/hero-daniela-hq.png', position: [-3.9, 2.76, 5.05], rotation: [0, Math.PI / 2, .025], maxWidth: 2.92, maxHeight: 3.62 },
    { id: 'daniela-left-motion', src: '/daniela.png', position: [-3.9, 2.38, -2.32], rotation: [0, Math.PI / 2, -.03], maxWidth: 2.52, maxHeight: 3.08 },
    { id: 'daniela-right-performance', src: '/hero-daniela-hq.png', position: [3.9, 2.76, 5.05], rotation: [0, -Math.PI / 2, -.025], maxWidth: 2.92, maxHeight: 3.62 },
    { id: 'daniela-right-motion', src: '/daniela.png', position: [3.9, 2.38, -2.32], rotation: [0, -Math.PI / 2, .03], maxWidth: 2.52, maxHeight: 3.08 },
  ]),
  props: Object.freeze([]),
});
