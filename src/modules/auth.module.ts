import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { ProfileRepository } from '../repositories/profile.repository';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserRepository, ProfileRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:
        '916e949a2b81cb640eb1e44d7c4d9b23af7db74cf0e336a1cf5a11bb86101922',
      signOptions: {
        expiresIn: 7200,
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
