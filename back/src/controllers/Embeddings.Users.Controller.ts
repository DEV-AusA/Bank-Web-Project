import { EmbedContentRequest, GenerateContentRequest, GenerationConfig, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { GEMINI_API_KEY } from "../config/envs";
import { UserQuestion } from "../entities/UserQuestion";
import { AppDataSource } from "../config/data-source";
import pgvector from "pgvector"
import { EmbeddingProduct } from "../entities/EmbeddingProduct";


const embeddingsUsersController = async (req: Request, res: Response) => {
    const { question } = req.body;

    console.log(question);

    // const openai = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    //     organization: 'org-A8Mbm5FJOTWemxr1BHYpdwxj'
    // });

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? '');

    // config del prompt de tipo generateContentStream 
    const GenerateRequest: GenerateContentRequest = {
        generationConfig: {
            maxOutputTokens: 200, // Cantidad máxima de tokens que se pueden generar en la respuesta. Un token tiene casi cuatro caracteres. 100 tokens corresponden a casi 60 u 80 palabras. 
            temperature: 0.9, // Rango: 0.0 (mas certero) - 1.0 (mas creativo) depende de topK y topP
            topK: 15, // Ranga: 1-40 Un valor más bajo para respuestas menos aleatorias y un valor más alto para respuestas más aleatorias.
            topP: 1.0, //Rango: 0.0 - 1.0  Los tokens se eligen del más probable (consulta Top-K) al menos probable, hasta que la suma de sus probabilidades sea igual al valor de Top-P. Por ejemplo, si los tokens A, B y C tienen una probabilidad de 0.3, 0.2 y 0.1, y el valor Top-P superior es 0.5, el modelo elegirá A o B como el siguiente token usando la temperatura y excluirá a C como candidato. 
            candidateCount: 1, // Este valor debe ser 1.  La cantidad de variaciones de respuesta que se mostrarán.
            stopSequences: ["red", "odio"], // maximo 5 elementos Especifica una lista de cadenas que le indica al modelo que deje de generar texto si se encuentra una de las cadenas en la respuesta. Si una cadena aparece varias veces en la respuesta, la respuesta trunca el lugar en que se encontró por primera vez. Las cadenas distinguen entre mayúsculas y minúsculas. 
        },
        safetySettings: [
            {
                // importo las categorias de respuestas y el filtro
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            }
        ],
        contents: [
          {
              role: 'user', // <= ELEGIR ALGUNO "function" | "user" | "model"
              parts: [
                  {
                  text: `${question}`,
                //   text: `Respondeme como si fueras uno de los Economistas del mundo lo siguiente (pero no respondas frases iniciales al principio, por ejemplo "Como uno de los mejores economistas del mundo"):${prompt}`
                  }
            ]
          }
        ]
    };

       // config del prompt de tipo generateContentStream 
    const GenerateEmbedding: EmbedContentRequest = {
        content: 
        {
            role: 'user', // <= ELEGIR ALGUNO "function" | "user" | "model"
            parts: [
                {
                text: `${question}`
                }
          ]
        }        
    }; 
    
    try {
        // gemini models

        // model embedding-001
        const modelEmbedding = genAI.getGenerativeModel({ model: "embedding-001"});
        // question to embedding
        const questionToEmbedding = await modelEmbedding.embedContent(question);
        const questionEmbedding = await questionToEmbedding.embedding.values;

        console.log(questionEmbedding);
        
        // compare with embedding DB
        const similarities = await AppDataSource.getRepository(EmbeddingProduct)
        .createQueryBuilder('embedding_products')
        .orderBy('product_embedding <-> :product_embedding')
        .setParameters({product_embedding: pgvector.toSql(questionEmbedding)})
        .limit(3)
        .getMany();

        
        // // model gemini-pro
        // const modelGeminiPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        // const result = await modelGeminiPro.generateContentStream(GenerateRequest);
        // // const result = await model.generateContent(GenerateRequest);
        // const response = await result.response;
        // const answer = await response.text();


        // console.log(question, questionEmbedding); 
        // console.log(similarities);

          

        // // Guarda el embedding en la DB
        // const embeddingRepository = AppDataSource.getRepository(UserQuestion);
        // await embeddingRepository.save({
        //     question,
        //     questionEmbedding: "",            
        //     answer,
        //     answerEmbedding: pgvector.toSql(embedding),
        // });

        // await pgClient.query('INSERT INTO faqs (question, answer, embedding) VALUES ($1, $2, $3)',
        // [prompt, answer, pgvector.toSql(embedding)]);
        
        // openAi
        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: 'system',
        //             content: 'La inteligencia artificial hablará sobre el calentamiento global.',
        //         },
        //         {
        //             role: 'user',
        //             content: prompt,
        //         },
        //     ],
        //     max_tokens: 100,
        //     temperature: 1
        // }); 
        // console.log(answer);
        
        res.status(200).json(similarities);
            
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
    embeddingsUsersController: catchAsync(embeddingsUsersController),
}

