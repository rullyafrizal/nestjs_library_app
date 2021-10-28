import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { ProfileRepository } from '../repositories/profile.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository, ProfileRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_TTL'),
        },
      }),
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
