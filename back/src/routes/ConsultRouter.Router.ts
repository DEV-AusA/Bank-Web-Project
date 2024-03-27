import { Router } from "express";
import EmbeddingsUsersController from "../controllers/Embeddings.Users.Controller";

const consultRouter: Router = Router();

consultRouter.post("/", EmbeddingsUsersController.embeddingsUsersController) //service temporal

export default consultRouter