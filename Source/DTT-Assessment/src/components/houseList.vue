<script>
import HouseCard from './houseCard.vue';
import dataAPI from './dataAPI.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';


export default {
    components: {
        HouseCard,
        ClipLoader
    },
    props: {
        searchString: String,
        sorted: String
    },
    data() {
        return {
            houses: [],
            filteredHouses: [],
            resultsNumber: Number,
            sortedHouses: [],
            loaded: false
        };
    },
    watch: {
        searchString: function (searchTerm) {
            this.updateFilter(searchTerm);
        },
        sorted: function (sortedProperty) {
            this.updateSorter(sortedProperty);
        }
    },

    methods: {
        async getData() {
            const final = await dataAPI.methods.getData();
            this.houses = final;
            this.filteredHouses = this.houses;
            this.loaded = true;
            this.updateSorter('price');
        },
        updateFilter(searchTerm) {
            this.filteredHouses = this.houses.filter((house) => {
                const searchString = `${house.location.street} ${house.location.city} ${house.location.zip}`.toLowerCase();
                return searchString.includes(searchTerm.toLowerCase());
            });
            this.updateSorter(this.sorted);
            this.resultsNumber = this.filteredHouses.length;
        },
        updateSorter(sortedProperty) {
            this.sortedHouses = this.filteredHouses.slice().sort((a, b) => {
                const aValue = sortedProperty === 'price' ? a.price : a.size;
                const bValue = sortedProperty === 'price' ? b.price : b.size;
                return aValue - bValue;
            });
            this.filteredHouses = this.sortedHouses;
        },
        updatePrice() {
            for (let i = 0; i < this.houses.length; i++) {
                const price = this.houses[i].price;
                const formatter = new Intl.NumberFormat('de-DE');
                this.houses[i].price = formatter.format(price);
            }
        }
    },
    async beforeMount() {
        await this.getData();
        this.updatePrice();
    },
    mounted() {
        this.updatePrice();
        this.filteredHouses = this.houses;
    }
};

</script>
<template>
    <section class="houseList">
        <section class="houses" v-if="filteredHouses.length > 0">
            <ul class="houseListElement">
                <li v-if="searchString != '' && searchString != undefined && searchString != null && resultsNumber != null && resultsNumber != ''"
                    class="houseCardLi">
                    <p>{{ resultsNumber }} results found</p>
                </li>
                <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id">
                    <HouseCard :streetName="house.location.street" :priceDisplay="house.price" :picture="house.image"
                        :zipCode="house.location.zip" :houseNumber="house.location.houseNumber"
                        :houseNumberAdditive="house.location.houseNumberAddition" :bedrooms="house.rooms.bedrooms"
                        :bathrooms="house.rooms.bathrooms" :size="house.size" :city="house.location.city" :id="house.id"
                        :made="house.madeByMe" @showModal="console.log($event)" />
                </li>
            </ul>
        </section>
        <section v-else>
            <div v-if="this.loaded == false">
                <ClipLoader :color="'#cc181e'" :size="'5rem'" />
            </div>
            <div v-else>
                <img src="../components/icons/DTTIcons/img_empty_houses@3x.png" alt="No houses found!" height="200"
                    width="500">
                <p class="houseText">
                    No results found.
                    <br>
                    Please try another keyword.
                </p>
            </div>
        </section>
    </section>
</template>

<style scoped>
.houseList {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: center;
    height: auto;
}

.houses {
    width: 100%;
    height: 100%;
}

.houseListElement {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    gap: 1rem;
    height: auto;
    flex-direction: column;
    padding-top: 5rem;
    margin: 0;
    padding: 0;
}

.houseCardLi {
    list-style: none;
    width: 100%;
}

.houseText {
    width: 100%;
    text-align: center;
    font-family: 'Montserrat';
    font-weight: 500;
    font-style: normal;
    font-size: 18px;
}
</style>