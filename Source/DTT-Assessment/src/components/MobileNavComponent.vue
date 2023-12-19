<script>
export default {
  data() {
    return {
      show: false
    }
  },
  watch: {
    $route(to) {
      const imgElement = document.getElementById('homeImage');
      const aboutElement = document.getElementById('aboutImage');
      const favoriteElement = document.getElementById('favoriteImage');
      const listingElement = document.getElementById('listingsImage');
      const historyElement = document.getElementById('historyImage');
      if (to.fullPath == '/about') {
        imgElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_home@3x.png';
        aboutElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_info_active@3x.png';
        favoriteElement.src = '/src/assets/icons/favorites_inactive.png';
        listingElement.src = '/src/assets/icons/listings_inactive.png';
        historyElement.src = '/src/assets/icons/history_inactive.png';
      } else if (to.fullPath == '/favorites') {
        imgElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_home@3x.png';
        aboutElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_info@3x.png';
        favoriteElement.src = '/src/assets/icons/favorites_active.png';
        listingElement.src = '/src/assets/icons/listings_inactive.png';
        historyElement.src = '/src/assets/icons/history_inactive.png';
      } else if (to.fullPath == '/listings') {
        imgElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_home@3x.png';
        aboutElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_info@3x.png';
        favoriteElement.src = '/src/assets/icons/favorites_inactive.png';
        listingElement.src = '/src/assets/icons/listings_active.png';
        historyElement.src = '/src/assets/icons/history_inactive.png';
      } else if (to.fullPath == '/history') {
        imgElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_home@3x.png';
        aboutElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_info@3x.png';
        favoriteElement.src = '/src/assets/icons/favorites_inactive.png';
        listingElement.src = '/src/assets/icons/listings_inactive.png';
        historyElement.src = '/src/assets/icons/history_active.png';
      } else {
        imgElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_home_active@3x.png';
        aboutElement.src = '/src/assets/icons/DTTIcons/ic_mobile_navigarion_info@3x.png';        
        favoriteElement.src = '/src/assets/icons/favorites_inactive.png';
        listingElement.src = '/src/assets/icons/listings_inactive.png';
        historyElement.src = '/src/assets/icons/history_inactive.png';
      }
    }
  }
}
</script>

<template>
  <section id="header__section__mobile">
    <nav id="header">
      <RouterLink class="header__link" to="/">
        <img class="image" src="/src/assets/icons/DTTIcons/ic_mobile_navigarion_home_active@3x.png"
          alt="Home navigation icon" id="homeImage">
      </RouterLink>
      <RouterLink class="header__link" to="/about">
        <img class="image" src="/src/assets/icons/DTTIcons/ic_mobile_navigarion_info@3x.png"
          alt="Info navigation icon" id="aboutImage">
      </RouterLink>
      <RouterLink class="header__link" to="/listings">
        <img class="image" src="/src/assets/icons/listings_inactive.png"
          alt="Info navigation icon" id="listingsImage">
      </RouterLink>
      <RouterLink class="header__link" to="/favorites">
        <img class="image" src="/src/assets/icons/favorites_inactive.png"
          alt="Info navigation icon" id="favoriteImage">
      </RouterLink>
      <RouterLink class="header__link" to="/history">
        <img class="image" src="/src/assets/icons/history_inactive.png"
          alt="Info navigation icon" id="historyImage">
      </RouterLink>
    </nav>
  </section>
</template>

<style scoped>
#header__section__mobile {
  width: 100%;
  background-color: #FFFFFF;
  height: 4rem;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  position: sticky;
  z-index: 999;
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  display: none;
  align-items: center;
  justify-content: center;
}

#header {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 1.75rem;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
}

.header__link {
  color: rgba(74, 75, 77, 0.75);
  text-decoration: none;
  transition: 0.3s all cubic-bezier(0.23, 1, 0.320, 1);
  height: 2rem;
  aspect-ratio: 1/1;
}

.image {
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 650px),
screen and (max-device-width: 650px) {
  #header__section__mobile {
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
  }
}
</style>
