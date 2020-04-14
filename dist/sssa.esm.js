/**
 * Super simple scroll animations
 * ------------------------------------------------------------------------------
 * Intersection observer-based CSS scroll animations.
 *
 * @namespace superSimpleScrollAnimations
 */

/**
 * DOM selectors.
 */
const selectors = {
  scrollElement: '[js-scroll-animation]',
};

/**
 * Create a new scroll animation object.
 * @param {Number} threshold - Intersection observer threshold.
 * @param {Boolean} enableExitAnimations - Removes `is-visible` class when element leaves viewport.
 */
export default (threshold, enableExitAnimations) => {
  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    scrollElement: [...document.querySelectorAll(selectors.scrollElement)],
  };

  /**
   * Initialise component.
   */
  function init() {
    document.body.classList.add('sssa-enabled');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold,
    };

    nodeSelectors.scrollElement.forEach((element) => {
      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(element);
    });
  }

  /**
   * Handles intersection event.
   * @param {Object} entries - Intersection entries.
   */
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      const target = entry.target;

      if (!isVisible(target)) {
        if (enableExitAnimations) {
          target.classList.remove('is-visible');
        }

        return;
      }

      target.classList.add('is-visible');
    });
  }

  /**
   * Detects if a part of an element is in the viewport.
   * @param {HTMLElement} element - Element to check.
   * @returns {Boolean} - True if element is at least partially in viewport.
   */
  function isVisible(element) {
    const windowHeight = window.innerHeight;

    const elementRectangle = element.getBoundingClientRect();
    const elementTop = elementRectangle.top;
    const elementBottom = elementRectangle.bottom;

    const topInView = (elementTop > 0) && (elementTop < windowHeight);
    const bottomInView = (elementBottom > 0) && (elementBottom < windowHeight);

    return (topInView || bottomInView);
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
