import { Roles } from "src/enum/EROLE";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column()
    password: string;

    @Column({type: String, enum: Roles, default: Roles.DEFAULT})
    roles: Roles;

    @Column({nullable: true})
    created_at: Date;
}