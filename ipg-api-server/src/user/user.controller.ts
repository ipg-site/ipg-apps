import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { Presentation, UserDTO } from 'src/types/user.types';
import { UserService } from './user.service';
import { generatePassword, hashPassword } from '../utils/password';
import { AuthSession } from 'src/types/auth.types';
import { FileService } from 'src/file/file.service';
import { AdminService } from 'src/admin/admin.service';
import { HistoryService } from 'src/history/history.service';
import { InsertResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly fileService: FileService,
    private readonly adminService: AdminService,
    private readonly historyService: HistoryService,
  ) {}

  @Get()
  async getUserList(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.getUserList().catch(() => null);
    return {
      status: res === null ? 'error' : 'success',
      data: res,
    };
  }

  @Get('list/:type')
  async getUserListByType(
    @Param('type') type: Presentation,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const config = await this.adminService.getAdminConfig();
    if (!config.programPage && !session.isAdmin) {
      return {
        status: 'error',
        data: [],
        message: 'ユーザー一覧の取得に失敗しました。',
      };
    }
    const res = await this.service.getUserListByType(type).catch(() => null);
    return {
      status: res === null ? 'error' : 'success',
      data: res,
    };
  }

  @Get('meta')
  async getMetaUser(@Session() session: AuthSession) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const res = await this.service
      .getUser(Number(session.userId))
      .catch(() => null);
    return {
      status: res === null ? 'error' : 'success',
      data: res,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.getUser(Number(id)).catch(() => null);
    return {
      status: res === null ? 'error' : 'success',
      data: res,
    };
  }

  @Post('reset_password/:id')
  async adminResetPassword(
    @Param('id') id: number,
    @Session() session: AuthSession,
  ) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const user = await this.service.getUser(id);
    if (!user) {
      return new BadRequestException('指定されたユーザーは存在しません。');
    }
    const newPassword = await this.service
      .resetPassword(user)
      .catch(() => null);
    if (newPassword === null) {
      return {
        status: 'error',
        message: 'パスワードの変更に失敗しました。',
      };
    }
    await this.historyService.createUserResetPasswordHistory(user);
    return {
      status: 'success',
      data: {
        password: newPassword,
      },
    };
  }

  @Post(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UserDTO,
    @Session() session: AuthSession,
  ) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const user = await this.service.getUser(id);
    if (!user) {
      return new BadRequestException('指定されたユーザーは存在しません。');
    }
    const newUserProfile = {
      ...user,
      ...userData,
    };
    const res = await this.service
      .adminUpdateUserProfile({
        ...newUserProfile,
      })
      .catch(() => null);
    if (res === null) {
      return {
        status: 'error',
        message: '更新に失敗しました。',
      };
    }
    await this.historyService.createUserProfileUpdateHistory(user);
    return {
      status: 'success',
      message: 'ユーザーデータを更新しました。',
    };
  }

  @Post('')
  async addUser(@Body() userData: UserDTO, @Session() session: AuthSession) {
    const rawPassword = userData.password || generatePassword();
    userData.password = hashPassword(rawPassword);
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }

    const sessionUser = await this.service.getUser(session.userId);
    if (!sessionUser) {
      return new BadRequestException();
    }
    const res: InsertResult = await this.service
      .addUser(userData)
      .catch(() => null);
    if (res === null) {
      return new BadRequestException();
    }
    await this.historyService.createUserCreateHistory(
      sessionUser,
      `ユーザー "${userData.fullName}" (ID: ${res.generatedMaps[0].id})`,
    );
    return {
      status: 'success',
      data: {
        id: res.generatedMaps[0].id,
        username: userData.email,
        password: rawPassword,
      },
    };
  }

  @Delete(':id')
  async adminDeleteUser(
    @Param('id') id: number,
    @Session() session: AuthSession,
  ) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const user = await this.service.getUser(id);
    const sessionUser = await this.service.getUser(session.userId);
    if (!user || !sessionUser) {
      return new BadRequestException();
    }
    const res = await this.service.deleteUser(user.id).catch(() => null);
    if (res === null) {
      return new InternalServerErrorException('ユーザー削除に失敗しました。');
    }
    await this.historyService.createUserDeleteHistory(
      sessionUser,
      `"${user.fullName}" (ID: ${user.id})`,
    );
    return {
      status: res !== null ? 'success' : 'error',
      data: res,
    };
  }
}
