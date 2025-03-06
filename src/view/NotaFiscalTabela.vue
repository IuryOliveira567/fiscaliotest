<template>
  <div class="nota-fiscal-tabela">
    <VueTableLite 
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
     />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BuscaNotasFiscaisController } from '@/controller';
import { BuscaNotasFiscais, NotaFiscalItem, TabelaModel } from '../model';
import VueTableLite from "vue3-table-lite/ts";

export default defineComponent({
  name: 'NotaFiscalTabela',
  components: {
    VueTableLite
  },
  created() {
    const buscaNotas = new BuscaNotasFiscais();
    const buscaNotasFiscais = new BuscaNotasFiscaisController(buscaNotas);
    const entradaNotas = buscaNotasFiscais.retornaNotasFiscais();
    
    entradaNotas.then((items: any) => {
      items.forEach((item: NotaFiscalItem) => {
        this.table.rows.push(item);
      })
    });
    
  },
  data() {
    return {
      table: {
        isLoading: false,
        columns: [
          {
            label: "Id Nota",
            field: "idnota",
            width: "3%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Emissor",
            field: "emissor",
            width: "10%",
            sortable: true,
          },
          {
            label: "Data",
            field: "data",
            width: "15%",
            sortable: true,
          },
        ],
        rows: [],
        totalRecordCount: 2,
        sortable: {
          order: "id",
          sort: "asc",
        },
      } as TabelaModel
    }
  }
})
</script>