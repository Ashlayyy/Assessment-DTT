<template>
  <RouterLink :to="toGoTo ? toGoTo : '/'" class="backText">
    <span class="divider">
      <img
        class="backIcon"
        alt="backIcon"
        :src="
          color
            ? '/src/assets/icons/DTTIcons/ic_back_white@3x.png'
            : '/src/assets/icons/DTTIcons/ic_back_grey@3x.png'
        "
      />
      <p class="backText">{{ message ? message : 'Back to overview' }}</p>
    </span>
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  props: {
    message: String,
    toGoTo: String,
    color: String
  }
}
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.backText {
  text-decoration: none;
  color: #000000;
  font-family: 'Montserrat';
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
}
.backIcon {
  height: 1.5rem;
  aspect-ratio: 1/1;
}
</style>
