import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { CreateUserController } from "./controllers/CreateUserController";
import { FindAllUsersController } from "./controllers/FindAllUsersController";
import { ListReceiveComplimentsUserController } from "./controllers/ListReceiveComplimentsUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagsController = new CreateTagsController();
const createComplimentsController = new CreateComplimentsController();
const findAllUsersController = new FindAllUsersController();
const listTagsController = new ListTagsController();
const listReceiveComplimentsUserController =
  new ListReceiveComplimentsUserController();

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json({ message: "Bem vindo" });
});

router.post("/login", authenticateUserController.handle);
router.post("/create/users", createUserController.handle);
router.post(
  "/create/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagsController.handle
);

router.post(
  "/send/compliments",
  ensureAuthenticated,
  createComplimentsController.handle
);

router.get("/users", findAllUsersController.handle);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listReceiveComplimentsUserController.handle
);

router.get("/tags", listTagsController.handle);

export { router };
