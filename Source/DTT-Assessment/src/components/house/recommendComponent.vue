<template>
  <HouseList
    class="list"
    :id="id"
    :recommended="true"
    :mobile="mobile"
    :class="mobile ? 'mobile' : ''"
  />
</template>

<script>
import HouseList from './HouseListComponent.vue'

export default {
  components: {
    HouseList
  },
  props: {
    id: Number,
    mobile: Boolean
  }
}
</script>

<style scoped>
.list {
  width: max-content;
}

.mobile {
  width: 75%;
  height: 100%;
}
</style>
