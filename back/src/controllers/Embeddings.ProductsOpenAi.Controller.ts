import { EmbedContentRequest, GenerateContentRequest, GenerationConfig, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { GEMINI_API_KEY, OPENAI_API_KEY } from "../config/envs";
import { UserQuestion } from "../entities/UserQuestion";
import { AppDataSource } from "../config/data-source";
import pgvector from "pgvector"
import { EmbeddingProduct } from "../entities/EmbeddingProduct";
import EmbeddingCosine from "../utils/EmbeddingCosine";
import OpenAI from "openai";


const PostEmbeddingsProductsOpenAi = async (req: Request, res: Response) => {
    const { product, suggestionsUse } = req.body;

    console.log(product);    

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        organization: 'org-Lg6bBmTL7Sqt8C0ABqpKJTYT',
    });
    
    try {
        // openai model

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${product}` }],
            model: "gpt-3.5-turbo",
          });

        // const resultProductEmbedding = await openai.embeddings.create({
        //     model: "text-embedding-ada-002",
        //     input: `${product}`,
        //     encoding_format: "float",
        //   });

        
        // const embeddingRepository = AppDataSource.getRepository(EmbeddingProduct);
        // await embeddingRepository.save({
        //     product,
        //     product_embedding: productEmbedding,
        //     suggestions_use: suggestionsUse,
        //     suggestions_use_embedding: suggestionsUseEmbedding,
        // });
        
        console.log(completion);
        
        res.status(200).json(completion);
            
    } catch (error) {
        console.log(error);
        console.error("Error al insertar FAQ:", error);

        throw({
            message: `Error al obtener respuesta de la IA, ${error}`,
            code: 500,
            status: "Error Server IA"
        })
        
    }
}

export default {
    PostEmbeddingsProductsOpenAi: catchAsync(PostEmbeddingsProductsOpenAi),
}

