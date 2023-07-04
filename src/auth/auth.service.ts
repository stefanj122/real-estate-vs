import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { returnMessages } from 'src/helpers/messages-maper.helper';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async register(createUserDto: RegisterDto): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('username = :username', { username: createUserDto.username })
      .orWhere('email = :email', { email: createUserDto.email })
      .getOne();

    if (user) {
      throw new BadRequestException(returnMessages.UserAlradyExists);
    }

    return await this.userRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [{ username: loginDto.username }, { email: loginDto.username }],
      select: [
        'id',
        'username',
        'password',
        'role',
        'firstName',
        'lastName',
        'email',
        'createdAt',
        'updatedAt',
        'isAgency',
        'isActive',
        'emailVerifiedAt',
      ],
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException(returnMessages.IncorrectCredentials);
    }

    const payload: JWTPayloadT = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      emailVerifiedAt: user.emailVerifiedAt,
    };
    delete user.password;

    return {
      user,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }),
    };
  }

  public async getMe(user: JWTPayloadT): Promise<User> {
    const loggedUser = await this.userRepository.findOneBy({ id: user.id });

    if (!loggedUser) {
      throw new BadRequestException(returnMessages.UserNotFound);
    }
    return loggedUser;
  }
}
