<script>
import { RouterLink } from 'vue-router';
import { useIdStore } from '../stores/id';
import EditButton from './EditButton.vue';
import DeleteButton from './DeleteButton.vue';
import { useModalStore } from '../stores/deleteModal';


export default {
  components: {
    RouterLink,
    EditButton,
    DeleteButton
  },
  props: {
    streetName: String,
    city: String,
    priceDisplay: String, Number,
    picture: String,
    zipCode: String,
    houseNumber: Number,
    houseNumberAdditive: String,
    bedrooms: Number,
    bathrooms: Number,
    size: Number,
    id: Number,
    made: Boolean
  },
  methods: {
    setId(id) {
      const { setId } = useIdStore();
      if (id >= 2) setId(id); else console.log('Error with ID, too low')
    },
    deleteHouse() {
      const { setState, getState } = useModalStore()
      setState(true);
      console.log(getState())
    }
  }
};
</script>

<template>
  <RouterLink class="router_link" to="/detail" @click="setId(id)">
    <div class="house-card">
      <img :src="picture" alt="House Image" class="house-image" />
      <div class="houseCardDetails">
        <div class="house-details">
          <h3 class="blackText">{{ streetName }} {{ houseNumber }} {{ houseNumberAddition ? houseNumberAddition : '' }}</h3>
          <p class="blackText">€ {{ priceDisplay }}</p>
          <p>{{ zipCode }} {{ city }}</p>
          <div class="property-icons">
            <div class="property-icon">
              <img src="./icons/DTTIcons/ic_bed@3x.png" alt="Bedroom Icon" />
              <p>{{ bedrooms }}</p>
            </div>
            <div class="property-icon">
              <img src="./icons/DTTIcons/ic_bath@3x.png" alt="Bathroom Icon" />
              <p>{{ bathrooms }}</p>
            </div>
            <div class="property-icon">
              <img src="./icons/DTTIcons/ic_size@3x.png" alt="Size Icon" />
              <p>{{ size }} m2</p>
            </div>
          </div>
        </div>
        <div v-if="this.made == true" class="buttons">
          <div class="buttonsDivider" v-if="this.made == true">
            <EditButton @click="setId(id)" />
            <DeleteButton @click="deleteHouse()" />
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

.buttonsDivider {
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: row;
  height: 5rem;
  width: 100%;
  gap: 0.5rem;
}

.router_link {
  text-decoration: none;
  color: #000000;
}

.house-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-family: 'open-sans';
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  color: #4A4B4C;
}

.blackText {
  color: #000000;
}

.house-image {
  max-height: 9rem;
  aspect-ratio: 3/2;
  border-radius: 8px;
}

.house-details {
  text-align: left;
}

.property-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.property-icon {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  line-height: 1rem;
}

.property-icon img {
  max-width: 25px;
  max-height: 25px;
  line-height: 1rem;
}
.houseCardDetails {
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
}
</style>
