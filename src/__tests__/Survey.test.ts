import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';
//#region Anotacoes
/*
1-É necessario separar o inicializador app do servidor(listen) e das configurações, para que o teste não inicie o servidor quando estivermos testando.
2-É necessario exportar a conexão com o banco de dados para testes, porem, só no caso de comando de teste com o yarn será conectado ao banco de testes, o de produção não funcionará
*/
//#endregion
describe('Surveys',()=>{
    beforeAll(async () => {//antes de tudo execute
        //rode a migração aqui
        const connection = await createConnection();
        await connection.runMigrations();
    })
    //testando o metodo post no endpoint users
    it('Esperamos criar uma nova enquete', async()=>{
        const response = await request(app).post('/surveys')
        .send({//os parametros que essa rota aceita no body
           title: "Title Example",
           description: 'Description Example'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
    it('Espero uma lista com todos os dados.',async () => {
        await request(app).post('/surveys')
        .send({//os parametros que essa rota aceita no body
           title: "Title Example2",
           description: 'Description Example2'
        });
        const response = await request(app).get('/surveys');
        expect(response.body.length).toBe(2);
    }); 
});