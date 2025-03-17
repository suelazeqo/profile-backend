import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ExperienceService} from "./experience.service";
import {Experience} from "./experience.entity";
import {CreateExperienceDTO} from "./dto/create-experience.dto";
import {UpdateExperienceDTO} from "./dto/update-experience.dto";
@Controller('experience')
export class ExperienceController{
    constructor(private readonly experienceService: ExperienceService) {}

    @Get(':id')
    async getExperienceById(@Param('id') id: number): Promise<Experience> {
        return this.experienceService.getExperienceById(id);
    }
    @Post()
    async createExperience(@Body() data: CreateExperienceDTO): Promise<Experience> {
        return this.experienceService.createExperience(data);
    }
    @Get()
    async getAllExperiences():Promise<Experience[]>{
        return this.experienceService.getAllExperiences()
    }

    @Put(':id')
    async updateExperience(
        @Param('id') id: number,
        @Body() updateData: UpdateExperienceDTO
    ): Promise<Experience> {
        return this.experienceService.updateExperience(id, updateData);
    }
    @Delete(':id')
    async deleteExperience(@Param('id') id:number): Promise<void>{
        return this.experienceService.deleteExperience(id)
    }

}
