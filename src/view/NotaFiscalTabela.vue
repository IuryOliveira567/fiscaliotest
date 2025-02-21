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
import { BuscaNotasFiscais } from '@/controller';
import VueTableLite from "vue3-table-lite/ts"; // TypeScript

export default defineComponent({
  name: 'NotaFiscalTabela',
  components: {
    VueTableLite
  },
  created() {
    //const buscaNotasFiscais = new BuscaNotasFiscais;
    //buscaNotasFiscais.obterNotasFicais();
  },
  data() {
    return {
      table: {
        isLoading: false,
        columns: [
          {
            label: "Id Nota",
            field: "id",
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
            field: "Data",
            width: "15%",
            sortable: true,
          },
        ],
        rows: [{
         id: 1,
         emissor: 'jack',
         daa: '25/02/2025'
       },{
         id: 2,
         emissor: 'rose',
         data: '22/02/2025'
       }],
        totalRecordCount: 0,
        sortable: {
          order: "id",
          sort: "asc",
        },
      }
    }
  }
})
</script>