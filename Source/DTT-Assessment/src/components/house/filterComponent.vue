<template>
  <div>
    <div class="filter">
      <i class="filterSearchIcon"
        ><img
          class="searchImage"
          src="../../assets/icons/DTTIcons/ic_search@3x.png"
          alt="Search icon"
      /></i>
      <input
        type="text"
        class="filterSearchBox"
        id="search"
        v-model="searchTerm"
        @input="applyFilter"
        placeholder="Search for a house"
      />
      <i @click="clearFilter" class="filterRemoveIcon" v-if="searchTerm != ''"
        ><img class="clearImage" src="../../assets/icons/DTTIcons/ic_clear@3x.png" alt="Clear icon"
      /></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    applyFilter() {
      this.$emit('filter-changed', this.searchTerm)
    },
    clearFilter() {
      this.searchTerm = ''
      this.$emit('filter-changed', this.searchTerm)
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 22.5rem;
  height: 2rem;
  background: #e8e8e8;
  border-radius: 0.2rem;
  gap: 1rem;
  padding: 0.5rem;
}

.filterSearchBox,
.filterSearchBox:focus,
.filterSearchBox:active {
  width: 20rem;
  height: 100%;
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  outline: none;
  line-height: 1.5rem;
  font-family: 'open-sans';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}

.clearImage,
.searchImage {
  height: 2.1rem;
  aspect-ratio: 1/1;
}

.clearImage:hover {
  cursor: pointer;
}

.filterSearchIcon,
.filterRemoveIcon {
  padding: 0;
  margin: 0;
}
</style>
