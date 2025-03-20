<template>
  <div class="nota-fiscal-tabela">
    <div>
      <div v-if="formNotaFiscal">
        <NotaFiscalForm
          :notaFiscalData="notaFiscalData"
          :editaNotaFiscal="updateRow"
          :salvaNotaFiscal="saveRow"
          :editaNota="editarNota"
          @fecha-modal="closeModal()"
        />
      </div>
      <div>
        <button @click="newRow()" type="button" class="novo-btn btn btn-primary btn-lg">Adicionar</button>
      </div>
      <VueTableLite
        :columns="table.columns" 
        :rows="table.rows"
        :total="table.totalRecordCount"
        :is-loading="table.isLoading"
        :table-key="table.rows.length"
        :has-body-row-slot="true"
       />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { GerenciaNotasFiscaisController } from '@/controller';
import { NotaFiscalItem, TabelaModel } from '../model';
import VueTableLite from "vue3-table-lite/ts";
import { NotaFiscalForm } from '@/components';
import { formatarData } from '../utils';


export default defineComponent({
  name: 'NotaFiscalTabela',
  components: {
    VueTableLite,
    NotaFiscalForm
  },
  created() {
    this.getRows();
  },
  data() {
    return {
      editarNota: false,
      novaNota: false,
      formNotaFiscal: false,
      notaFiscalData: {} as NotaFiscalItem,
      gerenciaNotasFiscais: new GerenciaNotasFiscaisController(),
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
                         <button type="button" class="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button>
                         <button type="button" class="btn btn-danger delete-button">Deletar</button>
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
    newRow() {
      this.notaFiscalData = {} as NotaFiscalItem;
      this.formNotaFiscal = true;
    },
    async getRows() {
      const gerenciaNotasFiscais = new GerenciaNotasFiscaisController();
      const notasFiscais = await gerenciaNotasFiscais.retornaNotasFiscais().then((item: any) => {

        item.forEach((row: any) => {
          row.data = formatarData(row.data);
          this.table.rows.push(row);
        });

      });
    },
    editRow(row: NotaFiscalItem) {
      this.notaFiscalData = row;
      this.editarNota = true;
      this.formNotaFiscal = true;
    },
    deleteRow(row: NotaFiscalItem) {
      this.gerenciaNotasFiscais.deletaNotaFiscal(row);
      this.updateTable();
    },
    async updateTable() {
      this.table.rows = [];
      await nextTick();
      this.getRows();
    },
    closeModal() {
      this.formNotaFiscal = false;
      this.editarNota = false;
    },
    updateRow(row: NotaFiscalItem) {
      const res = this.gerenciaNotasFiscais.editaNotaFiscal(row);
      this.formNotaFiscal = false;
      this.updateTable();
      this.editarNota = false;
    },
    saveRow(row: NotaFiscalItem) {
      const res = this.gerenciaNotasFiscais.salvaNotaFiscal(row);
      this.closeModal();
      this.updateTable();
      this.editarNota = false;
    }
  }
});
</script>

<style lang="scss" scoped>
  .nota-fiscal-tabela {
    margin-top: 3rem;
    z-index: -999;

    .novo-btn {
      margin-left: 2rem;
      margin-bottom: 2rem;
    }
  }
</style>
