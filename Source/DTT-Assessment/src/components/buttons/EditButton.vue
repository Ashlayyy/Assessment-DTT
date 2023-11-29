<template>
    <RouterLink class="editLink" to="/edit"> <button class="editButton" :class="mobile == true ? 'mobile' : ''"><img class="editButtonImage"
        :src="mobile == true ? '/src/components/icons/DTTIcons/ic_edit_white@3x.png' : '/src/components/icons/DTTIcons/ic_edit@3x.png'" alt="Icon for edit"></button>
    </RouterLink>
</template>
    
<script>
import { RouterLink } from 'vue-router'

export default {
    components: {
        RouterLink
    },
    props: {
        mobile: Boolean
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

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
    .editButton {
        height: 1rem;
        width: 1rem;
    }

    .mobile {
      background: transparent;
    }
}
</style>
    