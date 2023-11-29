<template>
    <section v-if="mode == 'create'" class="formSection">
        <goBackButton class="desktop" />
        <div class="mobileDiv">
            <goBackButton class="mobile" :message="' '"/>
            <h2 class="title">Create new listing</h2>
        </div>
        <br>
        <form @submit.prevent="createListing()" class="listing-form">
            <div>
                <label class="required inputTitle" for="street">Street name</label>
                <input class="long_input input" id="streetInput" type="text" v-model="location.street"
                    placeholder="Enter the street name" @change="checkAll()"/>
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="houseNumber">House number</label>
                    <input id="houseInput" class="short_input input" type="text" v-model="location.houseNumber"
                        placeholder="Enter house number" @change="checkAll()"/>
                </div>
                <div>
                    <label class="inputTitle" for="addition">Addition (optional)</label>
                    <input class="short_input" type="text" v-model="location.houseNumberAddition" placeholder="e.g. A" />
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="zipCode">Postal code</label>
                <input id="zipInput" class="long_input input" type="text" v-model="location.zip"
                    placeholder="e.g. 1000 AA" @change="checkAll()"/>
            </div>
            <div>
                <label class="required inputTitle" for="city">City</label>
                <input id="cityInput" class="long_input input" type="text" v-model="location.city"
                    placeholder="e.g. Utrecht" @change="checkAll()"/>
            </div>
            <div>
                <label class="required inputTitle photoUploadText" for="image">Upload picture (PNG or JPG)</label>
                <br>
                <div class="parentDivider">
                    <label id="photoInput" class="photoUploadTextTwo input" for="image">
                        <div>
                            <img class="photo_image" src="./icons/DTTIcons/ic_upload@3x.png" id="photoUpload"
                                alt="Upload icon">
                        </div>
                    </label>
                    <img v-if="file" class="photoRemove" src="./icons/DTTIcons/ic_clear_white@3x.png" id="photoRemove"
                        alt="Remove Icon" @click="removePhoto()">
                </div>
                <input class="photoUpload" @change="checkPhoto($event)" name="image" id="image" type="file"
                    accept=".png, .jpg, .jpeg" />
                <p v-if="file">File you just uploaded:
                    {{ file }}</p>
            </div>
            <div>
                <label class="required inputTitle" for="price">Price</label>
                <input id="priceInput" class="long_input input" type="number" v-model="price" placeholder="e.g. €150.000" @change="checkAll()"/>
            </div>
            <div class="shortInputs">
                <div>
                    <label class="required inputTitle" for="Size">Size</label>
                    <input id="sizeInput" class="short_input input" type="number" v-model="size" placeholder="e.g. 60m2" @change="checkAll()"/>
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
                        placeholder="Enter amount" @change="checkAll()"/>
                </div>
                <div>
                    <label class="required inputTitle" for="bedrooms">Bathrooms</label>
                    <input id="bathroomInput" class="short_input input" type="number" v-model="rooms.bathrooms"
                        placeholder="Enter amount" @change="checkAll()"/>
                </div>
            </div>
            <div>
                <label class="required inputTitle" for="price">Construction date</label>
                <input id="dateInput" class="long_input" type="number" v-model="constructionYear" placeholder="e.g. 1990" @change="checkAll()"/>
            </div>
            <div>
                <label class="required inputTitle" for="description">Description:</label>
                <textarea id="descriptionInput" class="long_input_textarea" v-model="description"
                    placeholder="Enter description" @change="checkAll()"></textarea>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <button :disabled="disabled == true" type="submit">Post</button>
            <RouterLink class="link" id="link" to="/detail" @click="setId(id)"></RouterLink>
        </form>
    </section>
    <section v-else-if="mode == 'edit'" class="formSection">
        <goBackButton :message="'Go back to detail page'" :toGoTo="'/detail'" @click="setId(house.id)" />
        <h2 class="title">Edit listing</h2>
        <br>
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
                <br>
                <div class="parentDivider">
                    <label id="photoInput" class="photoUploadTextTwo input" for="image">
                        <div>
                            <img class="photo_image" src="./icons/DTTIcons/ic_upload@3x.png" id="photoUpload"
                                alt="Upload icon">
                        </div>
                    </label>
                    <img v-if="file" class="photoRemove" src="./icons/DTTIcons/ic_clear_white@3x.png" id="photoRemove"
                        alt="Remove Icon" @click="removePhoto()">
                </div>
                <input class="photoUpload" @change="checkPhoto($event)" name="image" id="image" type="file"
                    accept=".png, .jpg, .jpeg" />
                <p v-if="file">Filename aquired: <br>
                    {{ file }}</p>
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
        <br>
        <goBackButton />
    </section>
</template>
  
<script>
import { RouterLink, useRouter } from 'vue-router';
import goBackButton from '../buttons/goBackButton.vue';
import { useIdStore } from '../../stores/id';
const { setId, returnId } = useIdStore();

export default {
    components: {
        goBackButton,
        RouterLink,
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
            house: [],
            showGarageSelect: null,
            photoEdited: null,

            /* Data for both */
            disabled: true
        };
    },
    props: {
        mode: null
    },
    methods: {
        checkPhoto(event) {
            if (this.mode == 'edit') {
                this.photoEdited = true;
            }
            this.file = event.target.files[0].name;
            this.event = event;
            this.photo = {
                name: this.event.target.files[0].name,
                data: this.event.target.files[0]
            };
            const element = document.getElementById('photoUpload')
            element.src = URL.createObjectURL(this.event.target.files[0]);
            element.classList.add('uploaded');
        },
        removePhoto() {
            this.file = '';
            this.photo = {};
            this.event = null;
            const element = document.getElementById('photoUpload')
            element.src = 'src/components/icons/DTTIcons/ic_upload@3x.png';
            element.classList.remove('uploaded');
        },
        createListing(mode) {
            if (!this.validateForm(mode)) {
                return;
            }
        },
        async getOneHouse() {
            const id = returnId();
            this.house = await this.createGetRequest(`https://api.intern.d-tt.nl/api/houses/${id}`, 'get');
            this.house = this.house[0];
            if (!this.checkEmpty(this.house.location.houseNumberAddition)) {
                this.house.location.houseNumberAddition = '';
            }
            setTimeout(() => {
                const photoUpload = document.getElementById('photoUpload');
                photoUpload.src = this.house.image;
                photoUpload.classList.add('uploaded');
                this.file = this.house.image.replace('https://api.intern.d-tt.nl/uploads/', '');
                if (this.house.hasGarage == true) {
                    document.getElementById('yesOption').setAttribute('selected', true)
                    document.getElementById('noOption').setAttribute('selected', false)
                    document.getElementById('yesOption').value = 'yes';
                } else {
                    document.getElementById('yesOption').setAttribute('selected', false)
                    document.getElementById('noOption').setAttribute('selected', true)
                    document.getElementById('noOption').value = 'no';
                }
                setTimeout(() => {
                    this.$forceUpdate();
                    this.showGarageSelect = true;
                }, 500);
            }, 500)
        },
        setId(id) {
            setId(id);
        },
        addRedLine(id) {
            const elements = document.getElementsByClassName('redLine');
            const element = document.getElementById(id);
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('redLine');
            }
            element.classList.add('redLine');
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
            let results = [];
            for(let i = 0; i < array.length; i++) {
                results.push(this.checkEmpty(array[i]));
            }
            const response = results.join('-');
            const final = response.includes('false');
            if (final == false) this.disabled = false;
            else this.disabled = true
        },
        removeRedLine() {
            const elements = document.getElementsByClassName('redLine');
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('redLine');
            }
        },
        validateForm(mode) {
            this.removeRedLine()
            if (mode == 'edit') {
                if (!this.checkEmpty(this.house.location.street)) {
                    this.addRedLine('streetInput');
                    this.errorMessage = 'Streetname is required'
                } else if (!this.checkEmpty(this.house.location.houseNumber)) {
                    this.addRedLine('houseInput');
                    this.errorMessage = 'House number is required'
                } else if (!this.checkEmpty(this.house.location.zip)) {
                    this.addRedLine('zipInput]');
                    this.errorMessage = 'Zip code is required'
                } else if (!this.checkEmpty(this.house.location.city)) {
                    this.addRedLine('cityInput');
                    this.errorMessage = 'City is required'
                } else if (!this.checkEmpty(this.file)) {
                    this.addRedLine('photoInput');
                    this.errorMessage = 'A photo is required'
                } else if (!this.checkEmpty(this.house.price)) {
                    this.addRedLine('priceInput');
                    this.errorMessage = 'The price is required'
                } else if (!this.checkEmpty(this.house.size)) {
                    this.addRedLine('sizeInput');
                    this.errorMessage = 'The size is required'
                } else if (this.house.hasGarage != true && this.house.hasGarage != false) {
                    console.log(this.house.hasGarage)
                    this.addRedLine('garageInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.house.rooms.bedrooms)) {
                    this.addRedLine('bedroomInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.house.rooms.bathrooms)) {
                    this.addRedLine('bathroomInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.house.constructionYear)) {
                    this.addRedLine('dateInput');
                    this.errorMessage = 'The construction date is required'
                } else if (!this.checkEmpty(this.house.description)) {
                    this.addRedLine('descriptionInput');
                    this.errorMessage = 'A description is required'
                } else {
                    if (this.errorMessage == '') {
                        let formData = new FormData();
                        formData.append('price', this.house.price);
                        formData.append('bedrooms', this.house.rooms.bedrooms);
                        formData.append('bathrooms', this.house.rooms.bathrooms);
                        formData.append('size', this.house.size);
                        formData.append('streetName', this.house.location.street);
                        formData.append('houseNumber', this.house.location.houseNumber);
                        formData.append('numberAddition', this.house.location.houseNumberAddition);
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
                        this.sendForm(`https://api.intern.d-tt.nl/api/houses/${this.house.id}`);
                        return true;
                    } else {
                        this.errorMessage = 'Something went wrong, please try again later';
                        return false;
                    }
                }
            } else {
                if (!this.checkEmpty(this.location.street)) {
                    this.addRedLine('streetInput');
                    this.errorMessage = 'Streetname is required'
                } else if (!this.checkEmpty(this.location.houseNumber)) {
                    this.addRedLine('houseInput');
                    this.errorMessage = 'House number is required'
                } else if (!this.checkEmpty(this.location.zip)) {
                    this.addRedLine('zipInput]');
                    this.errorMessage = 'Zip code is required'
                } else if (!this.checkEmpty(this.location.city)) {
                    this.addRedLine('cityInput');
                    this.errorMessage = 'City is required'
                } else if (!this.checkEmpty(this.file)) {
                    this.addRedLine('photoInput');
                    this.errorMessage = 'A photo is required'
                } else if (!this.checkEmpty(this.price)) {
                    this.addRedLine('priceInput');
                    this.errorMessage = 'The price is required'
                } else if (!this.checkEmpty(this.size)) {
                    this.addRedLine('sizeInput');
                    this.errorMessage = 'The size is required'
                } else if (!this.checkEmpty(this.hasGarage)) {
                    this.addRedLine('garageInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.rooms.bedrooms)) {
                    this.addRedLine('bedroomInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.rooms.bathrooms)) {
                    this.addRedLine('bathroomInput');
                    this.errorMessage = 'A required field is missing'
                } else if (!this.checkEmpty(this.constructionYear)) {
                    this.addRedLine('dateInput');
                    this.errorMessage = 'The construction date is required'
                } else if (!this.checkEmpty(this.description)) {
                    this.addRedLine('descriptionInput');
                    this.errorMessage = 'A description is required'
                } else {
                    if (this.errorMessage == '') {
                        let formData = new FormData();
                        formData.append('price', this.price);
                        formData.append('bedrooms', this.rooms.bedrooms);
                        formData.append('bathrooms', this.rooms.bathrooms);
                        formData.append('size', this.size);
                        formData.append('streetName', this.location.street);
                        formData.append('houseNumber', this.location.houseNumber);
                        formData.append('numberAddition', this.location.houseNumberAddition);
                        formData.append('zip', this.location.zip);
                        formData.append('city', this.location.city);
                        formData.append('constructionYear', this.constructionYear);
                        formData.append('hasGarage', this.hasGarage);
                        formData.append('description', this.description);
                        this.formData = formData;

                        let formDate = new FormData();
                        formDate.append('image', this.photo.data, this.photo.name);
                        console.log('Photo: ', this.photo)
                        this.photoData = formDate;
                        this.sendForm();
                        return true;
                    } else {
                        console.log(this.errorMessage)
                        this.errorMessage = 'Something went wrong, please try again later';
                        return false;
                    }
                }
            }
        },
        checkEmpty(parameter) {
            if (parameter != '' && parameter != null && parameter != undefined && parameter != 'null' && parameter != 'undefined') return true
            else {
                return false
            }
        },
        async sendImage() {
            try {
                if (this.house.id) await this.createImageRequest(`https://api.intern.d-tt.nl/api/houses/${this.house.id}/upload`, 'post', this.photoData);
                else await this.createImageRequest(`https://api.intern.d-tt.nl/api/houses/${this.id}/upload`, 'post', this.photoData);
            } catch (err) {
                console.log('Error ', err)
            }
        },
        async sendForm(url) {
            if (url) {
                try {
                    if (this.mode == 'edit') {
                        await this.createEditRequest(url, 'post', this.formData);
                    } else {
                        const response = await this.createPostRequest(url, 'post', this.formData);
                        this.response = response;
                        this.id = response.id;
                    }
                    if (this.photoEdited == true || this.mode == 'create') {
                        await this.sendImage();
                    }
                    console.log(this.house.id)
                    setId(this.house.id);
                    const router = useRouter();
                    await router.push({ path: '/detail' });
                } catch (err) {
                    console.log('Error ', err)
                }
            } else {
                try {
                    const response = await this.createPostRequest('https://api.intern.d-tt.nl/api/houses', 'post', this.formData);
                    this.id = response.id;
                    if (this.photoEdited == true || this.mode == 'create') this.sendImage()
                } catch (err) {
                    console.log('Error ', err)
                }
            }
        },
        async createPostRequest(url, method, formData) {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'X-Api-Key': "5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo",
                },
                body: formData ? formData : ''
            })
            const final = await response.json();
            return final;
        },
        async createEditRequest(url, method, formData) {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'X-Api-Key': "5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo",
                },
                body: formData ? formData : ''
            })
            return response;
        },
        async createImageRequest(url, method, formData) {
            await fetch(url, {
                method: method,
                headers: {
                    'X-Api-Key': "5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo",
                },
                body: formData ? formData : ''
            })
            return true;
        },
        async createGetRequest(url, method) {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'X-Api-Key': "5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo",
                },
            })
            const final = await response.json();
            return final;
        }
    },
    async created() {
        if (this.mode == 'edit') {
            await this.getOneHouse();
        }
    },
    async mounted() {
        const router = useRouter();
        if (this.house.madeByMe == false) {
            await router.push({ path: '/' });
            window.location.reload();
        } else return
    }
};
</script>
  
<style scoped>
.formSection {
    color: #4A4B4C;
    background-image: url('./icons/DTTIcons/img_background@3x.png');
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
}

.listing-form div>div input,
.listing-form div>div select {
    width: 10rem;
}

.listing-form button {
    background-color: #EB5440;
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
    content: "*";
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
    border: #E8E8E8 dashed 0.1rem;
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
    color: #4A4B4C;
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

@media screen and (max-width: 650px), screen and (max-device-width: 650px) { 
    
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