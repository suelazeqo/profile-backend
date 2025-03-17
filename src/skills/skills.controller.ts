import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateCategoryDto } from './dto/category.dto';
import { CreateSkillDto } from './dto/skill.dto';
import { CreateSubcategoryDto } from './dto/subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('categories')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.skillsService.createCategory(dto);
  }

  @Post('subcategories')
  async createSubcategory(@Body() dto: CreateSubcategoryDto) {
    return this.skillsService.createSubcategory(dto);
  }

  @Post()
  async createSkill(@Body() dto: CreateSkillDto) {
    return this.skillsService.createSkill(dto);
  }

  @Get()
  async getAllSkills(): Promise<Record<string, any>> {
    return this.skillsService.getAllSkills();
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.skillsService.updateCategory(id, dto);
  }

  @Put('subcategories/:id')
  async updateSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubcategoryDto,
  ) {
    return this.skillsService.updateSubcategory(id, dto);
  }

  @Put(':id')
  async updateSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSkillDto,
  ) {
    return this.skillsService.updateSkill(id, dto);
  }

  @Delete('/category/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.skillsService.deleteCategory(id);
  }

  @Delete('/subcategory/:id')
  async deleteSubcategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.skillsService.deleteSubcategory(id);
  }

  @Delete('/:id')
  async deleteSkill(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.skillsService.deleteSkill(id);
  }
}
