<script setup lang="ts">
import MapView from './components/MapView.vue'
</script>

<template>
  <MapView></MapView>
</template>

<style>
#app {
  flex-direction: column;
  /* background: white url("./bg.webp") no-repeat center center / cover; */

  display: flex;
  /* justify-content: center; */

  /* overflow-x: hidden; */
}
body{
  min-width: 1333px;
  overflow-y: scroll;
}

@media (min-width: 1024px) {}
</style>
