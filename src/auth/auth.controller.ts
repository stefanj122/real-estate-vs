import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: RegisterDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@GetUser() user: JWTPayloadT): Promise<User> {
    return await this.authService.getMe(user);
  }
}
