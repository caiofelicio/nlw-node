import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentRepositories = getCustomRepository(ComplimentRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Não é possível elogiar a si mesmo!");
    }

    const userNotExists = await userRepositories.findOne(user_receiver);

    if (!userNotExists) {
      throw new Error("O usuário elogiado não existe!");
    }

    const compliment = await complimentRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
