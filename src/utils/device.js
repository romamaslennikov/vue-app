export const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints;

export const isPortrait = () => window.matchMedia('(orientation: portrait)').matches;

export const iOS = () => [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod',
].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

export default {
  isTouch,
  isPortrait,
  iOS,
};
