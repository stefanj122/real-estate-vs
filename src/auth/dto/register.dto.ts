import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password too week! Must contain minimum 6 characters, at least one UPPERCASE letter, one lowercase letter, one number and one special character!',
    },
  )
  password: string;

  @ApiProperty()
  @IsBoolean()
  isAgency: boolean;
}
