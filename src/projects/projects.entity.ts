import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    image:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column('text', {array:true})
    skills:string[];
}
