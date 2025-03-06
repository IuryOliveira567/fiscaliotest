
interface BuscaNotasFiscais {
  obterNotasFiscais<T>(url: string, method: string, params: object, auth: string): Promise<T | null>
}

export default BuscaNotasFiscais;