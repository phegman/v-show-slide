import VShowSlide from '../src/interfaces/v-show-slide.interface'

describe('v-show-slide directive', () => {
  let VShowSlide: VShowSlide = require('../src/index').default
  let el = document.createElement('ul')

  beforeEach(() => {
    el = document.createElement('ul')
    jest.resetModules()
    VShowSlide = require('../src/index').default
  })

  it('parses easing argument when set', () => {
    VShowSlide.parseArgs(el, {
      arg: '5000:ease-in',
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].easing).toBe('ease-in')
  })

  it('defaults to ease if no arguments are set', () => {
    VShowSlide.parseArgs(el, {
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].easing).toBe('ease')
  })

  it('defaults to ease if duration is set but easing is not easing', () => {
    VShowSlide.parseArgs(el, {
      arg: '5000',
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].easing).toBe('ease')
  })

  it('parses duration argument when set', () => {
    VShowSlide.parseArgs(el, {
      arg: '5000',
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].duration).toBe(5000)
  })

  it('parses duration argument when both duration and easing are set', () => {
    VShowSlide.parseArgs(el, {
      arg: '5000:ease-in',
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].duration).toBe(5000)
  })

  it('defaults duration to 300 if no arguments are set', () => {
    VShowSlide.parseArgs(el, {
      modifiers: {},
      name: 'show-slide',
    })
    expect(VShowSlide.targets[0].duration).toBe(300)
  })

  it('sets custom easing options when plugin is installed', () => {
    VShowSlide.validateOptions({
      customEasing: {
        fooBar: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    })
    expect(VShowSlide.easingOptions.custom.fooBar).toBe(
      'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    )
  })

  it('uses custom easing option', () => {
    VShowSlide.validateOptions({
      customEasing: {
        fooBar: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    })
    VShowSlide.parseArgs(el, {
      arg: '5000:foo-bar',
      modifiers: {},
      name: 'show-slide',
    })

    expect(VShowSlide.targets[0].easing).toBe(
      'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    )
  })

  it('uses default options if custom easing options are not set but passed as an argument', () => {
    VShowSlide.parseArgs(el, {
      arg: '5000:foo-bar',
      modifiers: {},
      name: 'show-slide',
    })

    expect(VShowSlide.targets[0].easing).toBe('ease')
  })

  test('kebabToCamel', () => {
    expect(VShowSlide.kebabToCamel('foo-bar')).toBe('fooBar')
  })

  test('getTargetByEl', () => {
    const target = {
      el,
      duration: 300,
      durationInSeconds: '0.3s',
      easing: 'ease',
      isAnimating: false,
    }

    VShowSlide.targets.push(target)

    expect(VShowSlide.getTargetByEl(el)).toMatchObject(target)
  })

  test('setTargetPropertyByEl', () => {
    const target = {
      el,
      duration: 300,
      durationInSeconds: '0.3s',
      easing: 'ease',
      isAnimating: false,
    }

    VShowSlide.targets.push(target)

    VShowSlide.setTargetPropertyByEl(el, 'easing', 'ease-in')

    expect(VShowSlide.targets[0].easing).toBe('ease-in')
  })
})
