const baseFrameStyle = Object.freeze({
  borderColor: '#9ca5ad',
  borderMetalness: .7,
  borderRoughness: .36,
  backingColor: '#171b20',
  borderThickness: .075,
  depth: .055,
});

export const baseTheme = Object.freeze({
  id: 'base',
  surfacePreset: 'base-neutral',
  lightingPreset: 'base-gallery',
  layoutPreset: 'master',
  frameStyle: baseFrameStyle,
  frames: Object.freeze([]),
  props: Object.freeze([]),
  atmosphere: Object.freeze({}),
  interactions: Object.freeze([]),
});

export function createNeutralMemberTheme(id) {
  return Object.freeze({ ...baseTheme, id, frames: Object.freeze([]), props: Object.freeze([]) });
}
