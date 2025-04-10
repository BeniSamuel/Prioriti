import { Tpriority } from "src/enum/EPRIORITY";
import { Tstatus } from "src/enum/ESTATUS";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column()
    due_date: Date;

    @Column({ enum: Tpriority, default: Tpriority.LOW })
    priority: Tpriority;

    @Column({ enum: Tstatus, default: Tstatus.TODO })
    status: Tstatus;
}