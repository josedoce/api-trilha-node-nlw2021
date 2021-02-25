import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity('surveys')
class Survey {
    @PrimaryColumn()
    readonly id: string;

    @Column() //nome da coluna no banco de dados
    title: string; //aqui pode ser qualquer nome, desde que, o nome da coluna esteja definido no @decorator("name")

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
    constructor(){
        if(!this.id){//se esse id não existir
            //entao quero q esse id tenha o valor
            this.id = uuid();
        }
    }
}

export { Survey }