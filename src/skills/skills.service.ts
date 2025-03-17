import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skills.entity';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateSubcategoryDto } from './dto/subcategory.dto';
import { CreateSkillDto } from './dto/skill.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async createSubcategory(dto: CreateSubcategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category withID ${dto.categoryId} not found `,
      );
    }
    const subcategory = this.subcategoryRepository.create({
      ...dto,
      category,
    });
    return this.subcategoryRepository.save(subcategory);
  }

  async createSkill(dto: CreateSkillDto) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: dto.subcategoryId },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${dto.subcategoryId} not found`,
      );
    }
    const skill = this.skillsRepository.create({
      ...dto,
      subcategory,
    });
    return this.skillsRepository.save(skill);
  }

  async getAllSkills() {
    return this.categoryRepository.find({
      order: { id: 'ASC' },
      relations: ['subcategories', 'subcategories.skills'],
    });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  async updateSubcategory(id: number, dto: UpdateSubcategoryDto) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${dto.categoryId} not found`,
        );
      }
      subcategory.category = category;
    }
    Object.assign(subcategory, dto);
    return this.subcategoryRepository.save(subcategory);
  }

  async updateSkill(id: number, dto: UpdateSkillDto) {
    const skill = await this.skillsRepository.findOne({ where: { id } });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    if (dto.subcategoryId) {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: dto.subcategoryId },
      });

      if (!subcategory) {
        throw new NotFoundException(
          `Subcategory with ID ${dto.subcategoryId} not found`,
        );
      }

      skill.subcategory = subcategory;
    }

    Object.assign(skill, dto);
    return this.skillsRepository.save(skill);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories', 'subcategories.skills'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }

  async deleteSubcategory(id: number): Promise<void> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['skills'],
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    await this.subcategoryRepository.remove(subcategory);
  }

  async deleteSkill(id: number): Promise<void> {
    const skill = await this.skillsRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    await this.skillsRepository.remove(skill);
  }
}
