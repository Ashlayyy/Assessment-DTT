<script>
import HouseCard from './HouseCardComponent.vue';
import API from '../data/API.js';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { useFavoritesStore } from '../../stores/Favorites.js';
import { useHistoryStore } from '../../stores/History';


export default {
    components: {
        HouseCard,
        ClipLoader
    },
    props: {
        searchString: String,
        sorted: String,
        ownListings: Boolean,
        favoritesOnly: Boolean,
        historyOnly: Boolean,
        recommended: Boolean,
        id: Number,
        mobile: Boolean
    },
    data() {
        return {
            houses: [],
            filteredHouses: [],
            resultsNumber: Number,
            sortedHouses: [],
            loaded: false,
            noFavorites: true,
            noHistoryYet: true,
            noRecommends: true
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
            const final = await API.getData();
            this.houses = final;
            this.filteredHouses = this.houses;
            this.loaded = true;
            this.updateSorter('price');
            if (this.favoritesOnly == true) this.filterById();
            if (this.historyOnly == true) this.useHistory();
            if (this.recommended == true) this.recommend();
        },
        updateFilter(searchTerm) {
            this.filteredHouses = this.houses.filter((house) => {
                const searchString = `${house.location.street} ${house.location.city} ${house.location.zip}`.toLowerCase();
                return searchString.includes(searchTerm.toLowerCase());
            });
            this.updateSorter(this.sorted);
            this.resultsNumber = this.filteredHouses.length;
        },
        checkIfInArray(id) {
            const { returnHistory } = useHistoryStore();
            const index = returnHistory().indexOf(id);
            return index == -1 ? false : true;
        },
        updateSorter(sortedProperty) {
            this.sortedHouses = this.filteredHouses.slice().sort((a, b) => {
                const aValue = sortedProperty == 'price' ? a.price : a.size;
                const bValue = sortedProperty == 'price' ? b.price : b.size;
                return aValue - bValue;
            });
            this.filteredHouses = this.sortedHouses;
        },
        filterById() {
            const { returnFavorites } = useFavoritesStore();
            const ids = returnFavorites();
            if (ids.length == 0) {
                this.noFavorites = true;
            } else {
                this.noFavorites = false;
            }
        },
        randomNum(max) {
            return Math.floor(Math.random() * max);
        },
        recommend() {

        },
        useHistory() {
            const { returnHistory } = useHistoryStore();
            const ids = returnHistory();
            if (ids.length == 0) {
                this.noHistoryYet = true;
            } else {
                this.noHistoryYet = false;
            }
        },
        updatePrice() {
            for (let i = 0; i < this.houses.length; i++) {
                const price = this.houses[i].price;
                const formatter = new Intl.NumberFormat('de-DE');
                this.houses[i].newPrice = formatter.format(price);
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
            <ul v-if="ownListings == true" class="houseListElement">
                <li v-if="searchString != '' && searchString != undefined && searchString != null && resultsNumber != null && resultsNumber != ''"
                    class="houseCardLi">
                    <p>{{ resultsNumber }} results found</p>
                </li>
                <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id"
                    :class="house.madeByMe == false ? 'hide' : ''">
                    <HouseCard v-if="house.madeByMe == true" :streetName="house.location.street"
                        :priceDisplay="house.newPrice" :picture="house.image" :zipCode="house.location.zip"
                        :houseNumber="house.location.houseNumber" :houseNumberAdditive="house.location.houseNumberAddition"
                        :bedrooms="house.rooms.bedrooms" :bathrooms="house.rooms.bathrooms" :size="house.size"
                        :city="house.location.city" :id="house.id" :made="house.madeByMe" />
                </li>
            </ul>
            <ul v-else-if="favoritesOnly == true" class="houseListElement">
                <div v-if="noFavorites == false" class="houseListDiv">
                    <li v-if="searchString != '' && searchString != undefined && searchString != null && resultsNumber != null && resultsNumber != ''"
                        class="houseCardLi">
                        <p>{{ resultsNumber }} results found</p>
                    </li>
                    <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id">
                        <HouseCard v-if="checkIfInArray(house.id)" :streetName="house.location.street"
                            :priceDisplay="house.newPrice" :picture="house.image" :zipCode="house.location.zip"
                            :houseNumber="house.location.houseNumber"
                            :houseNumberAdditive="house.location.houseNumberAddition" :bedrooms="house.rooms.bedrooms"
                            :bathrooms="house.rooms.bathrooms" :size="house.size" :city="house.location.city" :id="house.id"
                            :made="house.madeByMe" />
                    </li>
                </div>
                <div v-else>
                    <div class="mobileDiv">
                        <img class="image" src="../../assets/icons/DTTIcons/img_empty_houses@3x.png" alt="No houses found!"
                            height="200" width="500">
                        <p class="houseText">
                            No results.
                            <br><br>
                            You have no favorites yet.
                            <br>
                            You can add a house by clicking on the heart.
                        </p>
                    </div>
                </div>
            </ul>
            <ul v-else-if="historyOnly == true" class="houseListElement">
                <div v-if="noHistoryYet == false" class="houseListDiv">
                    <li v-if="searchString != '' && searchString != undefined && searchString != null && resultsNumber != null && resultsNumber != ''"
                        class="houseCardLi">
                        <p>{{ resultsNumber }} results found</p>
                    </li>
                    <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id">
                        <HouseCard :class="checkIfInArray(house.id) ? '' : 'hide'" v-if="checkIfInArray(house.id)"
                            :streetName="house.location.street" :priceDisplay="house.newPrice" :picture="house.image"
                            :zipCode="house.location.zip" :houseNumber="house.location.houseNumber"
                            :houseNumberAdditive="house.location.houseNumberAddition" :bedrooms="house.rooms.bedrooms"
                            :bathrooms="house.rooms.bathrooms" :size="house.size" :city="house.location.city" :id="house.id"
                            :made="house.madeByMe" />
                    </li>
                </div>
                <div v-else>
                    <div class="mobileDiv">
                        <img class="image" src="../../assets/icons/DTTIcons/img_empty_houses@3x.png" alt="No houses found!"
                            height="200" width="500">
                        <p class="houseText">
                            No results.
                            <br><br>
                            You have no history yet.
                            <br>
                            Go look for a house to add it to your history.
                        </p>
                    </div>
                </div>
            </ul>
            <ul v-else-if="recommended == true" class="houseListElement">
                <div v-if="noRecommends == false" class="houseListDiv recommended">
                    <h2 class="recommendedHeader">
                        Recommended for you
                    </h2>
                    <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id" @click="this.$router.go(`/detail/${house.id}`)">
                        <HouseCard :class="mobile ? 'mobile' : ''" :streetName="house.location.street"
                            :priceDisplay="house.newPrice" :picture="house.image" :zipCode="house.location.zip"
                            :houseNumber="house.location.houseNumber"
                            :houseNumberAdditive="house.location.houseNumberAddition" :bedrooms="house.rooms.bedrooms"
                            :bathrooms="house.rooms.bathrooms" :size="house.size" :city="house.location.city" :id="house.id"
                            :made="house.madeByMe" />
                    </li>
                </div>
                <div v-else>
                    <div class="mobileDiv">
                        <p class="houseText">
                            No recommends
                            <br><br>
                            No houses could be recommended.
                        </p>
                    </div>
                </div>
            </ul>
            <ul v-else class="houseListElement">
                <li v-if="searchString != '' && searchString != undefined && searchString != null && resultsNumber != null && resultsNumber != ''"
                    class="houseCardLi">
                    <p>{{ resultsNumber }} results found</p>
                </li>
                <li class="houseCardLi" v-for="house in filteredHouses" :key="house.id">
                    <HouseCard :streetName="house.location.street" :priceDisplay="house.newPrice" :picture="house.image"
                        :zipCode="house.location.zip" :houseNumber="house.location.houseNumber"
                        :houseNumberAdditive="house.location.houseNumberAddition" :bedrooms="house.rooms.bedrooms"
                        :bathrooms="house.rooms.bathrooms" :size="house.size" :city="house.location.city" :id="house.id"
                        :made="house.madeByMe" />
                </li>
            </ul>
        </section>
        <section v-else>
            <div v-if="this.loaded == false">
                <ClipLoader :color="'#cc181e'" :size="'5rem'" />
            </div>
            <div v-else class="mobileDiv">
                <img class="image" src="../../assets/icons/DTTIcons/img_empty_houses@3x.png" alt="No houses found!" height="200"
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

.houseListDiv {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
}

.houseListDiv.recommended {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    text-align: left;
    gap: 1rem;
    flex-direction: column;
}

.recommendedHeader {
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-size: 22px;
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

.hide {
    display: none;
    visibility: 0;
}

@media screen and (max-width: 650px),
screen and (max-device-width: 650px) {
    .houseText {
        font-size: 14px;
    }

    .image {
        height: 100px;
        width: 250px;
    }

    .mobileDiv {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
}
</style>