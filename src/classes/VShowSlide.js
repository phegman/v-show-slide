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
      update: this.update.bind(this)
    })
  }

  /**
   * Bind directive hook. Called only once, when the directive is first bound to the element.
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  bind (el, binding) {
    this.parseArgs(binding)
    this.open = binding.value
  }

  /**
   * Inserted directive hook. Called when the bound element has been inserted into its parent node
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  inserted (el, binding) {
    this.initializeTarget(el)
  }

  /**
   * Update directive hook. Called after the containing component’s VNode has updated
   * @param {Node} el Element directive is bound to
   * @param {Object} binding Binding options
   */
  update (el, binding) {
    this.toggleSlide(el)
  }

  /**
   * Validate options passed to plugin
   * @param {Object} options Options passed to plugin
   */
  validateOptions (options) {
    if (typeof variable !== 'undefined' && options.hasOwnProperty('customEasing')) {
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
   * @param {Object} binding Binding options
   */
  parseArgs (binding) {
    if (binding.hasOwnProperty('arg')) {
      const argsArray = binding.arg.split(':')
      this.validateEasing(argsArray)
      this.validateDuration(argsArray)
    } else {
      this.duration = 300
      this.durationInSeconds = '0.3s'
      this.easing = 'ease'
    }
  }

  /**
   * Validate easing option
   * @param {Array} argsArray Array of arguments
   */
  validateEasing (argsArray) {
    if (argsArray.hasOwnProperty(1)) {
      if (this.easingOptions.builtIn.includes(argsArray[1])) {
        this.easing = argsArray[1]
      } else if (this.easingOptions.custom.hasOwnProperty(this.kebabToCamel(argsArray[1]))) {
        this.easing = this.easingOptions.custom[this.kebabToCamel(argsArray[1])]
      } else {
        this.easing = 'ease'
      }
    } else {
      this.easing = 'ease'
    }
  }

  /**
   * Validate duration
   * @param {Array} argsArray Array of arguments
   */
  validateDuration (argsArray) {
    this.duration = argsArray.hasOwnProperty(0) ? parseInt(argsArray[0]) : 300
    this.durationInSeconds = `${this.duration / 1000}s`
  }

  /**
   * Initialize styles on target element
   * @param {Node} el Element directive is bound to
   */
  initializeTarget (el) {
    if (!this.open) {
      el.style.height = '0px'
    }

    el.style.overflow = 'hidden'
    el.style.transition = `height ${this.easing} ${this.durationInSeconds}`
  }

  /**
   * Slide the target element
   * @param {Node} el Element directive is bound to
   */
  toggleSlide (el) {
    if (this.open) {
      this.slideClosed(el)
    } else {
      this.slideOpen(el)
    }
  }

  /**
   * Slide element open
   * @param {Node} el Element directive is bound to
   */
  slideOpen (el) {
    // Check if element is animating
    if (this.isAnimating) {
      clearTimeout(this.timeout)
    }

    // Set animating to true
    this.isAnimating = true

    // Set element height to scroll height
    let scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`

    // Reset element height to auto after animating
    this.timeout = setTimeout(() => {
      el.style.height = 'auto'
      this.isAnimating = false
    }, this.duration)

    // Mark element as closed
    this.open = true
  }

  /**
   * Slide element closed
   * @param {Node} el Element directive is bound to
   */
  slideClosed (el) {
    // Check if element is animating
    if (this.isAnimating) {
      clearTimeout(this.timeout)
    }

    // Set animating to true
    this.isAnimating = true

    // Set element height to scroll height
    let scrollHeight = el.scrollHeight
    el.style.height = `${scrollHeight}px`

    // Very short timeout before setting height of element to 0
    setTimeout(() => {
      el.style.height = '0px'
    }, 25)

    // Update isAnimating after animation is done
    this.timeout = setTimeout(() => {
      this.isAnimating = false
    }, this.duration)

    // Mark element as closed
    this.open = false
  }
}
