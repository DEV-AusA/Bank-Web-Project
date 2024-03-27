import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm";

// export const EmbeddingProduct = new EntitySchema({
//     name: 'EmbeddingProduct',
//     tableName: 'embedding_products',
//     columns: {
//         id: {
//             type: "bigint",
//             primary: true,
//             generated: true
//         },
//         product: {
//             type: "text"
//         },
//         embedding: {
//             type: "vector"
//         } 
//     },
// })

@Entity({
    name: "embedding_products"   //* <= este  sera el nombre en la tabla de nuestra DB, se usa en plural para evitar conoflicto de nombres
})
export class EmbeddingProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product: string

    @Column()
    product_embedding: string;

    @Column()
    suggestions_use: string

    @Column()
    suggestions_use_embedding: string
    
}
