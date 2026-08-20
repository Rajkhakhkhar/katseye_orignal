import { baseTheme } from './baseTheme';
import ManonShowroomDecor from '../ManonShowroomDecor';

export default Object.freeze({
  ...baseTheme,
  id: 'manon',
  materialPreset: 'manon-concrete',
  surfacePreset: 'manon-concrete',
  lightingPreset: 'base-gallery',
  architecturePreset: Object.freeze({ id: 'asymmetrical-paris-showroom' }),
  decorComponent: ManonShowroomDecor,
  frameStyle: Object.freeze({ decorPreset: 'manon', borderColor: '#62666b', borderMetalness: .76, borderRoughness: .42, backingColor: '#151619', borderThickness: .07, depth: .05 }),
  frames: Object.freeze([
    { id: 'manon-rear-editorial-hero', src: '/hero-manon-hq.png', position: [-1.02, 2.5, -9.62], rotation: [0, 0, 0], maxWidth: 2.28, maxHeight: 3.18, frameStyle: { borderColor: '#151718', borderMetalness: .93, borderRoughness: .13, backingColor: '#111315', borderThickness: .13, depth: .09 } },
    { id: 'manon-front-editorial', src: '/manon.png', position: [3.88, 2.75, 4.95], rotation: [0, -Math.PI / 2, .03], maxWidth: 2.34, maxHeight: 3.1 },
    { id: 'manon-side-crop', src: '/hero-manon-hq.png', position: [-3.88, 2.42, .75], rotation: [0, Math.PI / 2, -.06], maxWidth: 1.48, maxHeight: 2.34 },
  ]),
  props: Object.freeze([]),
});
