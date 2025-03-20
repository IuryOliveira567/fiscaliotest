import axios, { AxiosResponse } from 'axios';
import { GerenciaNotasFiscais, NotaFiscalItem } from '@/model';
import { ApiParams } from '@/model';


class GerenciaNotasFiscal implements GerenciaNotasFiscais {
  
  async apagarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params } = apiData;
    
    const notaFiscalData = {
      idnota:  notaFiscal.idnota,
      emissor: notaFiscal.emissor
    }

    try {
      const resposta: AxiosResponse<T> = await axios.delete(url, {
        method: method,
        params: params,
        data: notaFiscalData
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro apagar nota fiscal ", error)
      return null
    }
  }

  async obterNotasFiscais<T>(apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params } = apiData;
    
    try {
      const resposta: AxiosResponse<T> = await axios.get(url, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao obter notas fiscais ", error)
      return null
    }
  }

  async editarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params } = apiData;
    
    const notaFiscalData = {
      idnota:  notaFiscal.idnota,
      emissor: notaFiscal.emissor
    }

    try {
      const resposta: AxiosResponse<T> = await axios.put(url, notaFiscalData, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao editar notas fiscais ", error)
      return null
    }
  }

  async salvarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params  } = apiData;

    const notaFiscalData = {
      idnota:  notaFiscal.idnota,
      emissor: notaFiscal.emissor,
      data: notaFiscal.data
    }

    try {
      const resposta: AxiosResponse<T> = await axios.post(url, notaFiscalData, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao salvar notas fiscais ", error)
      return null
    }
  }

}

export default GerenciaNotasFiscal;