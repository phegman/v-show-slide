import VShowSlide from '../src/classes/VShowSlide.js'

let testVShowSlide

beforeEach(() => {
  testVShowSlide = new VShowSlide()
})

test('easing argument is parsed when set', () => {
  testVShowSlide.parseArgs({
    arg: '5000:ease-in'
  })
  expect(testVShowSlide.easing).toBe('ease-in')
})

test('if no easing is set it defaults to ease', () => {
  testVShowSlide.parseArgs({})
  expect(testVShowSlide.easing).toBe('ease')
})

test('duration argument is parsed when set', () => {
  testVShowSlide.parseArgs({
    arg: '5000:ease-in'
  })
  expect(testVShowSlide.duration).toBe(5000)
})

test('if no duration is set it defaults to 300', () => {
  testVShowSlide.parseArgs({})
  expect(testVShowSlide.duration).toBe(300)
})

test('convert kebab-case to camelCase', () => {
  expect(testVShowSlide.kebabToCamel('foo-bar')).toBe('fooBar')
})

test('custom easing options can be set when plugin is installed', () => {
  testVShowSlide.validateOptions({
    customEasing: {
      fooBar: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  })
  expect(testVShowSlide.easingOptions.custom.fooBar).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
})

test('custom easing option can be used', () => {
  testVShowSlide.validateOptions({
    customEasing: {
      fooBar: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  })
  testVShowSlide.parseArgs({
    arg: '5000:foo-bar'
  })
  expect(testVShowSlide.easing).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
})
