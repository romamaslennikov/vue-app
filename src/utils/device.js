export const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

export const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

export const isPortrait = () => window.innerWidth / window.innerHeight <= 1;

export default {
  isIE11,
  isTouch,
  isPortrait,
};
