import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Experience} from "./experience.entity";
import {CreateExperienceDTO} from "./dto/create-experience.dto";
import {UpdateExperienceDTO} from "./dto/update-experience.dto";

@Injectable()
export class ExperienceService{
    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>
    ) {}

    async getExperienceById(id: number): Promise<Experience>{

        const experience = await this.experienceRepository.findOne({where: {id}})
        if(!experience){
            throw new NotFoundException(`Experience with id ${id} not found`)
        }
        return experience;
    }
    async createExperience(data: CreateExperienceDTO): Promise<Experience>{
        const experience = this.experienceRepository.create(data)
        return this.experienceRepository.save(experience)
    }
    async getAllExperiences(): Promise<Experience[]>{
        return this.experienceRepository.find({
            order: {
                startDate: 'DESC',
            },
        })
    }

    async updateExperience(id: number, updateData: UpdateExperienceDTO): Promise<Experience> {
        const experience = await this.experienceRepository.findOne({ where: { id } });

        if (!experience) {
            throw new NotFoundException(`Experience with id ${id} not found`);
        }

        Object.assign(experience, updateData);

        return this.experienceRepository.save(experience);
    }

    async deleteExperience(id: number): Promise<void>{
        const experience = await this.experienceRepository.findOne({where:{id}})
        if(!experience){
            throw new NotFoundException(`Experience with id ${id} not found`)
        }
        await this.experienceRepository.remove(experience)
    }
}
