import { CreateProjectsDto } from './create-projects.dto';

export class UpdateProjectsDTO implements Partial<CreateProjectsDto> {
  image?: string;
}
