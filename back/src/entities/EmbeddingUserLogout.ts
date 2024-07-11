import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmbeddingUserLogout {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    detail: string

    // @Column({ type: 'vector'})
    @Column()
    embedding: string;
    
}
