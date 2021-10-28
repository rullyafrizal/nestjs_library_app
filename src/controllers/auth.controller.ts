import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth/auth-credentials.dto';
import { AuthService } from '../services/auth.service';
import { ApiHttpResponse } from '../interfaces/response.inteface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<ApiHttpResponse> {
    await this.authService.signUp(authCredentials);

    return {
      status: HttpStatus.CREATED,
      message: 'User registration successful',
    };
  }

  @Post('/sign-in')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<ApiHttpResponse> {
    const token = await this.authService.signIn(authCredentials);

    return {
      status: HttpStatus.OK,
      message: 'Successfully signed in',
      body: token,
    };
  }
}
