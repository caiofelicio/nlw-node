import { Request, Response } from "express";
import { ListReceiveComplimentsUserService } from "../services/ListReceiveComplimentsUserService";

class ListReceiveComplimentsUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listReceiveComplimentsUserService =
      new ListReceiveComplimentsUserService();

    const currentUserCompliments =
      await listReceiveComplimentsUserService.execute(user_id);

    return response.json(currentUserCompliments);
  }
}

export { ListReceiveComplimentsUserController };
