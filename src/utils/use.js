export function intiLazyBackground() {
  const lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));

  if ('IntersectionObserver' in window) {
    const lazyBackgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('-visible');
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach((lazyBackground) => {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
}

export function slideToggle(e) {
  const { currentTarget } = e;

  const { nextSibling } = currentTarget;

  const { scrollHeight } = nextSibling;

  const { height } = nextSibling.style;

  currentTarget.classList.toggle('-active');

  if (!height) {
    nextSibling.style.height = `${scrollHeight}px`;

    nextSibling.ontransitionend = () => {
      nextSibling.style.height = 'auto';
    };
  } else {
    nextSibling.ontransitionend = null;

    nextSibling.style.height = `${scrollHeight}px`;

    setTimeout(() => {
      nextSibling.removeAttribute('style');
    });
  }
}

export function getImageUrl(name) {
  return new URL(name, import.meta.url).href;
}
