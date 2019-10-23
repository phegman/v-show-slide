[![Travis](https://img.shields.io/travis/phegman/v-show-slide.svg)](https://travis-ci.org/phegman/v-show-slide/)

# v-show-slide

A Vue.js directive for animating an element from `height: auto` to `height: 0px` and vice-versa.

- 👻 **3kb (1kb gzipped)**
- 📦 **No dependencies**
- 🌚 **TypeScript support**
- ⚙ **Uses CSS transitions**
- 🕺 **Support for custom easings**

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Accessibility](#accessibility-a11y)
- [Browser Support](#browser-support)
- [Support](#support)
- [Contributing](#contributing)

## Overview

There is no pure CSS way to animate an element to or from `height: auto`, this Vue.js directive solves this. It works the same way as `v-show` but will show the element with a sliding animation.

## Demo

Demo can be viewed here: [http://v-show-slide.peterhegman.com/](http://v-show-slide.peterhegman.com/)  
Source code for demo can be viewed in `src/Demo.vue`

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

```vue
<template>
  <div id="app" class="app">
    <ul id="features" v-show-slide="featuresOpen" class="features">
      <li>Aliquam lorem</li>
      <li>Praesent porttitor nulla vitae posuere</li>
      <li>Suspendisse nisl elit rhoncus</li>
      <li>Donec mi odio faucibus</li>
      <li>Curabitur suscipit suscipit</li>
    </ul>
    <button
      @click="toggleFeatures"
      class="toggle-features"
      aria-controls="features"
      :aria-expanded="featuresOpen ? 'true' : 'false'"
    >
      {{ featuresOpen ? 'Hide Features' : 'View Features' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      featuresOpen: false,
    }
  },
  methods: {
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen
    },
  },
}
</script>
```

### Defining duration and easing

By default duration is set to 300ms and easing is set to `ease`.

To override this, duration and easing can be passed as arguments to the directive. Duration should be defined in milliseconds. Built in easing options are: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`

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
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
})
```

Your custom easing can then be used like so (make sure to convert easing name to kebab-case):

`v-show-slide:400:example-easing`

### Events

Events are fired on the same element the directive was defined on. Below are the available events:

| Event              | Description                                    |
| ------------------ | ---------------------------------------------- |
| @slide-open-start  | Fired when the element starts sliding open     |
| @slide-open-end    | Fired when the element finishes sliding open   |
| @slide-close-start | Fired when the element starts sliding closed   |
| @slide-close-end   | Fired when the element finishes sliding closed |

Example:

```vue
<template>
  <div id="app" class="app">
    <ul
      id="features"
      v-show-slide="featuresOpen"
      class="features"
      @slide-open-start="slideOpenStart"
      @slide-open-end="slideOpenEnd"
      @slide-close-start="slideCloseStart"
      @slide-close-end="slideCloseEnd"
    >
      <li>Aliquam lorem</li>
      <li>Praesent porttitor nulla vitae posuere</li>
      <li>Suspendisse nisl elit rhoncus</li>
      <li>Donec mi odio faucibus</li>
      <li>Curabitur suscipit suscipit</li>
    </ul>
    <button
      @click="toggleFeatures"
      class="toggle-features"
      aria-controls="features"
      :aria-expanded="featuresOpen ? 'true' : 'false'"
    >
      {{ featuresOpen ? 'Hide Features' : 'View Features' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      featuresOpen: false,
    }
  },
  methods: {
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen
    },
    slideOpenStart() {
      console.log('Slide Open Start')
    },
    slideOpenEnd() {
      console.log('Slide Open End')
    },
    slideCloseStart() {
      console.log('Slide Close Start')
    },
    slideCloseEnd() {
      console.log('Slide Close End')
    },
  },
}
</script>
```

## Accessibility (A11y)

This directive will prevent child elements of the sliding element from being focusable when closed. Other than that it does not handle any other aspects of a11y such as adding or removing of `aria` attributes. Check out the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) for more information. The most basic setup is to use `aria-expanded` and `aria-controls` as shown in the above [example](#usage).

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                     | ✅                                                                                                                                                                                                               | ✅                                                                                                                                                                                                           | ✅                                                                                                                                                                                                           | > iOS 9                                                                                                                                                                                                                      |

## Support

Please [open an issue](https://github.com/phegman/v-show-slide/issues/new/) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/phegman/v-show-slide/compare).
