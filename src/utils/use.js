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

  currentTarget.parentNode?.classList.toggle('-active');

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

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function mergeObjects(...sources) {
  let acc = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const source of sources) {
    if (source instanceof Function) {
      acc = source;
    } else if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = [];
      }
      acc = [...acc, ...source];
    } else if (source instanceof Object) {
      // eslint-disable-next-line no-restricted-syntax,prefer-const
      for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object && key in acc) {
          value = mergeObjects(acc[key], value);
        }
        acc = { ...acc, [key]: value };
      }
    }
  }
  return acc;
}

export async function downloadAsset(src, name = 'image.png') {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = name;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  } catch (e) {
    console.log(e);
  }
}
