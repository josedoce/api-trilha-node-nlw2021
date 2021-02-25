import express from 'express';
import createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();
/**
 * metodos
 * get=>busca
 * post=>salvar
 * put=>alterar
 * delete=>deletar
 * patch=>alteração especifica
 */
app.use(express.json());
app.use(router);

export { app };