import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export default async ():Promise<Connection>=>{
    //defina uma variavel de ambiente NODE_ENV=test jest
    //é necessario definir "posttest":"rm /database" para todo fim de teste, o db.test.sqlite ser excluido
    //set antes do NODE_ENV caso seja windows
    //para pegar todas as informações referente a conexão
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        //quero sobrescrever o database preconfigurado em ormconfig.json
        Object.assign(defaultOptions,{
            database: process.env.NODE_ENV === 'test'?'./src/database/database.test.sqlite':defaultOptions.database
        })
        //essa alteração nos permitira testar um banco de dasdos
    )
}