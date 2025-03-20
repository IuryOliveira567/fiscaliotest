<template>
  <div class="confirm-modal">
    <div class="confirm">
      <div class="body">
        <h2>Deletar Emissor :</h2><br/>
        <span class="mx-auto d-block text-center">{{ emissor }}</span>
      </div>
      <div class="row">
        <div @click="$emit('deletaResposta', true)" class="col-md-6"><button class="btn btn-success btn-lg" type="button">Sim</button></div>
        <div @click="$emit('deletaResposta', false)" class="col-md-6"><button class="btn btn-danger btn-lg" type="button">Não</button></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmModal',
  emits: ['deletaResposta'],
  props: {
    emissor: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.confirm-modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1050 !important;
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .confirm {
      width: 35vw;
      height: 40vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1055 !important;
      pointer-events: auto;
      background-color: white;
      border-radius: 25px;
      justify-content: space-evenly;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);

      button {
        margin-left: 1rem;
        margin-right: 1rem;
      }

      .row {
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }

    .body {
      span {
        font-size: 2rem;
      }
    }
  }
</style>