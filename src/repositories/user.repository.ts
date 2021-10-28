import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentials;

    const user = this.create({ email, password });
    await this.save(user);

    return user;
  }
}
