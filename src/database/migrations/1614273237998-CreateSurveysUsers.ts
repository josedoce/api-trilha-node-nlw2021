import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614273237998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'user_id',
                        type: 'uuid'
                    },
                    {
                        name: 'survey_id',
                        type: 'uuid'
                    },
                    {
                        name:'value',
                        type:'number',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [ //chaves estrangeiras e referencia
                    {
                        name: 'FKUser', //crie essa tabela
                        referencedTableName: 'users', //referenciando a tabela
                        referencedColumnNames: ['id'], //referenciando a coluna
                        columnNames: ['user_id'], //atribuindo a esta coluna
                        onDelete: 'CASCADE',    
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKSurvey', //crie essa tabela
                        referencedTableName: 'surveys', //referenciando a tabela
                        referencedColumnNames: ['id'], //referenciando a coluna
                        columnNames: ['survey_id'], //atribuindo a esta coluna
                        onDelete: 'CASCADE',    
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users');
    }

}
