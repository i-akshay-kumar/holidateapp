<template>
  <div id="app">
    <HomePage/>
    <router-view></router-view>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
  }
}
</script>

<style>
  body{
    background-color: #f4f8fd;
  }
</style>
