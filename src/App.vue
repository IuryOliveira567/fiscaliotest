<template>
  <div class="main-container">
    <NotaFiscalTabela/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NotaFiscalTabela } from './view';

export default defineComponent({
  name: 'App',
  components: {
    NotaFiscalTabela
  }
});
</script>

<style lang="scss">
  .option-buttons {
    pointer-events: none;

    button {
      all: reset;
      position: relative;
      z-index: 1000;
      pointer-events: auto;

    }
  }
</style>
