import { AppDataSource } from '../config/data-source';

const EmbeddingCosine = {
    EmbeddingCosineDistance: async (questionVector: number[],columnName: string, EntityModel: any) => {
        // Obtener todos los productos con sus vectores de la base de datos
        const embeddingProductRepository = AppDataSource.getRepository(EntityModel); // configuracion de conexion de typeorm
        const allEmbeddingProducts = await embeddingProductRepository.find();

        // Calcular el producto escalar entre el vectorA y cada vector de la base de datos
        const productsWithCosineDistances = allEmbeddingProducts.map(product => {
            const vectorB = product[columnName]; // nombre de la columna en la tabla
            let sum = 0;
            for (let i = 0; i < questionVector.length; i++) {
                const a = questionVector[i];
                const b = vectorB[i];
                sum += a * b;
            }
            return { product, cosineDistance: sum };
        });

        // Ordenar los productos por distancia de coseno en orden descendente
        productsWithCosineDistances.sort((a, b) => b.cosineDistance - a.cosineDistance);

        // Obtener los 5 productos más cercanos
        const top5Products = productsWithCosineDistances.slice(0, 5).map(item => item.product);

        return top5Products;
    }
};

export default EmbeddingCosine;