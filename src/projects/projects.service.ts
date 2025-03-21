import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDTO } from './dto/update-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async createProject(data: CreateProjectsDto): Promise<Project> {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async updateProject(
    id: number,
    updateData: UpdateProjectsDTO,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not found`);
    }

    Object.assign(project, updateData);

    return this.projectRepository.save(project);
  }

  async deleteProject(id: number): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not Found`);
    }
    await this.projectRepository.remove(project);
  }
}
