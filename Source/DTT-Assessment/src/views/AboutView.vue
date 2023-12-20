<script setup></script>

<template>
  <main class="textMain">
    <div class="textDiv">
      <h2 class="header">About DTT Real Estate</h2>
      <p class="textParagraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consectetur molestias fugiat
        eligendi, quam reprehenderit soluta hic repellat. Nesciunt ut asperiores ex ea. Voluptates,
        voluptate. Reprehenderit unde non doloremque saepe.
        <br /><br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur et odio voluptatibus,
        nostrum quasi est earum a laborum assumenda quidem odit cum illum. Ullam aperiam repellat
        laboriosam illum architecto illo.
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis iure asperiores
        corrupti? Architecto error, quo tenetur nemo temporibus itaque voluptas expedita unde
        inventore, veniam veritatis voluptates aspernatur sed laudantium?
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In placeat modi voluptates! Magni
        animi fugiat maiores beatae exercitationem earum in dolorem repudiandae minus, sunt,
        expedita nemo quam. Nam, debitis soluta!
      </p>
      <br />
      <h3 class="header">Design and Development</h3>
      <div class="divider">
        <img src="../assets/icons/DTTIcons/img_logo_dtt@3x.png" alt="Logo DTT" class="logo" />
        <p class="textDivider">
          By DTT
          <a target="_blank" href="https://www.d-tt.nl" class="link">www.d-tt.nl</a>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.textMain {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.textDiv {
  display: flex;
  align-items: start;
  justify-content: center;
  text-align: left;
  width: 60%;
  flex-direction: column;
  gap: 1rem;
  color: #4a4b4c;
}

.header {
  color: #000000;
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 32px;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: row;
  padding-bottom: 2.5rem;
}

.textDivider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-direction: column;
}

.textParagraph,
.divider {
  font-family: 'open-sans';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 1.5rem;
}

.link {
  color: #067bc2;
  text-decoration: none;
}

.logo {
  height: 75px;
  aspect-ratio: 2/0.75;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .header {
    font-size: 18px;
  }

  .textParagraph,
  .divider {
    font-size: 14px;
  }

  .logo {
    height: 50px;
  }
}
</style>
