import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { UserRepository } from '../repositories/user.repository';
import { ProfileRepository } from '../repositories/profile.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserRepository, ProfileRepository]),
    AuthModule,
  ],
})
export class UserModule {}
