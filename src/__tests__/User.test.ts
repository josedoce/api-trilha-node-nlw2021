import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';
//#region Anotacoes
/*
1-É necessario separar o inicializador app do servidor(listen) e das configurações, para que o teste não inicie o servidor quando estivermos testando.
2-É necessario exportar a conexão com o banco de dados para testes, porem, só no caso de comando de teste com o yarn será conectado ao banco de testes, o de produção não funcionará
*/
//#endregion
describe('Users',()=>{
    beforeAll(async () => {//antes de tudo execute
        //rode a migração aqui
        const connection = await createConnection();
        await connection.runMigrations();
    });
    afterAll(async()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });
    //testando o metodo post no endpoint users
    it('Esperamos criar um novo usuario', async()=>{
        const response = await request(app).post('/users')
        .send({//os parametros que essa rota aceita no body
            email: 'user@example.com',
            name: 'User Example'
        });
        expect(response.status).toBe(201);
        //será executado o "posttest": "del src\\database\\database.test.sqlite" apos o primeiro teste
    });
    it('Esperamos um usuario que não exista',async()=>{
        const response = await request(app).post('/users')
        .send({//os parametros que essa rota aceita no body
            email: 'user@example.com',
            name: 'User Example'
        });
        expect(response.status).toBe(400);
    });
})