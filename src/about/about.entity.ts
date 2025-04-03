import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;
}
