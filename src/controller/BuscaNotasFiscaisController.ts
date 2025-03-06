import { BuscaNotasFiscais } from "@/model";


class BuscaNotasFiscaisController {
  private API_BASE_URL: string;
  private API_ACCESS_METHOD: string;
  
  private buscarNotasFiscais: BuscaNotasFiscais;

  constructor(buscaNotasFiscais: BuscaNotasFiscais) {
    this.API_BASE_URL = localStorage.getItem('VITE_API_BASE_URL') || 'localhost';
    this.API_ACCESS_METHOD = localStorage.getItem('VITE_API_ACCESS_METHOD') || 'GET';
    
    this.buscarNotasFiscais = buscaNotasFiscais;
  }

  retornaNotasFiscais<T>() {
    const notasFiscais = this.buscarNotasFiscais.obterNotasFiscais<T>(`${this.API_BASE_URL}/notasfiscais`, this.API_ACCESS_METHOD);
    return notasFiscais;
  }

}

export default BuscaNotasFiscaisController;