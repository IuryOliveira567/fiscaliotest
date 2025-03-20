import { GerenciaNotasFiscal } from '@/services';
import { ApiParams, NotaFiscalItem } from '@/model';


class GerenciaNotasFiscaisController {
  private API_URL: string | null;
  private gerenciaNotasFiscais: GerenciaNotasFiscal;

  constructor() {
    this.gerenciaNotasFiscais = new GerenciaNotasFiscal();
    this.API_URL = localStorage.getItem("REMOTE_API_URL");
  }

  retornaNotasFiscais<T>(): Promise<T | null> {
    const apiRequestData = {
      url: this.API_URL
    } as ApiParams;

    return this.gerenciaNotasFiscais.obterNotasFiscais<T>(apiRequestData);
  }

  deletaNotaFiscal(notaFiscal: NotaFiscalItem) {
    const apiRequestData = {
      url: this.API_URL
    } as ApiParams;

    const result = this.gerenciaNotasFiscais.apagarNotaFiscal(notaFiscal, apiRequestData);
    return result;
  }
  
  editaNotaFiscal(notaFiscal: NotaFiscalItem) {
    const apiRequestData = {
      url: this.API_URL
    } as ApiParams;

    const result = this.gerenciaNotasFiscais.editarNotaFiscal(notaFiscal, apiRequestData);
    return result;
  }

  
  salvaNotaFiscal(notaFiscal: NotaFiscalItem) {
    const apiRequestData = {
      url: this.API_URL
    } as ApiParams;

    const result = this.gerenciaNotasFiscais.salvarNotaFiscal(notaFiscal, apiRequestData);
    return result;
  }

}

export default GerenciaNotasFiscaisController;