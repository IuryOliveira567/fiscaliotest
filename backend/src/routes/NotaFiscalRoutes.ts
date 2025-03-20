import { Router } from 'express';
import { NotaFiscalController } from '../controller';

const router = Router();

router.post('/notasfiscais', (req, res) => NotaFiscalController.createNota(req, res));
router.get('/notasfiscais', (req, res) => NotaFiscalController.getNotas(req, res));
router.put('/notasfiscais', (req, res) => NotaFiscalController.updateNota(req, res));
router.delete('/notasfiscais', (req, res) => NotaFiscalController.deleteNota(req, res));

export default router;