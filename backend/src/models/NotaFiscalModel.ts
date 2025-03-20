import { pool } from '../config';


export interface INotaFiscal {
  idnota: number;
  emissor: string;
  data?: string;
}

export default class NotaFiscalModel {
  static async createNota({ idnota, emissor }: INotaFiscal) {

    return await pool.query(
      `INSERT INTO notasfiscais (idnota, emissor, data) VALUES ($1, $2, NOW())`,
      [idnota, emissor]
    );
  }

  static async getNotas() {

    const result = await pool.query("SELECT * FROM notasfiscais");
    return result.rows;
  }

  static async updateNota({ idnota, emissor }: INotaFiscal) {

    const result = await pool.query(
      `UPDATE notasfiscais SET emissor=$1 WHERE idnota=$2`,
      [emissor, idnota]
    );
    return result.rowCount;
  }

  static async deleteNota(idnota: number) {
    
    const result = await pool.query(`DELETE FROM notasfiscais WHERE idnota=$1`, [idnota]);
    return result.rowCount;
  }
}
