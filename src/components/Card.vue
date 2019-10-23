<template>
  <div class="card">
    <div class="card-wrap">
      <div class="card-header">
        <h2 class="card-title">{{ title }}</h2>
        <!-- /.card-title -->
      </div>
      <!-- /.card-header -->
      <div class="card-content">
        <p>{{ description }}</p>
        <ul
          :id="id"
          v-show-slide:[directiveArg]="open"
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
          <li>
            <a href="https://peterhegman.com">Focusable link</a>
          </li>
        </ul>
        <!-- /.features -->
        <button
          @click="toggleFeatures"
          class="toggle-features"
          :aria-controls="id"
          :aria-expanded="open ? 'true' : 'false'"
        >
          {{ open ? 'Hide Features' : 'View Features' }}</button
        ><!-- /.toggle-features -->
      </div>
      <!-- /.card-content -->
    </div>
    <!-- /.card-wrap -->
  </div>
  <!-- /.card -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CardDefault extends Vue {
  @Prop({ required: true }) readonly id!: string
  @Prop({ required: true }) readonly title!: string
  @Prop({ required: true }) readonly description!: string
  @Prop() readonly duration: number
  @Prop() readonly easing: string
  @Prop({ default: false }) readonly initialOpen!: boolean

  open = this.initialOpen

  get directiveArg() {
    if (this.duration && this.easing) {
      return `${this.duration}:${this.easing}`
    } else if (this.duration) {
      return this.duration
    } else {
      return undefined
    }
  }

  toggleFeatures() {
    this.open = !this.open
  }

  slideOpenStart() {
    console.log('Slide Open Start')
  }

  slideOpenEnd() {
    console.log('Slide Open End')
  }

  slideCloseStart() {
    console.log('Slide Close Start')
  }

  slideCloseEnd() {
    console.log('Slide Close End')
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: 0 15px;
  margin-top: 15px;

  @media screen and (min-width: 992px) {
    width: 33.333333%;
    margin-top: 0;
  }

  .card-wrap {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 15px rgba(#1e2f43, 0.15);
    text-align: center;
    padding: 30px 20px;
  }

  .card-title {
    margin: 0;
    font-family: sans-serif;
  }

  .features {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin-top: 10px;
    }
  }

  .toggle-features {
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    display: inline-block;
    font-family: sans-serif;
    font-size: 16px;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
    background-color: #00a3ff;
    color: #fff;
    margin-top: 15px;

    &:hover {
      background-color: darken(#00a3ff, 10%);
    }
  }
}
</style>
