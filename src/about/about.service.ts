import { InjectRepository } from '@nestjs/typeorm';
import { About } from './about.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async getDescription(): Promise<About> {
    const about = await this.aboutRepository.findOne({
      where: { id: 1 },
    });

    return about || new About();
  }


  async createOrUpdateDescription(description: About): Promise<About> {
    const existingAbout = await this.aboutRepository.findOne({
      where: { id: 1 },
    });

    if (existingAbout) {
      existingAbout.description = description.description;
      return this.aboutRepository.save(existingAbout);
    } else {
      const newAbout = this.aboutRepository.create({
        description: description.description,
      });
      return this.aboutRepository.save(newAbout);
    }
  }

  async updateDescription(id: number, description: About): Promise<About> {
    const existingAbout = await this.aboutRepository.findOne({
      where: { id },
    });

    if (existingAbout) {
      existingAbout.description = description.description;
      return this.aboutRepository.save(existingAbout);
    }

    const newAbout = this.aboutRepository.create({
      id,
      description: description.description,
    });
    return this.aboutRepository.save(newAbout);
  }

}
