<template>
    <houseList class="list" :id="id" :recommended="true" :mobile="mobile" :class="mobile ? 'mobile': ''" @changeId="this.$emit('changedId')"/>
</template>
  
<script>
import houseList from './houseList.vue';

export default {
    components: {
        houseList
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
  