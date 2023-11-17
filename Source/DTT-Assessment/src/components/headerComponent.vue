<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="header__section">
    <nav id="header">
      <img alt="DTT Logo" class="logo" src="./icons/DTTIcons/img_logo_dtt@3x.png" width="148" height="50" />
      <RouterLink class="header__link" to="/">Home</RouterLink>
      <RouterLink class="header__link" to="/about">About</RouterLink>
      <RouterLink class="header__link" to="/favorites">Favorites</RouterLink>
      <RouterLink class="header__link" to="/listings">Listings</RouterLink>
    </nav>
  </section>
</template>

<style scoped>
#header__section {
  width: 100%;
  background: #FFFFFF;
  height: 6rem;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  position: sticky;
}

#header {
  padding-top: 1rem;
  margin-left: 2.5rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 70%;
}

.header__link {
  font-size: 18px;
  color: #4A4B4C;
  text-decoration: none;
  transition: 0.3s all cubic-bezier(0.23, 1, 0.320, 1);
}

.header__link__active {
  color: #000000;
  cursor: pointer;
}

.header__link:hover {
  color: #067BC2;
  cursor: pointer;
}
</style>
