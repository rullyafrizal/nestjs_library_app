import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/jwt/jwt-payload.interface';
import { ProfileRepository } from '../repositories/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    try {
      const user = await this.userRepository.createUser(authCredentials);
      await this.profileRepository.createProfile(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists, try another one');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = authCredentials;

    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
      };
    } else {
      throw new UnauthorizedException('Credentials does not match our records');
    }
  }
}
