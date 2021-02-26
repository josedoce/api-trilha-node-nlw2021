import {Response, Request} from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUserRepository';


class NpsController{
    /**
     * calculo do nps
     * 1 2 3 4 5 6 7 8 9 10
     * Detratores => 0 - 6
     * Passivos => 7 - 8 (no calcalculo do nps esse não vale)
     * Promotores => 9 - 10
     * 
     * (numero de promotores - número de detratores)/(número de respondentes)*100
     */
    async execute(req: Request, res: Response){
        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);
        const { survey_id } = req.params;
        
        const surveyUsers = await surveyUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = surveyUsers.filter((survey)=> 
            survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveyUsers.filter((survey)=>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const passives = surveyUsers.filter((survey)=>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;

        const calculate = Number((((promoters - detractor)/totalAnswers)*100).toFixed(2));
        
        return res.json({
            detractor,
            promoters,
            passives,
            totalAnswers,
            nps: calculate
        });
    }
}

export {NpsController};