import { Client } from 'pg';
import { DBLoginDados } from "@/model";


class BuscaNotasFiscais {

  obterNotasFicais() {
    const dbData = {
      user: 'postgres',
      password: '250186',
      host: 'localhost',
      port: 5432,
      database: 'fiscalIO'
    } as DBLoginDados;

    const client = new Client(dbData);

    client.connect()
      .then(() => {
        client.query('SELECT * FROM notafiscal', (err, result) => {
          if (err) {
            console.error('Error executing query', err);
          } else {
            console.log('Query result:', result.rows);
          }
        })
      })
      .catch((err: any) => {
        console.log("error : ", err)
      });
  }
}

export default BuscaNotasFiscais;