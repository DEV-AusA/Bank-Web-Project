import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"


@Entity({
    name: "users"   //* <= este  sera el nombre en la tabla de nuestra DB, se usa en plural para evitar conoflicto de nombres
})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50
    })
    name: string

    @Column({
        unique: true,
        length: 50
    })
    email: string

    @Column({
        length: 10
    })
    birthdate: string

    @Column({
        unique:true,
    })
    nDni: number

    @OneToOne(() => Credential)     // <= el decorator @OneToOne recibe un cb que retorna el Vehicle
    // a @JoinColumn al no declararle algun argumento, TypeORM x convencion agregar Id a la columna vehicle, osea "vehicleId"
    @JoinColumn()                   // <=  este decorator se utiliza junto con algun @OneToOne o @ManyToOne.
    credentialsId: Credential       // <= declaro la nueva entity y de calor le coloco la clase a referenciar

    @OneToMany (() => Appointment, (appointment => appointment.user))
    appointments: Appointment[]
}
