import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  company: string;


  @Column('text', { array: true })
  responsibilities: string[];

  @Column('text', { array: true })
  skills: string[];
}
