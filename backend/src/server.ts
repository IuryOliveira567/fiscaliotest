import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notasFiscaisRoutes from './routes/NotaFiscalRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', notasFiscaisRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});