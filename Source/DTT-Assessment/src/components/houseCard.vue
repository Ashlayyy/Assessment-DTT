<script>
export default {
  props: {
    streetName: String,
    city: String,
    price: Number,
    picture: String,
    zipCode: String,
    houseNumber: Number,
    houseNumberAdditive: String,
    bedrooms: Number,
    bathrooms: Number,
    size: Number,
  },
};
</script>

<template>
  <div class="house-card">
    <img :src="picture" alt="House Image" class="house-image" />
    <div class="house-details">
      <h3>{{ streetName }}</h3>
      <p>€ {{ price }}</p>
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
  </div>
</template>

<style scoped>

.house-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
}

.property-icon {
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  padding: 0.5rem;
  line-height: 1rem;
}

.property-icon img {
  max-width: 25px;
  max-height: 25px;
  line-height: 1rem;
}
</style>
