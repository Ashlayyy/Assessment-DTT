<script>
import { RouterLink } from 'vue-router'
import EditButton from '../buttons/EditButton.vue'
import DeleteButton from '../buttons/DeleteButton.vue'
import { useModalStore } from '../../stores/DeleteModal'

export default {
  data: () => {
    return {
      houseNumberAdditiveChecked: ''
    }
  },
  components: {
    RouterLink,
    EditButton,
    DeleteButton
  },
  props: {
    streetName: String,
    city: String,
    priceDisplay: String,
    Number,
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
    deleteHouse() {
      const { setState } = useModalStore()
      setState(true)
    }
  }
}
</script>
<template>
  <RouterLink class="router_link" :to="{ name: 'detail', params: { id: this.id } }">
    <div class="house-card">
      <img :src="picture" alt="House Image" class="house-image" />
      <div class="houseCardDetails">
        <div class="house-details">
          <h3 class="blackText">
            {{ streetName }} {{ houseNumber }}
            {{
              houseNumberAdditive !== null ||
              houseNumberAdditive !== undefined ||
              houseNumberAdditive !== 'null'
                ? houseNumberAdditive
                : ' '
            }}
          </h3>
          <p class="blackText">€ {{ priceDisplay }}</p>
          <p>{{ zipCode }} {{ city }}</p>
          <div class="property-icons">
            <div class="property-icon">
              <img src="../../assets/icons/DTTIcons/ic_bed@3x.png" alt="Bedroom Icon" />
              <p>{{ bedrooms }}</p>
            </div>
            <div class="property-icon">
              <img src="../../assets/icons/DTTIcons/ic_bath@3x.png" alt="Bathroom Icon" />
              <p>{{ bathrooms }}</p>
            </div>
            <div class="property-icon">
              <img src="../../assets/icons/DTTIcons/ic_size@3x.png" alt="Size Icon" />
              <p>{{ size }} m2</p>
            </div>
          </div>
        </div>
        <div v-if="this.made == true" class="buttons">
          <div class="buttonsDivider" v-if="this.made == true">
            <EditButton :id="id" />
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
  color: #4a4b4c;
}

.blackText {
  color: #000000;
}

.house-image {
  max-height: 9rem;
  aspect-ratio: 4/3;
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
  gap: 0.5rem;
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

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .house-card {
    gap: 0.5rem;
    font-size: 12px;
  }

  .house-image {
    aspect-ratio: 4/3;
    max-width: 5rem;
    padding: 0;
  }

  .buttonsDivider {
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: row;
    height: 2.5rem;
    width: 100%;
    gap: 0.25rem;
  }

  .property-icon img {
    height: 15px;
    aspect-ratio: 1/1;
  }
}
</style>
