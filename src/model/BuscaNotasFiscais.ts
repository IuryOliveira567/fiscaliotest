import axios, { AxiosResponse } from 'axios';
import { BuscaNotasFiscaisModel } from '.'


class BuscaNotasFiscais implements BuscaNotasFiscaisModel {

  async obterNotasFiscais<T>(url: string, method: string, params?: object, auth?: string): Promise<T | null> {
    try {
      const resposta: AxiosResponse<T> = await axios.get(url, {
        method: method,
        params: params
      });

      return resposta.data;
    } catch(error) {
      console.log("Erro ao obter notas fiscais da API")
      return null
    }
  }
}

export default BuscaNotasFiscais;