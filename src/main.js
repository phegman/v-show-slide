import Vue from 'vue'
import App from './App.vue'
import VShowSlide from './v-show-slide.js'

Vue.use(VShowSlide, {
  customEasing: {
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
