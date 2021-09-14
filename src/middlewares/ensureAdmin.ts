import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user_id = request.user_id;
  const userRepositories = getCustomRepository(UserRepositories);
  const { isAdmin } = await userRepositories.findOne(user_id);

  if (!isAdmin) {
    return response.status(401).json({
      error: "Você precisa ser admnistrador para executar esta ação!",
    });
  }

  return next();
}
