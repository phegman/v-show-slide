<template>
  <div
    id="app"
    class="app">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Premium Package</h2><!-- /.card-title -->
      </div><!-- /.card-header -->
      <div class="card-content">
        <p>Vestibulum ullamcorper mauris at ligula. Phasellus ullamcorper ipsum rutrum nunc.</p>
        <ul
          v-show-slide:350:ease-in="featuresOpen"
          class="features">
          <li>Aliquam lorem</li>
          <li>Praesent porttitor nulla vitae posuere</li>
          <li>Suspendisse nisl elit rhoncus</li>
          <li>Donec mi odio faucibus</li>
          <li>Curabitur suscipit suscipit</li>
        </ul><!-- /.features -->
        <button
          @click="toggleFeatures"
          class="toggle-features">{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button><!-- /.toggle-features -->
      </div><!-- /.card-content -->
    </div><!-- /.card -->
  </div>
</template>

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

<style lang="scss">
body {
  background-color: #f4f7fd;
}

.card {
  width: 300px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 15px rgba(#1e2f43, 0.15);
  text-align: center;
  padding: 30px 20px;

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
