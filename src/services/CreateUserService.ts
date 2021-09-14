import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface IUserResponse {
  id: string;
  name: string;
  isAdmin?: boolean;
  created_at: Date;
  updated_at: Date;
}

class CreateUserService {
  async execute({ name, email, isAdmin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepositories);

    if (!email) {
      throw new Error("Email inválido!");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("Já existe um usário com esse email!");
    }

    const passwordHash = await hash(password, 10);

    const newUser = usersRepository.create({
      name,
      email,
      isAdmin,
      password: passwordHash,
    });
    await usersRepository.save(newUser);

    const user: IUserResponse = {
      id: newUser.id,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    };

    return user;
  }
}

export { CreateUserService };
