interface NotaFiscalItem {
  idnota: number | undefined,
  emissor: string | undefined,
  data: string | undefined,
  actions?: string
}

export default NotaFiscalItem;