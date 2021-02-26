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
            return res.status(400).json({
                error: 'User does not exists!'
            });
        }
        
        const survey = await surveysRepository.findOne({
            id: survey_id
        });
        if(!survey){
            return res.status(400).json({
                error: 'Survey does not exists!'
            });
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id},{value: null}],
            relations: ['user','survey']
        });

        const npsPath = resolve(__dirname, '..','views','emails','npsMail.hbs');
        const variables = {
            nome: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }
        if(surveyUserAlreadyExists){
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }
        //procedimentos
        //salvar as informações na tabela surveyUser
        const surveyUser = await surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        //Enviar e-email para o usuário
        
        await SendMailService.execute(email, survey.title, variables, npsPath);
        return res.json(surveyUser);
    }  
}  

export { SendMailController };