import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

class ListReceiveComplimentsUserService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentRepositories);

    const currentUserCompliments = await complimentsRepositories.find({
      user_receiver: user_id,
    });

    return currentUserCompliments;
  }
}

export { ListReceiveComplimentsUserService };
