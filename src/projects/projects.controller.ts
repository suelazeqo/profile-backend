import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDTO } from './dto/update-projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() data: CreateProjectsDto): Promise<Project> {
    return this.projectsService.createProject(data);
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateData: UpdateProjectsDTO,
  ): Promise<Project> {
    return this.projectsService.updateProject(id, updateData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    return this.projectsService.deleteProject(id);
  }
}
