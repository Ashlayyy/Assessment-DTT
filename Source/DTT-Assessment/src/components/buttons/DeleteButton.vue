<template>
  <div class="mobileDivider">
    <button class="deleteButton" :class="mobile == true ? 'mobile' : ''">
      <img
        class="deleteButtonImage"
        :src="
          mobile == true
            ? '/src/assets/icons/DTTIcons/ic_delete_white@3x.png'
            : '/src/assets/icons/DTTIcons/ic_delete@3x.png'
        "
        alt="Icon for delete"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mobile: Boolean
  }
}
</script>

<style scoped>
.editLink {
  text-decoration: none;
}

.deleteButton {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.3rem;
  height: 2rem;
  width: 2rem;
  text-transform: uppercase;
  text-decoration: none;
}

.deleteButtonImage {
  height: 90%;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .deleteButton {
    height: 1rem;
    width: 1rem;
  }

  .mobile {
    background: transparent;
  }
}
</style>
