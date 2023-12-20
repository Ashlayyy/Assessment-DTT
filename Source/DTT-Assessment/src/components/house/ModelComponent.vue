<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DeleteModal',
  props: {
    showModal: Boolean
  }
}
</script>
<style>
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  z-index: 90;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  max-width: 100%;
  height: 400px;
  max-height: 100%;
  background: #ffffff;
  border-radius: 1rem;
  overflow-x: none;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

@media screen and (max-width: 650px), screen and (max-device-width: 650px) {
  .modal {
    height: max-content;
    padding-bottom: 5rem;
    padding-right: 2rem;
    padding-left: 2rem;
    width: 15rem;
  }
}
</style>
