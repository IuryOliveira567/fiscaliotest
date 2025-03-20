import { ILoginDTO } from '../dtos';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const loginDTO = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
} as ILoginDTO;

const pool = new Pool(loginDTO);

pool.connect()
    .then(() => console.log("Conexão com o banco de dados estabelecida"))
    .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));
    
export default pool;