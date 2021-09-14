import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  const { sub } = verify(token, process.env.SECRET) as IPayload;

  if (!sub) {
    return response.status(403).json({ error: "token expirado" });
  }

  request.user_id = sub;
  return next();
}
