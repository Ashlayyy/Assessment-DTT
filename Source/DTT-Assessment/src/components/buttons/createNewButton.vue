<template>
  <RouterLink class="createNewLink desktop" to="/create">
    <button class="createButton">
      <img
        class="createButtonImage"
        src="../../assets/icons/DTTIcons/ic_plus_white@3x.png"
        alt="Plus icon for create new button"
      />Create New
    </button>
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped>
.createNewLink {
  text-decoration: none;
  text-align: center;
}
.createButton {
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #eb5440;
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  width: 12rem;
  border-radius: 0.5rem;
  height: 2.5rem;
  text-transform: uppercase;
  text-decoration: none;
}

.createButtonImage {
  height: 90%;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .desktop {
    display: none;
  }
}
</style>
