<template>
    <main class="mainCard">
        <section class="leftSide">
            <div class="backButton">
                <goBackButton class="desktop" />
                <goBackButton class="mobile" :message="' '" :color="'white'" />
            </div>
            <div class="mobileButton" v-if="house.madeByMe == true">
                <div class="mobileButtonDivider">
                    <DeleteButton @click="deleted()" :mobile="true" />
                    <EditButton @click="setId(house.id)" :mobile="true" />
                </div>
            </div>
            <section class="detailCard" v-if="house.location.street != ''">
                <img class="detailImage" :src="house.image" alt="Image of the house" />
                <div class="detailCardInfo">
                    <section class="titleClass">
                        <div class="titleRow" :class="house.madeByMe ? 'madeByMeRow' : ''">
                            <h2 class="detailCardTitle">
                                {{ house.location.street }} {{ house.location.houseNumber }}
                                {{ house.location.houseNumberAddition ? houseNumberAddition : '' }}
                            </h2>
                            <div class="buttonsDivider">
                                <EditButton v-if="house.madeByMe == true" @click="setId(house.id)" />
                                <DeleteButton v-if="house.madeByMe == true" @click="deleted()" />
                                <favoriteButton v-if="house.madeByMe == false" @click="toggleFavorite(house.id)"
                                    :active="contains(house.id)" />
                            </div>
                        </div>
                    </section>
                    <div class="locationRow row">
                        <span class="locationCollum collum">
                            <img src="../icons/DTTIcons/ic_location@3x.png" alt="Location icon" class="locationIcon icon" />
                            <p class="locationText textParagraphs">{{ house.location.zip }} {{ house.location.city }}</p>
                        </span>
                    </div>
                    <div class="secondRow row">
                        <span class="priceCollum collum">
                            <img src="../icons/DTTIcons/ic_price@3x.png" alt="Price icon" class="priceIcon icon" />
                            <p class="priceText textParagraphs">
                                {{ house.price }}
                            </p>
                        </span>
                        <span class="sizeCollum collum">
                            <img src="../icons/DTTIcons/ic_size@3x.png" alt="Size icon" class="sizeIcon icon" />
                            <p class="sizeText textParagraphs">{{ house.size }} m2</p>
                        </span>
                        <span class="yearCollum collum">
                            <img src="../icons/DTTIcons/ic_construction_date@3x.png" alt="Construction year icon"
                                class="yearIcon icon" />
                            <p class="yearText textParagraphs">Built in {{ house.constructionYear }}</p>
                        </span>
                    </div>
                    <div class="thirdRow row">
                        <span class="collum bedCollum">
                            <img src="../icons/DTTIcons/ic_bed@3x.png" alt="Bed icon" class="bedIcon icon" />
                            <p class="bedText textParagraphs">
                                {{ house.rooms.bedrooms }}
                            </p>
                        </span>
                        <span class="collum bathCollum">
                            <img src="../icons/DTTIcons/ic_bath@3x.png" alt="Bath icon" class="bathIcon icon" />
                            <p class="bathText textParagraphs">
                                {{ house.rooms.bathrooms }}
                            </p>
                        </span>
                        <span class="collum garageCollum">
                            <img src="../icons/DTTIcons/ic_garage@3x.png" alt="Garage icon" class="garageIcon icon" />
                            <p class="garageText textParagraphs">
                                {{ house.hasGarage }}
                            </p>
                        </span>
                    </div>
                    <div class="descriptionRow">
                        {{ house.description }}
                    </div>
                </div>
                <div class="recommended mobile">
                    <h2 class="header">
                        Recommended for you
                    </h2>
                    <div class="divider">
                        <recommendedComponent :id="house.id" :mobile="true" @changedId="reloadPage()"/>
                    </div>
                </div>
            </section>
            <section v-else>
                <ClipLoader :color="'#cc181e'" :size="'5rem'" />
            </section>
        </section>
        <div class="recommended">
            <recommendedComponent :id="house.id" @changedId="reloadPage()"/>
        </div>
    </main>
    <appModel v-if="showModal" :showModal=showModal>
        <div class="overlay"></div>
        <template v-slot:header>
            <section class="textSection">
                <h2 class="headerText">Delete listing</h2>
                <p class="paragraphText">Are you sure you want to delete this listing?
                    <br>
                    This action cannot be undone.
                </p>
            </section>
        </template>
        <template v-slot:body>
            <div class="buttonDivider buttons">
                <button @click="deleteHouse(house.id)" class="yesButton">
                    Yes, delete
                </button>
                <button @click="showModal = false" class="cancelButton">
                    Go back
                </button>
            </div>
        </template>
    </appModel>
</template>

<script>
import { useRouter } from 'vue-router';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { useIdStore } from '../../stores/id';
import goBackButton from '../buttons/goBackButton.vue';
import dataAPI from '../data/dataAPI.vue';
import EditButton from '../buttons/EditButton.vue';
import DeleteButton from '../buttons/DeleteButton.vue';
import appModel from './modelCard.vue';
import { useModalStore } from '../../stores/deleteModal';
import { useFavoritesStore } from '../../stores/favorites.js';
import favoriteButton from '../buttons/favoriteButton.vue';
import { useHistoryStore } from '../../stores/history';
import recommendedComponent from './recommendComponent.vue';

const { returnId, setId } = useIdStore();
const { setState, getState } = useModalStore();
const { addFavorite, removeFavorite, contains } = useFavoritesStore();
const { addToHistory, returnHistory } = useHistoryStore();
removeFavorite(undefined)

export default {
    data() {
        return {
            house: [],
            houseNumberAddition: null,
            showModal: false
        }
    },
    components: {
        goBackButton,
        ClipLoader,
        EditButton,
        DeleteButton,
        appModel,
        favoriteButton,
        recommendedComponent
    },
    methods: {
        async getHouse() {
            const house = await dataAPI.methods.getOneHouse(returnId())
            this.house = house[0];
        },
        setId(id) {
            setId(id);
        },
        contains(id) {
            return contains(id);
        },
        async reloadPage () {
            await this.getHouse();
        },
        toggleFavorite(id) {
            const alreadyAdded = contains(id);
            const element = document.getElementById('favoriteImage');
            if (alreadyAdded) {
                removeFavorite(id);
                element.src = '/src/components/icons/favorites_button_inactive.png';
            } else {
                addFavorite(id);
                element.src = '/src/components/icons/favorites_button_active.png';
            }
        },
        deleted() {
            this.showModal = getState();
            if (this.showModal != true) this.showModal = true;
        },
        async deleteHouse(id) {
            setId(id);
            setState(false);
            await dataAPI.methods.deleteHouse(id)
            const router = useRouter();
            await router.push({ path: '/' });
            window.location.reload();
        }
    },
    async created() {
        try {
            await this.getHouse()
            const formatter = new Intl.NumberFormat('de-DE')
            this.house.price = formatter.format(this.house.price)
            if (
                this.house.location.houseNumberAddition == null ||
                this.house.location.houseNumberAddition == '' ||
                this.house.location.houseNumberAddition == ' ' ||
                this.house.location.houseNumberAddition == 'null' ||
                this.house.location.houseNumberAddition == 'undefined' ||
                this.house.location.houseNumberAddition == undefined
            ) {
                this.houseNumberAddition = '';
            }
            else {
                this.houseNumberAddition = this.house.location.houseNumberAddition;
            }
            this.house.hasGarage = this.hasGarage ? 'Yes' : 'No';
            setId(this.house.id);
            this.showModal = getState();
            addToHistory(this.house.id);
        } catch (err) {
            console.log(err)
        }
    }
}
</script>

<style scoped>
.leftSide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    width: 60%;
    height: 100%;
}

.recommended {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    gap: 0.5rem;
    width: 50%;
}

.textSection {
    height: max-content;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
}

.headerText {
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-size: 22px;
}

.paragraphText {
    font-family: 'open-sans';
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
}

.buttonDivider {
    display: flex;
    align-items: center;
    justify-content: right;
    flex-direction: row;
    height: 5rem;
    width: 100%;
    gap: 0.5rem;
}

.buttonDivider.buttons {
    flex-direction: column;
    text-align: center;
}

.yesButton {
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #EB5440;
    color: #ffffff;
    padding: 1.5rem;
    border: none;
    cursor: pointer;
    width: 15rem;
    border-radius: 0.3rem;
    height: 2rem;
    text-transform: uppercase;
    text-decoration: none;
}

.cancelButton {
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: gray;
    color: #ffffff;
    padding: 1.5rem;
    border: none;
    cursor: pointer;
    width: 15rem;
    border-radius: 0.3rem;
    height: 2rem;
    text-transform: uppercase;
    text-decoration: none;
}

.backButton {
    display: flex;
    width: 60%;
    height: max-content;
}

.mainCard {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    flex-direction: row;
    position: relative;
}

.detailCard {
    display: flex;
    align-items: start;
    justify-content: center;
    padding: 0;
    margin: 0;
    flex-direction: column;
    width: 70%;
    height: max-content;
    background: #fff;
    font-family: 'open-sans';
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
}

.detailImage {
    aspect-ratio: 4/3;
    width: 100%;
}

.detailCardInfo {
    height: 100%;
    width: 100%;
    padding: 2.5rem;
    margin: 0;
}

.icon {
    height: 1.5rem;
    aspect-ratio: 1/1;
}

.locationIcon {
    height: 2rem;
    width: 1.5rem;
}

.collum {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 2rem;
}

.titleRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
}

.madeByMeRow {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.buttonsDivider {
    display: flex;
    height: 5rem;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: min-content;
    gap: 0.5rem;
}

.descriptionRow {
    padding-top: 2rem;
    max-width: 65ch;
    line-height: 1.3rem;
}

.titleClass {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 90%;
    padding: 0;
}

.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.05);
    z-index: 90;
}

.mobileButton, .mobile {
    display: none;
}

@media screen and (max-width: 650px),
screen and (max-device-width: 650px) {
    .icon {
        height: 0.5rem;
    }

    .locationIcon {
        height: 0.7rem;
        width: 0.5rem;
    }

    .mainCard {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .desktop {
        display: none;
    }

    .mobile {
        display: block;
        position: absolute;
        top: 2rem;
        left: 2rem;
    }

    .headerText {
        font-size: 14px;
    }

    .paragraphText {
        font-size: 12px;
    }

    .backButton {
        z-index: 110;
    }

    .detailCard {
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    .detailImage {
        height: 100%;
        aspect-ratio: 3/2;
        z-index: 10;
    }

    .detailCard {
        width: 100%;
        height: 100%;
    }

    .detailCardInfo {
        width: 100%;
        height: 100%;
        border-top-right-radius: 3rem;
        border-top-left-radius: 3rem;
        z-index: 99;
        margin-top: -3rem;
        background: #ffffff;
        display: flex;
        align-items: start;
        justify-content: center;
        text-align: left;
        flex-direction: column;
        padding: 0;
        font-size: 12px;
    }

    .titleClass {
        padding-left: 2rem;
        padding-right: -2rem;
        padding-top: 2rem;
    }

    .row,
    .descriptionRow {
        padding-left: 2rem;
        padding-right: -2rem;
    }

    .descriptionRow {
        padding-bottom: 2rem;
    }

    .mobileButton {
        position: absolute;
        top: 2rem;
        right: 2rem;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        justify-content: center;
        gap: 1rem;
        z-index: 999;
        background: transparent;
        flex-direction: row;
    }

    .mobileButtonDivider {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: right;
        flex-direction: row;
    }

    .buttonsDivider {
        display: none;
    }

    .mobile {
        display: flex;
    }

    .leftSide {
        width: 100%;
        height: 100%;
    }

    .recommended {
        display: none;
        width: 0;
    }
    .recommended.mobile {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        position: relative;
        gap: 1rem;
        top: 0;
        left: 0;
        margin: 0;
        text-align: left;
        background: #F6F6F6;
    }

    .header {
        width: 100%;
        text-align: left;
        padding-left: 5rem;
    }

    .divider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
}
</style>
