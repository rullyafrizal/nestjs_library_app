import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
// import { Unique } from 'typeorm';

export class AuthCredentialsDto {
  @IsEmail()
  // @Unique()
  email: string;

  @MinLength(6)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password is too weak, it must contain at least 1 uppercase, 1 lower case, 1 number or special character',
  })
  password: string;
}
