<template>
  <div class="container">
    <div class="row">
      <card
        id="default-options"
        title="Default Options"
        description="v-show-slide with default options. No arguments set."
      />
      <card
        id="options-set"
        title="With Options"
        description="v-show-slide with duration and easing arguments."
        :duration="500"
        easing="ease-in"
      />
      <card
        id="custom-easing"
        title="Custom Easing"
        description="v-show-slide with custom cubic-bezier easing set."
        :duration="400"
        easing="example-easing"
      />
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Card from './components/Card.vue'

@Component({
  components: { Card },
})
export default class Demo extends Vue {}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  background-color: #f4f7fd;
}

.container {
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-left: -15px;
  margin-right: -15px;
}
</style>
