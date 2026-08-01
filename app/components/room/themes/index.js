import lara from './lara';
import sophia from './sophia';
import daniela from './daniela';
import megan from './megan';
import manon from './manon';
import yoonchae from './yoonchae';

const themes = Object.freeze({ lara, sophia, daniela, megan, manon, yoonchae });
const fallback = Object.freeze({
  id: 'default',
  lightingPreset: 'neutral-current',
  layoutPreset: 'master',
  content: {},
});

export function getMemberRoomTheme(member) {
  return themes[member?.id] || fallback;
}

export { themes as memberRoomThemes };
