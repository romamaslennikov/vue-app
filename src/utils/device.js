export const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints;

export const isPortrait = () => window.matchMedia('(orientation: portrait)').matches;

export const isMobileDevice = () =>
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);

export const iOS = (() =>
  ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
    navigator.platform,
  ) ||
  // iPad on iOS 13 detection
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document))();

export const isMac = navigator.platform.toUpperCase().includes('MAC');

export default {
  isTouch,
  isMobileDevice,
  isPortrait,
  iOS,
  isMac,
};
