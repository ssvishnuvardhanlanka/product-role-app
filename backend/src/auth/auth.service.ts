import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.usersService.findByUsername(dto.username);

    if (exists) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.usersService.create(dto.username, dto.password);

    return {
      message: 'Signup successful',
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = user.roles.map((role) => role.name);

    const payload = {
      sub: user.id,
      username: user.username,
      roles,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        roles,
      },
    };
  }
}