import {Router} from 'express';
const router = Router();

//controllers
import {UserController} from './controllers/UserController';
import {SurveysController} from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController(); 

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.post('/send_mail', sendMailController.execute);
router.get('/answers/:value', answerController.execute);
router.get('/nps/:survey_id',npsController.execute);

export {router};