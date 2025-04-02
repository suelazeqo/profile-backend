import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser(username, password);
    return { message: 'User created successfully', userId: user.id };
  }
}
