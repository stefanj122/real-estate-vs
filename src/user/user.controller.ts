import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('app-users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
}
