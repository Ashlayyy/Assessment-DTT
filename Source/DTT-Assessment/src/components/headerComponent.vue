<script setup>
import { RouterLink, useRoute } from 'vue-router'
const location = useRoute()
</script>

<template>
  <section id="header__section">
    <nav id="header">
      <img
        alt="DTT Logo"
        class="logo"
        src="../assets/icons/DTTIcons/img_logo_dtt@3x.png"
        width="148"
        height="50"
      />
      <RouterLink
        :class="
          location.path === '/' ||
          location.path === '/edit' ||
          location.path === '/create' ||
          location.path === '/detail/'
            ? 'active'
            : ''
        "
        class="header__link"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        :class="location.path === '/about' ? 'active' : ''"
        class="header__link"
        to="/about"
        >About</RouterLink
      >
      <RouterLink
        :class="location.path === '/listings' ? 'active' : ''"
        class="header__link"
        to="/listings"
        >Listings</RouterLink
      >
      <RouterLink
        :class="location.path === '/favorites' ? 'active' : ''"
        class="header__link"
        to="/favorites"
        >Favorites</RouterLink
      >
      <RouterLink
        :class="location.path === '/history' ? 'active' : ''"
        class="header__link"
        to="/history"
        >History</RouterLink
      >
    </nav>
  </section>
</template>

<style scoped>
#header__section {
  width: 100%;
  background: #ffffff;
  height: 6rem;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  position: sticky;
  z-index: 999;
  font-family: 'Montserrat';
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
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
  width: 75%;
}

.header__link {
  font-size: 18px;
  color: rgba(74, 75, 77, 0.75);
  text-decoration: none;
  transition: 0.3s all cubic-bezier(0.23, 1, 0.32, 1);
}

.header__link__active {
  color: #000000;
  cursor: pointer;
}

.header__link:hover {
  color: #067bc2;
  cursor: pointer;
}

.active {
  color: #000000;
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
}
</style>
