<template>
  <button class="favoriteButton"><img id="favoriteImage" class="favoriteButtonImage"
      :src="active == false ? '/src/assets/icons/favorites_inactive.png' :  mobile == true ? '/src/assets/icons/favorites_button_active.png' : '/src/assets/icons/favorites_active.png'"
      alt="Icon for favorite">
  </button>
</template>
      
<script>
export default {
  props: {
    mobile: Boolean,
    active: Boolean
  }
}
</script>
      
<style scoped>
.favoriteButton {
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  border-radius: 0.3rem;
  height: 2rem;
  width: 2rem;
  text-transform: uppercase;
  text-decoration: none;
  background: transparent;
}

.favoriteButton:hover {
  cursor: pointer;
}

.favoriteButtonImage {
  height: 90%;
}

@media screen and (max-width: 650px),
screen and (max-device-width: 650px) {
  .favoriteButton {
    height: 1rem;
    width: 1rem;
  }
}
</style>
      