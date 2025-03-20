<template>
  <div class="nota-fiscal-form-modal">
    <div class="nota-fiscal-form">
      <form class="form-control">
        <h1>Editar Emissor</h1>
        <div>
          <div class="row">
            <div class="col-md-6">
              <label for="id-nota" class="form-label">ID: * </label>
              <input v-model="dadosNotaFiscal.idnota" type="number" class="form-control" :readonly="editaNota" />
            </div>
            <div class="col-md-6">
              <label for="id-data" class="form-label">DATA: * </label>
              <input v-model="dadosNotaFiscal.data" type="date" class="form-control" :readonly="editaNota" />
            </div>
          </div>
          <div class="row">
            <label>EMISSOR: * </label>
            <input v-model="dadosNotaFiscal.emissor" type="text" class="form-control" />
          </div>
        </div>
        <div>
          <button @click="editaNota ? editarNotaFiscal() : salvarNotaFiscal()" class="btn btn-success btn-lg" type="button">Salvar</button>
          <button @click="$emit('fecha-modal')" class="btn btn-primary btn-lg" type="button">Fechar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType  } from 'vue';
import { NotaFiscalItem } from '@/model';
import { formatarData } from '@/utils';

export default defineComponent({
  name: 'NotaFiscalForm',
  props: {
    notaFiscalData: {
      type: Object as PropType<NotaFiscalItem>,
      required: true
    },
    editaNota: {
      type: Boolean,
      required: true
    },
    editaNotaFiscal: {
      type: Function,
      required: true
    },
    salvaNotaFiscal: {
      type: Function,
      required: true
    }
  },
  created() {
    this.dadosNotaFiscal = Object.assign({}, this.notaFiscalData);
    this.dadosNotaFiscal.data = formatarData(this.dadosNotaFiscal.data);
  },
  data() {
    return {
      dadosNotaFiscal: {} as NotaFiscalItem
    }
  },
  methods: {
    editarNotaFiscal() {
      this.editaNotaFiscal(this.dadosNotaFiscal);
    },
    salvarNotaFiscal() {
      this.salvaNotaFiscal(this.dadosNotaFiscal);
    }
  }
})
</script>

<style lang="scss" scoped>
  .nota-fiscal-form-modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1050 !important;
    background-color: rgba(0, 0, 0, 0.4);
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .nota-fiscal-form {
      width: 50vw;
      height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1055 !important;
      pointer-events: auto;

      h1 {
        margin-top: 0.6rem;
      }

      form {
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 20px;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);

        input {
          margin-bottom: 2rem;
        }
      }

      button {
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
  }
</style>