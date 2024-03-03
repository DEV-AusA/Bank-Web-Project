import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"


@Entity({
    name: "appointments"   //* <= este  sera el nombre en la tabla de nuestra DB, se usa en plural para evitar conoflicto de nombres
})
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10
    })
    date: string

    @Column()
    time: number

    @Column('integer')
    userId: number

    @Column()
    status: boolean

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
}