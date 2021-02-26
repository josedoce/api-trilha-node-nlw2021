import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { AppError } from './errors/AppError';
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
//configurando o app para capturar os erros usando o midleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })        
    }
    return res.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
})

export { app };