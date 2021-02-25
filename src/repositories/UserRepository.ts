import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User>{ //herdei todos os metodos de repository com base na entidade <User>

}
export { UsersRepository };