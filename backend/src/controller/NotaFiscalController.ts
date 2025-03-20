import { Request, Response } from 'express';
import { pool } from '../config';
import { INotaFiscal } from '../models';


class NotaFiscalController {
  
  static async createNota(req: Request, res: Response): Promise<void> {

    try {
      const { idnota, emissor, data } = req.body as INotaFiscal;
      
      if (!emissor) {
        res.status(400).json({ error: "O emissor da nota é obrigatório" });
        return;
      }
      
      await pool.query(
        `INSERT INTO notasfiscais (idnota, emissor, data) VALUES ($1, $2, $3)`,
        [idnota, emissor, data]
      );

      res.status(201).json({
        message: "Nota fiscal adicionada com sucesso!",
        notaFiscal: { idnota, emissor }
      });

    } catch (error: any) {
      console.error("Erro ao criar nota fiscal:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getNotas(req: Request, res: Response): Promise<void> {

    try {
      const result = await pool.query("SELECT * FROM notasfiscais");
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar notas fiscais:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateNota(req: Request, res: Response): Promise<void> {

    try {
      const { idnota, emissor } = req.body;

      if (idnota == undefined || emissor == undefined) {
        res.status(400).json({ error: "ID da nota e emissor são obrigatórios" });
        return;
      }

      const result = await pool.query(
        `UPDATE notasfiscais SET emissor = $1 WHERE idnota = $2`,
        [emissor, idnota]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ error: "Nota fiscal não encontrada" });
        return;
      }

      res.status(200).json({ message: "Nota fiscal atualizada com sucesso!" });

    } catch (error: any) {
      console.error("Erro ao atualizar nota fiscal:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async deleteNota(req: Request, res: Response): Promise<void> {
    
    try {
      const { idnota } = req.body as INotaFiscal;

      if (!idnota) {
        res.status(400).json({ error: "ID da nota é obrigatório" });
        return;
      }

      const result = await pool.query(
        `DELETE FROM notasfiscais WHERE idnota = $1`,
        [idnota]
      );

      if (result.rowCount === 0) {
        res.status(404).json({ error: "Nota fiscal não encontrada" });
        return;
      }

      res.status(200).json({ message: "Nota fiscal deletada com sucesso!" });

    } catch (error: any) {
      console.error("Erro ao deletar nota fiscal:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default NotaFiscalController;
