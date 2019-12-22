import Card from '../src/components/Card.vue'
import VShowSlide from '../src/index'
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VShowSlide, {
  customEasing: {
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
})

describe('Card', () => {
  it('Can slide open with default options', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(true)
    }, 300)
  })

  it('Can slide closed with default options', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
        initialOpen: true,
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(false)
    }, 300)
  })

  it('Can slide open with options set', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
        duration: '500',
        easing: 'ease-in',
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(true)
    }, 500)
  })

  it('Can slide closed with options set', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
        duration: '500',
        easing: 'ease-in',
        initialOpen: true,
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(false)
    }, 500)
  })

  it('Can slide open with custom easing', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
        duration: '400',
        easing: 'example-easing',
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(true)
    }, 400)
  })

  it('Can slide closed with custom easing', () => {
    const wrapper = mount(Card, {
      localVue,
      propsData: {
        id: 'default-options',
        title: 'Default Options',
        description: 'Default Options',
        duration: '400',
        easing: 'example-easing',
        initialOpen: true,
      },
    })

    wrapper.find('.toggle-features').trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.features').isVisible()).toBe(false)
    }, 400)
  })
})
