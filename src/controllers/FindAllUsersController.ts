import { Request, Response } from "express";
import { FindAllUsersService } from "../services/FindAllUsersService";

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const findAllUsersService = new FindAllUsersService();

    const users = await findAllUsersService.execute();

    return response.status(200).json({ users });
  }
}

export { FindAllUsersController };
