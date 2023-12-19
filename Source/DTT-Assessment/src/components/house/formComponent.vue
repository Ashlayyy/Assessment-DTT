<template>
    <section v-if="mode == 'create'" class="formSection">
        <goBackButton class="desktop" />
        <div class="mobileDiv">
            <goBackButton class="mobile" :message="' '" />
            <h2 class="title">Create new listing</h2>
        </div>
        <br />
        <form @submit.prevent="createListing()" class="listing-form">
            <div>
                <label class="required inputTitle" for="street">Street name</label>
                <input class="long_input input" id="streetInput" type="text" v-model="location.street"
                    placeholder="Enter the street name" @input="checkAll()" />
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="houseNumber">House number</label>
                    <input id="houseInput" class="short_input input" type="text" v-model="location.houseNumber"
                        placeholder="Enter house number" @input="checkAll()" />
                </div>
                <div>
                    <label class="inputTitle" for="addition">Addition (optional)</label>
                    <input class="short_input" type="text" v-model="location.houseNumberAddition" placeholder="e.g. A" />
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="zipCode">Postal code</label>
                <input id="zipInput" class="long_input input" type="text" v-model="location.zip" placeholder="e.g. 1000 AA"
                    @input="checkAll()" />
            </div>
            <div>
                <label class="required inputTitle" for="city">City</label>
                <input id="cityInput" class="long_input input" type="text" v-model="location.city"
                    placeholder="e.g. Utrecht" @input="checkAll()" />
            </div>
            <div>
                <label class="required inputTitle photoUploadText" for="image">Upload picture (PNG or JPG)</label>
                <br />
                <div class="parentDivider">
                    <label id="photoInput" class="photoUploadTextTwo input" for="image">
                        <div>
                            <img class="photo_image" src="../../assets/icons/DTTIcons/ic_upload@3x.png" id="photoUpload"
                                alt="Upload icon" />
                        </div>
                    </label>
                    <img v-if="file" class="photoRemove" src="../../assets/icons/DTTIcons/ic_clear_white@3x.png"
                        id="photoRemove" alt="Remove Icon" @click="removePhoto()" />
                </div>
                <input class="photoUpload" @change="checkPhoto($event)" name="image" id="image" type="file"
                    accept=".png, .jpg, .jpeg" />
            </div>
            <div>
                <label class="required inputTitle" for="price">Price</label>
                <input id="priceInput" class="long_input input" type="number" v-model="price" placeholder="e.g. €150.000"
                    @input="checkAll()" />
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="Size">Size</label>
                    <input id="sizeInput" class="short_input input" type="number" v-model="size" placeholder="e.g. 60m2"
                        @input="checkAll()" />
                </div>
                <div>
                    <label class="required inputTitle" for="addition">Garage</label>
                    <select class="short_input input" name="garage" id="garageInput" v-model="hasGarage"
                        placeholder="Select" @change="checkAll()">
                        <option disabled value="">Please Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="bedrooms">Bedrooms</label>
                    <input id="bedroomInput" class="short_input input" type="number" v-model="rooms.bedrooms"
                        placeholder="Enter amount" @input="checkAll()" />
                </div>
                <div>
                    <label class="required inputTitle" for="bedrooms">Bathrooms</label>
                    <input id="bathroomInput" class="short_input input" type="number" v-model="rooms.bathrooms"
                        placeholder="Enter amount" @input="checkAll()" />
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="price">Construction date</label>
                <input id="dateInput" class="long_input" type="number" v-model="constructionYear" placeholder="e.g. 1990"
                    @input="checkAll()" />
            </div>
            <div>
                <label class="required inputTitle" for="description">Description:</label>
                <textarea id="descriptionInput" class="long_input_textarea" v-model="description"
                    placeholder="Enter description" @input="checkAll()"></textarea>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <button :disabled="disabled == true" type="submit">Post</button>
        </form>
    </section>
    <section v-else-if="mode == 'edit'" class="formSection">
        <goBackButton :message="'Go back to detail page'" :toGoTo="`/detail/${house.id}`" />
        <h2 class="title">Edit listing</h2>
        <br />
        <form @submit.prevent="createListing('edit')" class="listing-form">
            <div>
                <label class="required inputTitle" for="street">Street name</label>
                <input class="long_input input" id="streetInput" type="text" v-model="house.location.street"
                    placeholder="Enter the street name" />
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="houseNumber">House number</label>
                    <input id="houseInput" class="short_input input" type="text" v-model="house.location.houseNumber"
                        placeholder="Enter house number" />
                </div>
                <div>
                    <label class="inputTitle" for="addition">Addition (optional)</label>
                    <input class="short_input input" type="text" v-model="house.location.houseNumberAddition"
                        placeholder="e.g. A" />
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="zipCode">Postal code</label>
                <input id="zipInput" class="long_input input" type="text" v-model="house.location.zip"
                    placeholder="e.g. 1000 AA" />
            </div>
            <div>
                <label class="required inputTitle" for="city">City</label>
                <input id="cityInput" class="long_input input" type="text" v-model="house.location.city"
                    placeholder="e.g. Utrecht" />
            </div>
            <div>
                <label class="required inputTitle photoUploadText" for="image">Upload picture (PNG or JPG)</label>
                <br />
                <div class="parentDivider">
                    <label id="photoInput" class="photoUploadTextTwo input" for="image">
                        <div>
                            <img class="photo_image" src="../../assets/icons/DTTIcons/ic_upload@3x.png" id="photoUpload"
                                alt="Upload icon" />
                        </div>
                    </label>
                    <img v-if="file" class="photoRemove" src="../../assets/icons/DTTIcons/ic_clear_white@3x.png"
                        id="photoRemove" alt="Remove Icon" @click="removePhoto()" />
                </div>
                <input class="photoUpload" @change="checkPhoto($event)" name="image" id="image" type="file"
                    accept=".png, .jpg, .jpeg" />
            </div>
            <div>
                <label class="required inputTitle" for="price">Price</label>
                <input id="priceInput" class="long_input input" type="number" v-model="house.price"
                    placeholder="e.g. €150.000" />
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="Size">Size</label>
                    <input id="sizeInput" class="short_input input" type="number" v-model="house.size"
                        placeholder="e.g. 60m2" />
                </div>
                <div>
                    <label class="required inputTitle" for="addition">Garage</label>
                    <select v-show="showGarageSelect == true" class="short_input input garageInput" name="garage"
                        id="garageInput" v-model="house.hasGarage">
                        <option id="yesOption" :value="true">Yes</option>
                        <option id="noOption" :value="false">No</option>
                    </select>
                </div>
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="bedrooms">Bedrooms</label>
                    <input id="bedroomInput" class="short_input input" type="number" v-model="house.rooms.bedrooms"
                        placeholder="Enter amount" />
                </div>
                <div>
                    <label class="required inputTitle" for="bedrooms">Bathrooms</label>
                    <input id="bathroomInput" class="short_input input" type="number" v-model="house.rooms.bathrooms"
                        placeholder="Enter amount" />
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="price">Construction date</label>
                <input id="dateInput" class="long_input input" type="number" v-model="house.constructionYear"
                    placeholder="e.g. 1990" />
            </div>
            <div>
                <label class="required inputTitle" for="description">Description:</label>
                <textarea id="descriptionInput" class="long_input_textarea input" v-model="house.description"
                    placeholder="Enter description"></textarea>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <button type="submit">Save</button>
        </form>
    </section>
    <section v-else>
        There has been a error! Please try again.
        <br />
        <goBackButton />
    </section>
</template>

<script>
import { useRouter } from 'vue-router'
import GoBackButton from '../buttons/GoBackButton.vue'
import API from '../data/API.js';

export default {
    components: {
        GoBackButton,
    },
    data() {
        return {
            /* Data for createSide */
            location: {
                street: null,
                houseNumber: null,
                houseNumberAddition: null,
                zip: null,
                city: null
            },
            description: null,
            errorMessage: '',
            price: null,
            rooms: {
                bathrooms: null,
                bedrooms: null
            },
            hasGarage: null,
            constructionYear: null,
            size: null,
            file: '',
            event: null,
            photo: {},
            formData: null,
            photoData: null,
            id: null,

            /* Data for editSide */
            house: {},
            showGarageSelect: null,
            photoEdited: null,

            /* Data for both */
            disabled: true
        }
    },
    props: {
        mode: null
    },
    methods: {
        checkPhoto(event) {
            if (this.mode == 'edit') {
                this.photoEdited = true
            }
            this.file = event.target.files[0].name
            this.event = event
            this.photo = {
                name: this.event.target.files[0].name,
                data: this.event.target.files[0]
            }
            const element = document.getElementById('photoUpload')
            element.src = URL.createObjectURL(this.event.target.files[0])
            element.classList.add('uploaded');
            this.checkAll();
        },
        removePhoto() {
            this.file = ''
            this.photo = {}
            this.event = null
            const element = document.getElementById('photoUpload')
            element.src = 'src/assets/icons/DTTIcons/ic_upload@3x.png'
            element.classList.remove('uploaded');
            this.checkAll();
        },
        createListing(mode) {
            if (!this.validateForm(mode)) {
                return
            }
        },
        async getOneHouse() {
            this.house = await API.getOneHouse(this.$route.params.id);
            this.house = this.house[0];
            if (!this.checkEmpty(this.house.location.houseNumberAddition)) {
                this.house.location.houseNumberAddition = '';
            }
            setTimeout(() => {
                const photoUpload = document.getElementById('photoUpload')
                photoUpload.src = this.house.image
                photoUpload.classList.add('uploaded')
                this.file = this.house.image.replace('https://api.intern.d-tt.nl/uploads/', '')
                if (this.house.hasGarage == true) {
                    document.getElementById('yesOption').setAttribute('selected', true)
                    document.getElementById('noOption').setAttribute('selected', false)
                    document.getElementById('yesOption').value = 'yes'
                } else {
                    document.getElementById('yesOption').setAttribute('selected', false)
                    document.getElementById('noOption').setAttribute('selected', true)
                    document.getElementById('noOption').value = 'no'
                }
                setTimeout(() => {
                    this.$forceUpdate()
                    this.showGarageSelect = true
                }, 125)
            }, 125)
        },
        addRedLine(id) {
            const elements = document.getElementsByClassName('redLine')
            const element = document.getElementById(id)
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('redLine')
            }
            element.classList.add('redLine')
        },
        checkAll() {
            const array = [
                this.location.street,
                this.location.houseNumber,
                this.location.zip,
                this.location.city,
                this.file,
                this.price,
                this.size,
                this.hasGarage,
                this.rooms.bathrooms,
                this.rooms.bedrooms,
                this.constructionYear,
                this.description
            ]

            let results = []
            array.forEach((element) => {
                results.push(element == null || element == '' ? true : false)
            })
            if (results.includes(true)) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        removeRedLine() {
            const elements = document.getElementsByClassName('redLine')
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('redLine')
            }
        },
        validateForm(mode) {
            this.checkAll();
            if (this.disabled == false) {
                this.sendForm(mode)
            }
        },
        checkEmpty(parameter) {
            if (
                parameter != '' &&
                parameter != null &&
                parameter != undefined &&
                parameter != 'null' &&
                parameter != 'undefined'
            )
                return true
            else {
                return false
            }
        },
        async sendImage() {
            try {
                if (this.house.id)
                    await API.createImage(this.house.id, this.photoData);
                else if (this.id)
                    await API.createImage(this.id, this.photoData);
                else return 'No house found';
            } catch (err) {
                console.log('Error ', err)
            }
        },
        async sendForm(mode) {
            try {
                console.log(mode, this.mode)
                if (this.mode == 'edit' || mode == 'edit') {
                    let formData = new FormData();
                    formData.append('price', this.house.price);
                    formData.append('bedrooms', this.house.rooms.bedrooms);
                    formData.append('bathrooms', this.house.rooms.bathrooms);
                    formData.append('size', this.house.size);
                    formData.append('streetName', this.house.location.street);
                    formData.append('houseNumber', this.house.location.houseNumber);
                    formData.append('numberAddition', this.house.location.houseNumberAddition != null && this.house.location.houseNumberAddition != undefined ? this.house.location.houseNumberAddition : ' ');
                    formData.append('zip', this.house.location.zip);
                    formData.append('city', this.house.location.city);
                    formData.append('constructionYear', this.house.constructionYear);
                    formData.append('hasGarage', this.house.hasGarage);
                    formData.append('description', this.house.description);
                    this.formData = formData;

                    if (this.photoEdited == true) {
                        let formDate = new FormData();
                        formDate.append('image', this.photo.data, this.photo.name);
                        this.photoData = formDate;
                    }

                    await API.editHouse(this.house.id, this.formData);
                    this.id = this.house.id
                } else {
                    let formData = new FormData();
                    formData.append('price', this.price);
                    formData.append('bedrooms', this.rooms.bedrooms);
                    formData.append('bathrooms', this.rooms.bathrooms);
                    formData.append('size', this.size);
                    formData.append('streetName', this.location.street);
                    formData.append('houseNumber', this.location.houseNumber);
                    formData.append('numberAddition', this.location.houseNumberAddition != null && this.location.houseNumberAddition != undefined ? this.location.houseNumberAddition : ' ');
                    formData.append('zip', this.location.zip);
                    formData.append('city', this.location.city);
                    formData.append('constructionYear', this.constructionYear);
                    formData.append('hasGarage', this.hasGarage);
                    formData.append('description', this.description);
                    this.formData = formData;

                    let formDate = new FormData();
                    formDate.append('image', this.photo.data, this.photo.name);
                    this.photoData = formDate;

                    const response = await API.createHouse(this.formData);
                    this.response = response;
                    this.id = this.response.id;
                    console.log(this.response)
                }
                if (this.photoEdited == true || this.mode == 'create' || mode == 'create') {
                    await this.sendImage()
                }
                this.$router.push({ name: 'detail', params: { id: this.id } })
            } catch (err) {
                console.error('Error creating or editing house: ', err)
                this.errorMessage = err;
                return err
            }
        }
    },
    async created() {
        if (this.mode == 'edit') {
            await this.getOneHouse()
        }
    },
    async mounted() {
        const router = useRouter()
        if (this.house.madeByMe == false) {
            router.go('/')
        } else return
    },
    errorCaptured (err) {
        console.log('hii', err)
    }
}
</script>

<style scoped>
.formSection {
    color: #4a4b4c;
    background-image: url('../../assets/icons/DTTIcons/img_background@3x.png');
    background-size: cover;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding-left: 10rem;
    justify-content: center;
    align-items: start;
    padding-bottom: 5rem;
}

.formSection>h2 {
    color: black;
}

.listing-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.listing-form div {
    margin-bottom: 15px;
}

.listing-form label {
    display: block;
    margin-bottom: 5px;
}

.listing-form input,
.listing-form select,
.listing-form textarea {
    width: 25rem;
    padding: 1rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 0.3rem;
}

.listing-form textarea {
    height: 8rem;
}

.shortInputs {
    display: flex;
    gap: 2rem;
    flex-direction: row;
    justify-content: space-between;
    width: 0;
}

.listing-form div>div input,
.listing-form div>div select {
    width: 10rem;
}

.listing-form button {
    background-color: #eb5440;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 50%;
}

.listing-form button:disabled {
    background-color: #ddd;
    color: #666;
    cursor: not-allowed;
}

.listing-form .error-message {
    color: red;
    margin-top: 10px;
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: italic;
    font-size: 14px;
}

.required::after {
    content: '*';
}

.photoUpload {
    display: none;
    opacity: 0;
    position: absolute;
    z-index: -1;
}

.photoUploadText {
    cursor: pointer;
}

.photoUploadTextTwo {
    cursor: pointer;
    height: 7rem;
    width: 7rem;
    border: #e8e8e8 dashed 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.photoUploadTextTwo>div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 100%;
}

.photoUploadTextTwo>.uploaded {
    border: none;
}

.photo_image {
    height: 50%;
    aspect-ratio: 1/1;
}

.photo_image.uploaded {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 0.2rem;
    border: none;
}

.parentDivider {
    position: relative;
}

.photoRemove {
    position: absolute;
    height: 2rem;
    aspect-ratio: 1/1;
    top: -1rem;
    left: 6rem;
    z-index: 2;
}

.garageInput {
    border: none;
    outline: none;
    box-shadow: none;
    all: none;
}

.redLine {
    border: 0.1rem solid red !important;
}

.input {
    font-family: 'open-sans';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
}

.inputTitle {
    font-family: 'open-sans';
    font-weight: 600;
    font-style: normal;
    font-size: 14px;
    color: #4a4b4c;
}

.title {
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-size: 32px;
}

.mobile {
    display: none;
}

@media screen and (max-width: 650px),
screen and (max-device-width: 650px) {
    .input {
        font-size: 12px;
    }

    .inputTitle {
        font-size: 12px;
    }

    .title {
        font-size: 18px;
    }

    .desktop {
        display: none;
    }

    .mobile {
        display: flex;
    }

    .listing-form input,
    .listing-form select,
    .listing-form textarea {
        width: 20rem;
    }

    .shortInputs {
        max-width: 15rem;
    }

    .listing-form div>div input,
    .listing-form div>div select {
        width: 5rem;
    }

    .formSection {
        padding: 0;
        margin: 0;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: -1rem;
    }

    .mobileDiv {
        width: 70%;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-between;
    }

    .photo_image {
        height: 25%;
    }
}
</style>
