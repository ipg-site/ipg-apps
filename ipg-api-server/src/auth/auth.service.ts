import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { hashPassword } from 'src/utils/password';
import { Repository } from 'typeorm';
import { AuthDTO, AuthResult } from '../types/auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthDTO): Promise<AuthResult> {
    const res = await this.userRepository.findOne({
      where: {
        email: data.username,
      },
    });
    if (res === undefined || res === null) {
      return null;
    }
    if (hashPassword(data.password) !== res.password) {
      return null;
    }
    if (res.lastLoginAt === null) {
      return {
        auth: false,
        userId: res.id,
        changePassword: true,
        user: res,
        isAdmin: res.isAdmin,
      };
    }
    return {
      auth: true,
      userId: res.id,
      isAdmin: res.isAdmin,
    };
  }

  sign() {
    return { access_token: this.jwtService.sign({ isAdmin: true }) };
  }
}
