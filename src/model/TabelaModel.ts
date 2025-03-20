import NotaFiscalItem from "./NotaFiscalItem"

interface TableColumn {
  label: string,
  field: string,
  width: string,
  sortable: boolean,
  isKey: boolean,
  display?: any,
}

type SortableType = "asc" | "desc";

interface SortableConfig {
  order: string,
  sort: SortableType
}

interface TabelaModelData {
  isLoading: boolean,
  columns: TableColumn[],
  rows: NotaFiscalItem[],
  totalRecordCount: number,
  sortable: SortableConfig
}

export default TabelaModelData;