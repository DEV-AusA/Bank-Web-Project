import { EmbedContentRequest, GenerateContentRequest, GenerationConfig, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { GEMINI_API_KEY } from "../config/envs";
import { UserQuestion } from "../entities/UserQuestion";
import { AppDataSource } from "../config/data-source";
import pgvector from "pgvector"
import { EmbeddingProduct } from "../entities/EmbeddingProduct";
import EmbeddingCosine from "../utils/EmbeddingCosine";


const embeddingsUsersController = async (req: Request, res: Response) => {
    const { question } = req.body;

    // const openai = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    //     organization: 'org-A8Mbm5FJOTWemxr1BHYpdwxj'
    // });

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? '');

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
        
        // buscando matchs de embeddings en DB
        const embeddingsMatch = await EmbeddingCosine.EmbeddingCosineDistance(questionEmbedding, "product_embedding", EmbeddingProduct );
        let embeddingMatchToText = "";

        // Recorremos el array de objetos
        for await (let product of embeddingsMatch) {
            // Accedemos a las propiedades 'product' y 'suggestions_use' de cada objeto y las agregamos al array 'valores'
            embeddingMatchToText += product.product + " " + product.suggestions_use + " ";
        };

        // const requestToIA = `Eres un vendedor de productos experimentado, experto en interpretar y responder preguntas basadas en las fuentes proporcionadas. Utilizando el contexto proporcionado entre las etiquetas <context></context>, genera una respuesta concisa para una pregunta rodeada con las etiquetas <question></question>. Debes usar unicamente informacion del contexto. No repitas texto. Si no hay nada relevante en el contexto para la pregunta en cuestion, simplemente di "No tengo en estock ese producto". No intentes inventar  una respuesta. Cualquier cosa entre los siguientes bloques html context se recupera de un banco de conocimientos, no es parte de la conversacion con el usuario: <context>${embeddingMatchToText}</context> <question>${question}</question>`;

        const requestToIA = `Eres un vendedor de productos experimentado, experto en interpretar y responder preguntas basadas en las fuentes que te voy a proporcionar. Utilizando el contexto que te voy a proporcionar entre las etiquetas <context></context>, genera una respuesta concisa para una pregunta rodeada con las etiquetas <question></question>. Debes usar unicamente informacion del contexto. No repitas texto. Si no hay nada relevante en el contexto simplemente di "No tengo en estock ese producto". <context>${embeddingMatchToText}</context> <question>${question}</question>`;

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
        
        // model gemini-pro
        const modelGeminiPro = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = modelGeminiPro.startChat({
            history: [
              {
                role: "user",
                parts: [{ text: "Eres un vendedor de productos experimentado, experto en interpretar y responder preguntas basadas en las fuentes que te voy a proporcionar" }],
              },
              {
                role: "model",
                parts: [{ text: "¡Sí, exactamente! Soy un vendedor de productos experimentado y estoy listo para ayudarte. Con gusto interpretaré y responderé a tus preguntas de forma precisa y completa, basándome en la información que me proporciones." }],
              },
              {
                role: "user",
                parts: [{ text: 'Utilizando el contexto que te voy a proporcionar entre las etiquetas <context></context>, genera una respuesta concisa para una pregunta rodeada con las etiquetas <question></question>. Debes usar unicamente informacion del contexto. No repitas texto. Si no hay nada relevante en el contexto simplemente di "No tengo en estock ese producto"' }],
              },
              {
                role: "model",
                parts: [{ text: "¡Entendido! Con gusto interpretaré la pregunta y generaré una respuesta concisa utilizando únicamente la información proporcionada en el contexto. Para comenzar, por favor, introduce la pregunta entre las etiquetas <question> y el contexto entre las etiquetas <context>." }],
              },
              {
                role: "user",
                parts: [{ text: `el contexto es el siguiente <context>${embeddingMatchToText}</context>` }],
              },
              {
                role: "model",
                parts: [{ text: "¡Entendido! ya tengo el contexto , por favor, introduce la pregunta entre las etiquetas <question> para poder responderte" }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 200,
            },
        });
          
        const msg = `<question>${question}</question>`;
        const result = await chat.sendMessage(msg);
          
        // const result = await modelGeminiPro.generateContent(requestToIA);
        // const result = await modelGeminiPro.generateContent("Cuantaos caracteres o cuantos tokes aceptas por cada consulta");
        const response = await result.response;
        const questionResult = await response.text();        

        // EMBEDDINGS OFF
        // // compare with embedding DB
        // const similarities = await AppDataSource.getRepository(EmbeddingProduct)
        // .createQueryBuilder('embedding_products')
        // .orderBy('product_embedding <-> :product_embedding')
        // .setParameters({product_embedding: pgvector.toSql(questionEmbedding)})
        // .limit(3)
        // .getMany();

        


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
        console.log(embeddingMatchToText);        

        console.log(questionResult);
        
        res.status(200).json(questionResult);
            
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

