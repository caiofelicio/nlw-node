import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAutheticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAutheticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email e/ou senha incorretos!");
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error("Email e/ou senha incorretos!");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export { AuthenticateUserService };
