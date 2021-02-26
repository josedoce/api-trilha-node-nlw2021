import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUserRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';
import {resolve} from 'path';

class SendMailController {
    async execute(req: Request, res: Response){
        const { email, survey_id } = req.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const user = await usersRepository.findOne({
            email
        });
        if(!user){
            throw new Error('User does not exists!');
        }
        
        const survey = await surveysRepository.findOne({
            id: survey_id
        });
        if(!survey){
            throw new Error('Survey does not exists!');
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null}, // or[{},{}] / and{item:valor, item:valor}
            relations: ['user','survey']
        });

        const npsPath = resolve(__dirname, '..','views','emails','npsMail.hbs');
        
        const variables = {
            nome: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists){ //se existir um surveyUser pare aqui
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }
        //senão existir surveyUser, execute o codigo abaixo.

        //procedimentos
        //salvar as informações na tabela surveyUser
        const surveyUser = await surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        //Enviar e-email para o usuário
        variables.id = surveyUser.id;

        await SendMailService.execute(email, survey.title, variables, npsPath);
        return res.json(surveyUser);
    }  
}  

export { SendMailController };