<script setup>
import { RouterView } from 'vue-router';
import Header from './components/headerComponent.vue';
import mobileNav from './components/mobileNav.vue';

</script>

<template>
  <div class="body">
    <Header class="desktopNav" />
    <RouterView />
    <mobileNav class="mobileNav"/>
  </div>
</template>

<style scoped>

.body {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  position: relative;
}

.mobileNav {
  position: sticky;
  bottom: 0;
  left: 0;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .desktopNav {
    display: none;
  }

  .mobileNav {
    display: flex;
  }
}
</style>
