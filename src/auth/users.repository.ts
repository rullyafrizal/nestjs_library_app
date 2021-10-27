import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentials;

    const user = this.create({ email, password });
    await this.save(user);
  }
}
