import {Router} from 'express';
const router = Router();

//controllers
import {UserController} from './controllers/UserController';
import {SurveysController} from './controllers/SurveyController';

const userController = new UserController();
const surveyController = new SurveysController();
router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

export {router};