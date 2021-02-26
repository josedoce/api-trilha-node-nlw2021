import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

//necessario habilitar os decorators pra que isso funcione
//"experimentalDecorators": true,
//"emitDecoratorMetadata": true, 
@Entity('surveys_users')
class SurveyUser{
    @PrimaryColumn()
    readonly id: string;
    //#region relacionamento com user
    @Column() //nome da coluna no banco de dados
    user_id: string; //aqui pode ser qualquer nome, desde que, o nome da coluna esteja definido no @decorator("name")

    @ManyToOne(()=>User) //muitos surveys_possuem 1 usuario
    @JoinColumn({name:"user_id"}) //una a user_id
    user: User
    //#endregion

    //#region relacionamento com survey
    @Column()
    survey_id: string;

    @ManyToOne(()=>Survey)
    @JoinColumn({name:"survey_id"})
    survey: Survey
    //#endregion
    
    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;
    constructor(){
        if(!this.id){//se esse id não existir
            //entao quero q esse id tenha o valor
            this.id = uuid();
        }
    }
}

export {SurveyUser};