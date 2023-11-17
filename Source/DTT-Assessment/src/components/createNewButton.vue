<template>
  <RouterLink class="createNewLink" to="/create"> <button class="createButton"><img class="createButtonImage"
        src="../components/icons/DTTIcons/ic_plus_white@3x.png" alt="Plus icon for create new button">Create New</button>
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
}
.createButton {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #EB5440;
  color: #ffffff;
  padding: 1rem;
  border: none;
  cursor: pointer;
  width: 7.5rem;
  border-radius: 0.3rem;
  height: 2.5rem;
  text-transform: uppercase;
  text-decoration: none;
}

.createButtonImage {
  height: 90%;
}
</style>
  