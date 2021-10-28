import { EntityRepository, Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(user: User): Promise<void> {
    const name = user.email.split('@')[0];
    const address = 'This is default address, please change your address';
    const birthDate = new Date(null);

    const profile = this.create({ name, user, address, birthDate });
    await this.save(profile);
  }

  async updateProfile(
    user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const { name, address, birthDate } = updateProfileDto;

    const profile = await this.findOne({ where: { user } });
    profile.name = name;
    profile.address = address;
    profile.birthDate = birthDate;

    await this.save(profile);
  }
}
