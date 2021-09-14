import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentsController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, user_sender, message } = request.body;
    const { user_id } = request;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender: user_id,
      message,
    });

    return response.status(201).json(compliment);
  }
}

export { CreateComplimentsController };
