import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.skills, {
    onDelete: 'CASCADE',
  })
  subcategory: Subcategory;
}
