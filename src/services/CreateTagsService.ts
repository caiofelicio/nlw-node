import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagsService {
  async execute({ name }: ITagRequest) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Nome de Tag inválido!");
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Já existe uma Tag com esse nome!");
    }

    const newTag = tagsRepository.create({ name });
    await tagsRepository.save(newTag);
    return newTag;
  }
}

export { CreateTagsService };
