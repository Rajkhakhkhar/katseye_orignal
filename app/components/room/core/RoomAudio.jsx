import { useLayoutEffect } from 'react';

const ROOM_TRACKS = Object.freeze({
  lara: '/audio/lara-animal.mpeg',
  sofia: '/audio/sofia-internet-girl.mpeg',
  daniela: '/audio/daniela-gabriela.mpeg',
  megan: '/audio/megan-pinky-up.mpeg',
  manon: '/audio/manon-iconic.mpeg',
  yoonchae: '/audio/yoonchae-touch.mpeg',
});

function getMemberId(member) {
  const values = [member?.id, member?.name]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());
  const value = values.find((candidate) => ROOM_TRACKS[candidate] || candidate === 'sophia');
  return value === 'sophia' ? 'sofia' : value;
}

// Audio is intentionally local to the mounted room. Entering a room mounts a
// fresh element; leaving it disposes that exact element, so re-entry cannot
// inherit stale manager, visited-room, or playback state.
export default function RoomAudio({ member }) {
  const memberId = getMemberId(member);

  useLayoutEffect(() => {
    const source = ROOM_TRACKS[memberId];
    if (!source || typeof Audio === 'undefined') return undefined;

    const audio = new Audio(source);
    let disposed = false;
    let waitingForGesture = false;

    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = .4;
    audio.currentTime = 0;

    const removeRetryListeners = () => {
      window.removeEventListener('pointerdown', retryFromGesture, true);
      window.removeEventListener('keydown', retryFromGesture, true);
    };

    const retryFromGesture = () => {
      if (waitingForGesture) play();
    };

    const play = () => {
      if (disposed) return;
      const attempt = audio.play();
      if (!attempt || typeof attempt.catch !== 'function') return;
      attempt.then(() => {
        waitingForGesture = false;
        removeRetryListeners();
      }).catch(() => {
        if (disposed) return;
        waitingForGesture = true;
        window.addEventListener('pointerdown', retryFromGesture, true);
        window.addEventListener('keydown', retryFromGesture, true);
      });
    };

    play();

    return () => {
      disposed = true;
      removeRetryListeners();
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {
        // The element is being discarded; a media element without metadata
        // cannot seek yet, but it has already been paused.
      }
      audio.removeAttribute('src');
      audio.load();
    };
  }, [memberId]);

  return null;
}
