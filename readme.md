[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/v-show-slide)
[![Travis](https://img.shields.io/travis/phegman/v-show-slide.svg)](https://travis-ci.org/phegman/v-show-slide/)

# v-show-slide 
A Vue.js directive for animating an element to and from `height: auto`

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Overview
There is no pure CSS way to animate an element to or from `height: auto`. This Vue.js directive solves this. It works the same way as `v-show` but will show the element with a sliding animation. Duration and easing can be defined on the directive.

## Demo
Demo can be viewed here: [http://v-show-slide.peterhegman.com/](http://v-show-slide.peterhegman.com/)    
Source code for demo can be viewed in `src/App.vue`

## Installation

### Yarn

`yarn add v-show-slide`

### NPM

`npm install v-show-slide --save`

### Install the Vue plugin

In your main JS file first import this plugin

`import VShowSlide from 'v-show-slide'`

Install the plugin

`Vue.use(VShowSlide)`

## Usage

Once the plugin is installed the `v-show-slide` directive can be used in any of your components. This directive works the same way as `v-show`. If the value is `true` the element will slide open, if the value is `false` the element will slide closed.

Example:

```html
<template>
  <div id="app" class="app">
    <ul v-show-slide="featuresOpen" class="features">
      <li>Aliquam lorem</li>
      <li>Praesent porttitor nulla vitae posuere</li>
      <li>Suspendisse nisl elit rhoncus</li>
      <li>Donec mi odio faucibus</li>
      <li>Curabitur suscipit suscipit</li>
    </ul>
    <button @click="toggleFeatures" class="toggle-features">{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button>
  </div>
</template>
```

```js
<script>
export default {
  name: 'App',
  data () {
    return {
      featuresOpen: false
    }
  },
  methods: {
    toggleFeatures () {
      this.featuresOpen = !this.featuresOpen
    }
  }
}
</script>
```

### Defining duration and easing

By default duration is set to 300ms and easing is set to `ease`.

To override this duration and easing can be defined directly on the directive. Duration should be defined in milliseconds. Built in easing options are: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`

Duration and easing can be set in this format `v-show-slide:duration:easing`

Example:

```html
<ul v-show-slide:400:ease-in="featuresOpen" class="features">
  <li>Aliquam lorem</li>
  <li>Praesent porttitor nulla vitae posuere</li>
  <li>Suspendisse nisl elit rhoncus</li>
  <li>Donec mi odio faucibus</li>
  <li>Curabitur suscipit suscipit</li>
</ul>
```

### Custom easing

If you want to define custom easing using `cubic-bezier` this can be done when installing the plugin. Pass an options object as the second parameter in `Vue.use`.

Example:

```js
Vue.use(VShowSlide, {
  customEasing: {
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
})
```

Your custom easing can then be used like so (make sure to convert easing name to kebab-case):

`v-show-slide:400:example-easing`

## Support

Please [open an issue](https://github.com/phegman/v-show-slide/issues/new/) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/phegman/v-show-slide/compar/e).