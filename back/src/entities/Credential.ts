import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity({
    name: "credentials"   //* <= este  sera el nombre en la tabla de nuestra DB, se usa en plural para evitar conoflicto de nombres
})
export class Credential {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    username: string

    @Column()
    password: string
}