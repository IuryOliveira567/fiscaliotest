import { ApiParams, NotaFiscalItem } from '.';

interface GerenciaNotasFiscais {
  criarNotaFiscal?<T> (params: ApiParams): Promise<T>,
  obterNotasFiscais?<T> (params: ApiParams): Promise<T | null>,
  editarNotaFiscal?<T> (params: ApiParams): Promise<T>,
  apagarNotaFiscal?<T> (notaFiscal: NotaFiscalItem, params: ApiParams): Promise<T | null>
}

export default GerenciaNotasFiscais;