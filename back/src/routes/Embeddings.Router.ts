import { Router } from "express";
import EmbeddingsProductsController from "../controllers/Embeddings.Products.Controller";
import EmbeddingsProductsOpenAiController from "../controllers/Embeddings.ProductsOpenAi.Controller";

const embeddingsRouter: Router = Router();

// embeddingsRouter.post("/", EmbeddingsProductsController.PostEmbeddingsProducts) //service temporal GEMINI
embeddingsRouter.post("/", EmbeddingsProductsOpenAiController.PostEmbeddingsProductsOpenAi) //service temporal GEMINI


export default embeddingsRouter