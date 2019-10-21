import Vue from 'vue'
import Demo from './Demo.vue'
import VShowSlide from './index'

Vue.use(VShowSlide, {
  customEasing: {
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
})

new Vue({
  render: h => h(Demo),
}).$mount('#app')
