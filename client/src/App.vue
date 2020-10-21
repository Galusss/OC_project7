<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view/>
  </div>
</template>

<style>
html, body {
  margin: 0;
}
</style>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Nav',
  components: {
    Navbar
  }
}
</script>