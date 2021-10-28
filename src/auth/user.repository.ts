import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentials;

    const user = this.create({ email, password });
    await this.save(user);
  }
}
