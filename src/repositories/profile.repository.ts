import { EntityRepository, Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(user: User): Promise<void> {
    const name = user.email.split('@')[0];
    const address = 'This is default address, please change your address';
    const birthDate = new Date(null);

    const profile = this.create({ name, user, address, birthDate });
    await this.save(profile);
  }
}
