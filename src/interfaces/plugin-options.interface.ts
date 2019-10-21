import CustomEasing from './custom-easing.interface'

export default interface PluginOptions {
  builtIn?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  customEasing?: CustomEasing
}
