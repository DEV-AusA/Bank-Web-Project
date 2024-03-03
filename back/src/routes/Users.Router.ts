import { Router } from "express";
import UsersController from "../controllers/Users.Controller";
import auth from "../middlewares/auth";

// declaro router como tipo interface gracias al modulo npm i -D @types/express
const usersRouter: Router = Router();

// agrego el middleware auth.ts para que solicite credentials para acceder al controller
usersRouter.get("/", auth.auth , UsersController.getUsers);
// capturará cualquier valor ingresado en /users/:id como el id de un user a buscar
usersRouter.get("/:id", UsersController.getUserById);

usersRouter.post("/register", UsersController.createUser);
usersRouter.post("/login", UsersController.loginUser);

usersRouter.put("/");

usersRouter.delete("/", UsersController.deleteUser);

export default usersRouter;