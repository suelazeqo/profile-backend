import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './about.entity';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getDescription(): Promise<About | { message: string }> {
    const about = await this.aboutService.getDescription();
    if (!about?.description) {
      return { message: 'No description found.' };
    }
    return about;
  }

  @Post()
  createOrUpdateDescription(@Body() about: About): Promise<About> {
    return this.aboutService.createOrUpdateDescription(about);
  }

  @Put(':id')
  updateDescription(
    @Param('id') id: number,
    @Body() about: About,
  ): Promise<About> {
    return this.aboutService.updateDescription(id, about);
  }
}
