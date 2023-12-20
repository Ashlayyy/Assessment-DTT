<template>
  <RouterLink class="createNewLink mobile" to="/create">
    <button class="createButton">
      <img
        class="createButtonImage"
        src="../../assets/icons/DTTIcons/ic_plus_grey@3x.png"
        alt="Plus icon for create new button"
      />
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
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  width: 2.5rem;
  border-radius: 0.5rem;
  height: 2.5rem;
  text-transform: uppercase;
  text-decoration: none;
}

.createButtonImage {
  height: 90%;
}

.mobile {
  display: none;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .mobile {
    display: block;
  }
}
</style>
