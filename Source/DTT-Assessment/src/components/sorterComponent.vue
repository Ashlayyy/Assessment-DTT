<template>
    <div class="sorterDivider">
        <button :class="{ active_button: selectedOption === 'price' }" @click="handleClickPrice" id="buttonSorterPrice" class="sorterButtonPrice sorterButton">Price</button>
        <button :class="{ active_button: selectedOption === 'size' }" @click="handleClickSize" id="buttonSorterSize" class="sorterButtonSize sorterButton">Size</button>
    </div>
</template>
  
<script>
export default {
    data() {
    return {
      selectedOption: 'price',
    };
    },
    methods: {
        handleClickPrice () {
            this.selectedOption = 'price';
            this.$emit('sort-changed', this.selectedOption);
        },
        handleClickSize () {
            this.selectedOption = 'size';
            this.$emit('sort-changed', this.selectedOption);
        }
    }
}
</script>
  
<style scoped>
.sorterDivider {
  display: flex;
  gap: 0;
}

.sorterButton {
  flex: 1;
  border: none;
  padding: 10px;
  width: 10rem;
  cursor: pointer;
  color: #FFFFFF;
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
}

.sorterButtonPrice {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
}

.sorterButtonSize{
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
}

.active_button {
  background-color: #EB5440;
  color: #FFFFFF;
}
</style>
  