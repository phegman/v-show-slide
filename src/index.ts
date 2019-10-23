import VShowSlideInterface from './interfaces/v-show-slide.interface'
import CustomEasing from './interfaces/custom-easing.interface'

const VShowSlide: VShowSlideInterface = {
  easingOptions: {
    builtIn: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
    custom: {},
  },
  targets: [],

  /**
   * Called when plugin is initialized
   */
  install(Vue, options) {
    this.validateOptions(options)
    Vue.directive('show-slide', {
      bind: this.bind.bind(this),
      inserted: this.inserted.bind(this),
      componentUpdated: this.componentUpdated.bind(this),
    })
  },

  /**
   * Bind directive hook. Called only once, when the directive is first bound to the element.
   */
  bind(el, binding) {
    this.parseArgs(el, binding)
  },

  /**
   * Inserted directive hook. Called when the bound element has been inserted into its parent node
   */
  inserted(el, binding) {
    this.initializeTarget(el, binding.value)
  },

  /**
   * Update directive hook. Called after the containing component’s VNode and the VNodes of its children have updated
   */
  componentUpdated(el, binding) {
    this.toggleSlide(el, binding)
  },

  /**
   * Get target by element
   */
  getTargetByEl(el) {
    // Use `filter` instead of `find` for IE 11 compatibility
    const target = this.targets.filter(target => target.el.isSameNode(el))[0]

    if (target === undefined) {
      throw 'Element not found!'
    }

    return target
  },

  /**
   * Set target property by element
   */
  setTargetPropertyByEl(el, property, value) {
    const target = this.getTargetByEl(el)
    const filteredTargets = this.targets.filter(
      target => !target.el.isSameNode(el)
    )

    this.targets = [
      ...filteredTargets,
      {
        ...target,
        [property]: value,
      },
    ]
  },

  /**
   * Validate options passed to plugin
   */
  validateOptions(options) {
    if (
      typeof options !== 'undefined' &&
      Object.prototype.hasOwnProperty.call(options, 'customEasing')
    ) {
      this.easingOptions.custom = options.customEasing as CustomEasing
    }
  },

  /**
   * Convert a string from kebab-case to camelCase
   */
  kebabToCamel(string) {
    return string.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase()
    })
  },

  /**
   * Fire a custom event
   */
  fireEvent(el, eventName) {
    // CustomEvent is supported
    if (typeof window.CustomEvent === 'function') {
      el.dispatchEvent(new CustomEvent(eventName))
    } else {
      // CustomEvent is not supported, fire the event the old fashioned way
      const event = document.createEvent('CustomEvent')
      event.initCustomEvent(eventName, false, false, null)
      el.dispatchEvent(event)
    }
  },

  /**
   * Parse directive arguments
   */
  parseArgs(el, binding) {
    if (
      Object.prototype.hasOwnProperty.call(binding, 'arg') &&
      typeof binding.arg === 'string'
    ) {
      const argsArray = binding.arg.split(':')
      const easing = this.validateEasing(argsArray)
      const duration = this.validateDuration(argsArray)

      this.targets.push({
        el,
        duration,
        durationInSeconds: `${duration / 1000}s`,
        easing,
        isAnimating: false,
      })
    } else {
      this.targets.push({
        el,
        duration: 300,
        durationInSeconds: '0.3s',
        easing: 'ease',
        isAnimating: false,
      })
    }
  },

  /**
   * Validate easing option
   */
  validateEasing(argsArray) {
    if (Object.prototype.hasOwnProperty.call(argsArray, 1)) {
      if (this.easingOptions.builtIn.indexOf(argsArray[1]) > -1) {
        return argsArray[1]
      } else if (
        Object.prototype.hasOwnProperty.call(
          this.easingOptions.custom,
          this.kebabToCamel(argsArray[1])
        )
      ) {
        return this.easingOptions.custom[this.kebabToCamel(argsArray[1])]
      } else {
        return 'ease'
      }
    } else {
      return 'ease'
    }
  },

  /**
   * Validate duration
   */
  validateDuration(argsArray) {
    return Object.prototype.hasOwnProperty.call(argsArray, 0)
      ? parseInt(argsArray[0])
      : 300
  },

  /**
   * Initialize styles on target element
   */
  initializeTarget(el, open) {
    if (!open) {
      el.style.height = '0px'
      el.style.visibility = 'hidden'
    }

    const { easing, durationInSeconds } = this.getTargetByEl(el)
    el.style.overflow = 'hidden'
    el.style.transition = `height ${easing} ${durationInSeconds}`
  },

  /**
   * Toggle the element
   */
  toggleSlide(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        this.slideOpen(el)
      } else {
        this.slideClosed(el)
      }
    }
  },

  /**
   * Slide element open
   */
  slideOpen(el) {
    this.fireEvent(el, 'slide-open-start')

    const { isAnimating, timeout, duration } = this.getTargetByEl(el)

    // Check if element is animating
    if (isAnimating) {
      clearTimeout(timeout)
    }

    // Set animating to true
    this.setTargetPropertyByEl(el, 'isAnimating', true)

    // Make element visible again
    el.style.visibility = 'visible'

    // Set element height to scroll height + calculated border height
    const scrollHeight = el.scrollHeight
    const computedStyle = window.getComputedStyle(el)
    const borderBottom = parseFloat(
      computedStyle.getPropertyValue('border-bottom-width')
    )
    const borderTop = parseFloat(
      computedStyle.getPropertyValue('border-top-width')
    )

    el.style.height = `${scrollHeight + borderBottom + borderTop}px`

    // Reset element height to auto after animating
    const newTimeout = setTimeout(() => {
      el.style.height = 'auto'
      this.setTargetPropertyByEl(el, 'isAnimating', false)

      this.fireEvent(el, 'slide-open-end')
    }, duration)

    this.setTargetPropertyByEl(el, 'timeout', newTimeout)
  },

  /**
   * Slide element closed
   */
  slideClosed(el) {
    this.fireEvent(el, 'slide-close-start')

    const { isAnimating, timeout, duration } = this.getTargetByEl(el)

    // Check if element is animating
    if (isAnimating) {
      clearTimeout(timeout)
    }

    // Set animating to true
    this.setTargetPropertyByEl(el, 'isAnimating', true)

    const scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    const forceRedraw = el.offsetLeft

    el.style.height = '0px'

    // Update isAnimating after animation is done
    // And set visibility to `hidden`
    const newTimeout = setTimeout(() => {
      this.setTargetPropertyByEl(el, 'isAnimating', false)
      el.style.visibility = 'hidden'

      this.fireEvent(el, 'slide-close-end')
    }, duration)

    this.setTargetPropertyByEl(el, 'timeout', newTimeout)
  },
}

export default VShowSlide
