import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

//necessario habilitar os decorators pra que isso funcione
//"experimentalDecorators": true,
//"emitDecoratorMetadata": true, 
@Entity('users')
class User{
    @PrimaryColumn()
    readonly id: string;

    @Column() //nome da coluna no banco de dados
    name: string; //aqui pode ser qualquer nome, desde que, o nome da coluna esteja definido no @decorator("name")

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
    constructor(){
        if(!this.id){//se esse id não existir
            //entao quero q esse id tenha o valor
            this.id = uuid();
        }
    }
}

export {User};