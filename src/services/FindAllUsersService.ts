import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserResponse {
  id: string;
  name: string;
  isAdmin?: boolean;
  created_at: Date;
  updated_at: Date;
}

class FindAllUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UserRepositories);

    const users = await usersRepositories.find();
    return users;
  }
}

export { FindAllUsersService };
