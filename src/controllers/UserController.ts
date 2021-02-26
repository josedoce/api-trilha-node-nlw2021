import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';

class UserController {
    async create(request:Request, response:Response){
        const {name, email} = request.body;

        //validação
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio!"),
            email: yup.string().email().required("Email é invalido!")
        });
        
        try {
            await schema.validate(request.body,{abortEarly: false});
        } catch (error) {
            throw new Error(error);
        }

        //para pegar os metodos da entidade user
        const usersRepository = getCustomRepository(UsersRepository);
        
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if(userAlreadyExists){
            throw new Error('User already exists!');
        }
        const user = usersRepository.create({
            name, email
        });
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export {UserController};