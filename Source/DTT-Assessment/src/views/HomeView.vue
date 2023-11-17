<script>
import HouseList from '../components/houseList.vue';
import FilterComponent from '../components/filterComponent.vue';
import DataAPI from '../components/dataAPI.vue';
import createNewButton from '../components/createNewButton.vue';
import sorterComponent from '../components/sorterComponent.vue';

export default {
    components: {
        FilterComponent,
        HouseList,
        createNewButton,
        sorterComponent
    },
    data() {
        return {
            houses: [],
            searchTerm: null,
            sorted: 'price',
        };
    },
    methods: {
        async start () {
            const finals = await DataAPI.methods.getData();
            this.houses = finals;
        },
        handleEvent (event) {
            this.searchTerm = event;
        },
        handleSortEvent (event) {
            this.sorted = event;
        }
    },
    async beforeMount () {
        await this.start();
    }
};
</script>

<template>
    <section class="home">
        <div class="upperHalf">
            <div class="dividerOne">
                <h1 class="title">Houses</h1>
                <FilterComponent class="filterComponent" @filter-changed="handleEvent($event)" />
            </div>
            <div class="dividerTwo">
                <createNewButton />
                <sorterComponent @sort-changed="handleSortEvent($event)"/>
            </div>
        </div>
        <HouseList :searchString="searchTerm" :sorted="sorted"/>
    </section>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 2rem 15rem 5rem 15rem;
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
}
</style>
