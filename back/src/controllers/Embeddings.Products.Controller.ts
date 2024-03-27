import { EmbedContentRequest, GenerateContentRequest, GenerationConfig, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { GEMINI_API_KEY } from "../config/envs";
import { AppDataSource } from "../config/data-source";
import { EmbeddingProduct } from "../entities/EmbeddingProduct";
import pgvector from "pgvector";


const PostEmbeddingsProducts = async (req: Request, res: Response) => {

    const { product, suggestionsUse } = req.body;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? '');

    // // config del prompt del embedding
    // const GenerateEmbedding: EmbedContentRequest = {
    //     content: 
    //     {
    //         role: 'user', // <= ELEGIR ALGUNO "function" | "user" | "model"
    //         parts: [
    //             {
    //             text: `${product}`
    //             }
    //       ]
    //     }        
    // }; 
    
    try {

        // model embedding-001
        const modelEmbedding = genAI.getGenerativeModel({ model: "embedding-001"});
        // product embedding
        const resultProductEmbedding = await modelEmbedding.embedContent(product);
        const productEmbedding = await resultProductEmbedding.embedding.values;

        // product embedding
        const resultSuggestionsUseEmbedding = await modelEmbedding.embedContent(suggestionsUse);
        const suggestionsUseEmbedding = await resultSuggestionsUseEmbedding.embedding.values;

        // Guarda los embeddings en la DB
        const embeddingRepository = AppDataSource.getRepository(EmbeddingProduct);
        await embeddingRepository.save({
            product,
            product_embedding: pgvector.toSql(productEmbedding),
            suggestions_use: suggestionsUse,
            suggestions_use_embedding: pgvector.toSql(suggestionsUseEmbedding),
        });
        
        res.status(200).json({
            message: "Embeddings creados con exito"
        });
            
    } catch (error) {
        throw({
            message: `Error al crear los Embeddings, ${error}`,
            code: 500,
            status: "Error Server IA"
        })
        
    }
}

export default {
    PostEmbeddingsProducts: catchAsync(PostEmbeddingsProducts),
}

