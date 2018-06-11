<template>
  <div
    id="app"
    class="app">
    <div class="container">
      <div class="row">
        <card-default />
        <card-with-args />
        <card-custom-easing />
      </div><!-- /.row -->
    </div><!-- /.container -->
  </div>
</template>

<script>
import CardDefault from './components/CardDefault.vue'
import CardWithArgs from './components/CardWithArgs.vue'
import CardCustomEasing from './components/CardCustomEasing.vue'

export default {
  name: 'App',
  components: {
    CardDefault,
    CardWithArgs,
    CardCustomEasing
  }
}
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
