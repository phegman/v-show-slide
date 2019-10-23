import Target from './target.interface'
import { DirectiveBinding } from 'vue/types/options'
import EasingOptions from './easing-options.interface'
import PluginOptions from './plugin-options.interface'
import { PluginFunction, DirectiveFunction } from 'vue'

export default interface VShowSlide {
  targets: Target[]
  easingOptions: EasingOptions
  install: PluginFunction<PluginOptions>
  bind: DirectiveFunction
  inserted: DirectiveFunction
  componentUpdated: DirectiveFunction
  getTargetByEl: (el: HTMLElement) => Target
  setTargetPropertyByEl: <T>(
    el: HTMLElement,
    property: string,
    value: T
  ) => void
  validateOptions: (options?: PluginOptions) => void
  kebabToCamel: (string: string) => string
  parseArgs: (el: HTMLElement, binding: DirectiveBinding) => void
  fireEvent: (el: HTMLElement, eventName: string) => void
  validateEasing: (argsArray: string[]) => string
  validateDuration: (argsArray: string[]) => number
  initializeTarget: (el: HTMLElement, open: boolean) => void
  toggleSlide: (el: HTMLElement, binding: DirectiveBinding) => void
  slideOpen: (el: HTMLElement) => void
  slideClosed: (el: HTMLElement) => void
}
