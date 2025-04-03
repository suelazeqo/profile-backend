import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './about.entity';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getDescription(): Promise<About> {
    return this.aboutService.getDescription();
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
