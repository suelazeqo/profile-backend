import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from './skills.entity';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Skill, (skill) => skill.subcategory)
  skills: Skill[];
}
