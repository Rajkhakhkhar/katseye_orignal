import { baseTheme } from './baseTheme';
import YoonchaeLuxuryDecor from '../YoonchaeLuxuryDecor';

export default Object.freeze({
  ...baseTheme,
  id: 'yoonchae',
  materialPreset: 'yoonchae-peach',
  surfacePreset: 'yoonchae-peach',
  lightingPreset: 'yoonchae-daylight',
  architecturePreset: Object.freeze({ id: 'yoonchae-korean-luxury-gallery' }),
  decorComponent: YoonchaeLuxuryDecor,
  frameStyle: Object.freeze({ decorPreset: 'yoonchae', borderColor: '#d79a70', borderMetalness: .68, borderRoughness: .32, backingColor: '#fff4e7', borderThickness: .08, depth: .055 }),
  frames: Object.freeze([
    { id: 'yoonchae-left-hero', src: '/hero-yoonchae-hq.png', position: [-3.91, 3.0, 3.8], rotation: [0, Math.PI / 2, -.1], maxWidth: 2.3, maxHeight: 2.65 },
    { id: 'yoonchae-left-low', src: '/yoonchae.png', position: [-3.91, 1.7, -3.05], rotation: [0, Math.PI / 2, .12], maxWidth: 1.78, maxHeight: 1.98 },
    { id: 'yoonchae-right-hero', src: '/hero-yoonchae-hq.png', position: [3.91, 3.0, 3.8], rotation: [0, -Math.PI / 2, .1], maxWidth: 2.3, maxHeight: 2.65 },
    { id: 'yoonchae-right-low', src: '/yoonchae.png', position: [3.91, 1.7, -3.05], rotation: [0, -Math.PI / 2, -.12], maxWidth: 1.78, maxHeight: 1.98 },
  ]),
  props: Object.freeze([]),
});
