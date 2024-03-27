import { Router } from "express";
import EmbeddingsProductsController from "../controllers/Embeddings.Products.Controller";

const embeddingsRouter: Router = Router();

embeddingsRouter.post("/", EmbeddingsProductsController.PostEmbeddingsProducts) //service temporal

export default embeddingsRouter