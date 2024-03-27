import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "embeddings_users"   //* <= este  sera el nombre en la tabla de nuestra DB, se usa en plural para evitar conoflicto de nombres
})
export class UserQuestion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column({ type: 'vector'})
    questionEmbedding: string

    @Column()
    answer: string

    @Column({ type: 'vector'})
    answerEmbedding: string;
    
}
