import axios, { AxiosResponse } from 'axios';
import { GerenciaNotasFiscais, NotaFiscalItem } from '@/model';
import { ApiParams } from '@/model';


class GerenciaNotasFiscal implements GerenciaNotasFiscais {
  
  async apagarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params, auth } = apiData;
    
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
      console.log("Erro ao obter notas fiscais da API : ", error)
      return null
    }
  }

  async obterNotasFiscais<T>(apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params, auth } = apiData;
    
    try {
      const resposta: AxiosResponse<T> = await axios.get(url, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao obter notas fiscais da API : ", error)
      return null
    }
  }

  async editarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params, auth } = apiData;
    
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
      console.log("Erro ao obter notas fiscais da API : ", error)
      return null
    }
  }

  async salvarNotaFiscal<T>(notaFiscal: NotaFiscalItem, apiData: ApiParams): Promise<T | null> {
    
    const { url, method, params, auth } = apiData;

    const notaFiscalData = {
      idnota:  notaFiscal.idnota,
      emissor: notaFiscal.emissor
    }

    try {
      const resposta: AxiosResponse<T> = await axios.post(url, notaFiscalData, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao obter notas fiscais da API : ", error)
      return null
    }
  }

}

export default GerenciaNotasFiscal;