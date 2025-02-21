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
</style>
