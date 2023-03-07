import { Column, CreateDateColumn, Entity, EntityMetadata, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Authors";
import { EducationalProfile } from "./EducationalProfile";


@Entity({name:'publications'})
export class Publications {


    @PrimaryGeneratedColumn()
    id:number

    @ManyToMany(()=>Author)
    @JoinTable()
    author:Author[];


    @CreateDateColumn({
        type:'timestamp'
    })
    publishedat:Date;


    @Column()
    publisher:string

    @Column()
    topic:string

    @Column()
    book:string


    @ManyToOne(()=>EducationalProfile,educationalProfile=>educationalProfile.publications)
    educationalProfile:EducationalProfile
  


}