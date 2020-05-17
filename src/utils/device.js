export const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

export const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

export const isPortrait = () => window.matchMedia('(orientation: portrait)').matches;

export default {
  isIE11,
  isTouch,
  isPortrait,
};
