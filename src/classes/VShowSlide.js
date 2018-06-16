export default class VShowSlide {
  constructor () {
    this.easingOptions = {
      builtIn: [
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out'
      ],
      custom: {}
    }
  }

  /**
   * Called when plugin is initialized
   * @param {Object} Vue The Vue instance
   * @param {Object} options Options passed to plugin
   */
  install (Vue, options) {
    this.validateOptions(options)
    Vue.directive('show-slide', {
      bind: this.bind.bind(this),
      inserted: this.inserted.bind(this),
      componentUpdated: this.componentUpdated.bind(this)
    })
  }

  /**
   * Bind directive hook. Called only once, when the directive is first bound to the element.
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  bind (el, binding) {
    this.parseArgs(el, binding)
  }

  /**
   * Inserted directive hook. Called when the bound element has been inserted into its parent node
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  inserted (el, binding) {
    this.initializeTarget(el, binding.value)
  }

  /**
   * Update directive hook. called after the containing component’s VNode and the VNodes of its children have updated
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  componentUpdated (el, binding) {
    this.toggleSlide(el, binding)
  }

  /**
   * Validate options passed to plugin
   * @param {Object} options Options passed to plugin
   */
  validateOptions (options) {
    if (typeof options !== 'undefined' && options.hasOwnProperty('customEasing')) {
      this.easingOptions.custom = options.customEasing
    }
  }

  /**
   * Convert a string from kebab-case to camelCase
   * @param {String} string String to convert to camelCase
   */
  kebabToCamel (string) {
    return string.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase()
    })
  }

  /**
   * Parse directive arguments
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  parseArgs (el, binding) {
    if (binding.hasOwnProperty('arg')) {
      const argsArray = binding.arg.split(':')
      this.validateEasing(el, argsArray)
      this.validateDuration(el, argsArray)
    } else {
      el.duration = 300
      el.durationInSeconds = '0.3s'
      el.easing = 'ease'
    }
  }

  /**
   * Validate easing option
   * @param {Node} el Element directive is bound to
   * @param {Array} argsArray Array of arguments
   */
  validateEasing (el, argsArray) {
    if (argsArray.hasOwnProperty(1)) {
      if (this.easingOptions.builtIn.includes(argsArray[1])) {
        el.easing = argsArray[1]
      } else if (this.easingOptions.custom.hasOwnProperty(this.kebabToCamel(argsArray[1]))) {
        el.easing = this.easingOptions.custom[this.kebabToCamel(argsArray[1])]
      } else {
        el.easing = 'ease'
      }
    } else {
      el.easing = 'ease'
    }
  }

  /**
   * Validate duration
   * @param {Node} el Element directive is bound to
   * @param {Array} argsArray Array of arguments
   */
  validateDuration (el, argsArray) {
    el.duration = argsArray.hasOwnProperty(0) ? parseInt(argsArray[0]) : 300
    el.durationInSeconds = `${el.duration / 1000}s`
  }

  /**
   * Initialize styles on target element
   * @param {Node} el Element directive is bound to
   * @param {Node} el Element directive is bound to
   */
  initializeTarget (el, open) {
    if (!open) {
      el.style.height = '0px'
    }

    el.style.overflow = 'hidden'
    el.style.transition = `height ${el.easing} ${el.durationInSeconds}`
  }

  /**
   * Slide the target element
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  toggleSlide (el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        this.slideOpen(el)
      } else {
        this.slideClosed(el)
      }
    }
  }

  /**
   * Slide element open
   * @param {Node} el Element directive is bound to
   */
  slideOpen (el) {
    // Check if element is animating
    if (el.isAnimating) {
      clearTimeout(el.timeout)
    }

    // Set animating to true
    el.isAnimating = true

    // Set element height to scroll height
    let scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`

    // Reset element height to auto after animating
    el.timeout = setTimeout(() => {
      el.style.height = 'auto'
      el.isAnimating = false
    }, el.duration)
  }

  /**
   * Slide element closed
   * @param {Node} el Element directive is bound to
   */
  slideClosed (el) {
    // Check if element is animating
    if (el.isAnimating) {
      clearTimeout(el.timeout)
    }

    // Set animating to true
    el.isAnimating = true

    // Set element height to scroll height
    let scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`

    // Very short timeout before setting height of element to 0
    setTimeout(() => {
      el.style.height = '0px'
    }, 25)

    // Update isAnimating after animation is done
    el.timeout = setTimeout(() => {
      el.isAnimating = false
    }, el.duration)
  }
}
