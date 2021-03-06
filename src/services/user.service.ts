import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { ProfileRepository } from '../repositories/profile.repository';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async updateProfile(
    user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    await this.profileRepository.updateProfile(user, updateProfileDto);
  }
}
