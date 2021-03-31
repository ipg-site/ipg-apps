import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import { HistoryService } from 'src/history/history.service';
import { AuthDTO, AuthSession } from 'src/types/auth.types';
import { UserService } from 'src/user/user.service';
import { hashPassword } from 'src/utils/password';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly historyService: HistoryService,
  ) {}

  @Post('login')
  async login(@Body() data: AuthDTO, @Session() session: AuthSession) {
    const authResult = await this.authService.login(data);
    if (authResult === null) {
      return new BadRequestException();
    }
    if (authResult.changePassword === true) {
      if (data.newPassword === undefined) {
        return {
          status: 'CHANGE_PASSWORD_REQUEST',
          message: '新しいパスワードを入力してください。',
        };
      }
      const res = await this.userService.changePassword(
        authResult.user,
        hashPassword(data.newPassword),
      );
      if (res === null) {
        return {
          status: 'CHANGE_PASSWORD_REQUEST',
          message: '新しいパスワードを入力してください。',
        };
      }
      await this.historyService.createUserChangePasswordHistory(
        authResult.user,
      );
      authResult.auth = true;
    }
    if (session.auth && session.userId === authResult.userId) {
      //すでにログインしている。
      session.auth = authResult.auth;
      session.userId = authResult.userId;
      session.isAdmin = authResult.isAdmin;
      return {
        status: 'success',
        message: 'すでにログインしています。',
      };
    }
    session.auth = authResult.auth;
    session.userId = authResult.userId;
    session.isAdmin = authResult.isAdmin;
    const user = await this.userService.getUser(authResult.userId);
    await this.historyService.createLoginHistory(user);
    return {
      status: 'success',
      message: 'ログインに成功しました。',
    };
  }

  @Get('logout')
  logout(@Session() session: AuthSession) {
    session.auth = false;
    session.userId = -1;
    session.isAdmin = false;
  }

  @Get('check')
  async check(@Session() session: AuthSession) {
    const user = await this.userService.getUser(session.userId);
    if (!user) {
      return {
        status: 'NG',
        isAdmin: false,
      };
    }
    return {
      status: session.auth ? 'OK' : 'NG',
      isAdmin: session.isAdmin,
    };
  }
}
