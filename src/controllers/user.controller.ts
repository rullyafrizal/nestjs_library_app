import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiHttpResponse } from '../interfaces/response.inteface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async show(@GetUser() user: User): Promise<ApiHttpResponse> {
    return {
      status: HttpStatus.OK,
      message: 'User successfully fetched',
      body: user,
    };
  }

  @Put()
  async update(
    @GetUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ApiHttpResponse> {
    await this.userService.updateProfile(user, updateProfileDto);

    return {
      status: HttpStatus.OK,
      message: 'User profile successfully updated',
    };
  }
}
