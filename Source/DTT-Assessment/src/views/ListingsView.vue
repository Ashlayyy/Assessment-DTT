<script>
import HouseList from '../components/house/HouseListComponent.vue';
import FilterComponent from '../components/house/FilterComponent.vue';
import CreateNewButton from '../components/buttons/CreateNewButton.vue';
import SorterComponent from '../components/house/SorterComponent.vue';
import MobileButton from '../components/buttons/MobileButton.vue';

export default {
    components: {
        FilterComponent,
        HouseList,
        CreateNewButton,
        SorterComponent,
        MobileButton
    },
    data() {
        return {
            houses: [],
            searchTerm: null,
            sorted: 'price',
        };
    },
    methods: {
        handleEvent (event) {
            this.searchTerm = event;
        },
        handleSortEvent (event) {
            this.sorted = event;
        }
    }
};
</script>

<template>
    <section class="home">
        <div class="upperHalf">
            <div class="dividerOne">
                <div class="mobileDiv">
                    <h1 class="title">Your own listings</h1>
                    <MobileButton/>
                </div>
                <FilterComponent class="filterComponent" @filter-changed="handleEvent($event)" />
            </div>
            <div class="dividerTwo">
                <CreateNewButton />
                <SorterComponent @sort-changed="handleSortEvent($event)"/>
            </div>
        </div>
        <HouseList :searchString="searchTerm" :sorted="sorted" :ownListings="true"/>
    </section>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: start;
    padding: 2rem 15rem 5rem 15rem;
    min-height: 100vh;
}

.upperHalf {
    display: flex;
    width: 100%;
    height: 10rem;
    justify-content: space-between;
    align-items: center;
    text-align: left;
}

.dividerOne {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    gap: 1rem;
}

.dividerTwo {
    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
}

.title {
    width: 100%;
    text-align: left;
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-size: 32px;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {

    .home {
        padding: 2.5rem 2.5rem;
    }
    .upperHalf {
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
    }

    .title {
        font-size: 18px;
        text-align: center;
    }

    .mobileDiv {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
}

</style>
