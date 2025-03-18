<template>
  <div class="nota-fiscal-tabela">
    <VueTableLite
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :is-loading="table.isLoading"
      :table-key="table.rows.length"
      :has-body-row-slot="true"
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
          {
            label: "Ações",
            field: "actions",
            width: "4%",
            sortable: false,
            display: (row: NotaFiscalItem) => {
              return `<div class='option-buttons' data-id="${row.idnota}">
                         <button type="button" class="edit-button">Editar</button>
                         <button type="button" class="delete-button">Deletar</button>
                       </div>`
                    
            }
          }
        ],
        rows: [],
        totalRecordCount: 5,
        sortable: {
          order: "idnota",
          sort: "asc",
        },
      } as TabelaModel
    }
  },
  mounted() { 
    this.$el.addEventListener('click', (event: any) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('edit-button')) {
        const rowId = target.closest('.option-buttons')?.getAttribute('data-id');
        const row = this.table.rows.find(r => r.idnota === Number(rowId));
      
        if (row) this.editRow(row);
      } else if (target.classList.contains('delete-button')) {
        const rowId = target.closest('.option-buttons')?.getAttribute('data-id');
        const row = this.table.rows.find(r => r.idnota === Number(rowId));
      
        if (row) this.deleteRow(row);
      }
    });
  },
  methods: {
    editRow(row: any) {
      console.log(row);
      alert(`Editar: ${row}`);
    },
    deleteRow(row: any) {
      alert(`Excluir: ${row}`);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
