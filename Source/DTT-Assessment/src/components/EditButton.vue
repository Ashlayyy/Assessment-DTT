<template>
    <RouterLink class="editLink" to="/edit"> <button class="editButton"><img class="editButtonImage"
                src="../components/icons/DTTIcons/ic_edit@3x.png" alt="Icon for edit"></button>
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
.editLink {
    text-decoration: none;
}

.editButton {
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

.editButtonImage {
    height: 90%;
}
</style>
    