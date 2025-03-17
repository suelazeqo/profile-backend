import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
