import {Router} from 'express';
const router = Router();

//controllers
import {UserController} from './controllers/UserController';
import {SurveysController} from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.post('/send_mail', sendMailController.execute);

export {router};