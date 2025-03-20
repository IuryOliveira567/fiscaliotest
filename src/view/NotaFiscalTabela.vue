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
        <ConfirmModal
          v-if="confirmModal"
          :emissor="emissor"
          @deletaResposta="handleRespose"
        />
      </div>
      <div class="pt-4">
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
import { NotaFiscalForm, ConfirmModal } from '@/components';
import { formatarData } from '../utils';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default defineComponent({
  name: 'NotaFiscalTabela',
  components: {
    VueTableLite,
    NotaFiscalForm,
    ConfirmModal
  },
  created() {
    this.getRows();
  },
  data() {
    return {
      editarNota: false,
      novaNota: false,
      confirmModal: false,
      confirmDeleta: false,
      formNotaFiscal: false,
      emissor: '',
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
                         <button type="button" class="btn btn-primary edit-button">Editar</button>
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
    this.$el.addEventListener('click', (event: MouseEvent) => {
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
      const notasFiscais = await gerenciaNotasFiscais.retornaNotasFiscais<NotaFiscalItem[]>();

      if (notasFiscais) {
        notasFiscais.forEach((row) => {
          row.data = formatarData(row.data);
          this.table.rows.push(row);
        });
      }
    },
    editRow(row: NotaFiscalItem) {
      this.notaFiscalData = row;
      this.editarNota = true;
      this.formNotaFiscal = true;
    },
    deleteRow(row: NotaFiscalItem) {
      this.notaFiscalData = row;
      this.emissor = String(this.notaFiscalData.emissor);
      this.confirmModal = true;
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

      res.then((result) => {
  
        if(result) {
          this.closeModal();
          this.updateTable();
          this.editarNota = false;

          toast.success("     Nota fiscal salva!", {
            autoClose: 1000,
            position: 'top-center',
            hideProgressBar: true,
            theme: "colored"
          });
        } else {
          toast.error("Erro ao editar nota fiscal!", {
            autoClose: 2000,
            position: 'top-center',
            hideProgressBar: true,
            theme: "colored"
          });
        }       
      });
    },
    saveRow(row: NotaFiscalItem) {
      if(!row.idnota || !row.data || !row.emissor) {
        toast.error("    Preencha todos os campos", {
          autoClose: 2000,
          position: 'top-center',
          hideProgressBar: true,
          theme: "colored"
        });

        return;
      }

      const res = this.gerenciaNotasFiscais.salvaNotaFiscal(row);
      
      res.then((result) => {

        if(result) {
          this.closeModal();
          this.updateTable();
          this.editarNota = false;

          toast.success("Nota fiscal salva!", {
            autoClose: 1000,
            position: 'top-center',
            hideProgressBar: true,
            theme: "colored"
          });
        } else {
            toast.error("ID da nota fiscal já existe!", {
            autoClose: 2000,
            position: 'top-center',
            hideProgressBar: true,
            theme: "colored"
          });
        }       
      });
    },
    handleRespose(response: boolean) {
      if(response) {
        this.gerenciaNotasFiscais.deletaNotaFiscal(this.notaFiscalData);
        this.updateTable();

        toast.success("Nota fiscal apagada!", {
          autoClose: 1000,
          position: 'top-center',
          hideProgressBar: true,
          theme: "colored"
        });
      }

      this.confirmModal = false;
    }
  }
});
</script>

<style lang="scss" scoped>
  .nota-fiscal-tabela {
    z-index: -999;

    .pad {
      padding-top: 2rem;
    }
    
    .novo-btn {
      margin-left: 2rem;
      margin-bottom: 2rem;
    }
  }
</style>
