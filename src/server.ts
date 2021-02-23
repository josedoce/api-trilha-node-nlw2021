import 'reflect-metadata'; //deve ser o primeiro
import express from 'express';
import './database';
import { router } from './routes';

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

app.listen(3333, ()=>console.log("Rodando... :)"));