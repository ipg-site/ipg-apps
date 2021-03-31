import {
  BadRequestException,
  Controller,
  Get,
  Session,
  UnauthorizedException,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthSession } from 'src/types/auth.types';
import { UserService } from 'src/user/user.service';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly service: HistoryService,
    private readonly userService: UserService,
  ) {}

  @Get('meta')
  async getAllHistoryByAuthUser(
    @Query('page') page = 0,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const user = await this.userService.getUser(session.userId);
    if (!user) {
      return new BadRequestException();
    }
    const res = await this.service
      .getAllHistoryById(user.id, page)
      .catch(() => null);
    if (res === null) {
      return new InternalServerErrorException();
    }
    return {
      status: 'success',
      data: res,
    };
  }

  @Get(':id')
  async getAllHistoryById(
    @Query('page') page = 0,
    @Param('id') id: number,
    @Session() session: AuthSession,
  ) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const user = await this.userService.getUser(id);
    if (!user) {
      return new BadRequestException();
    }
    const res = await this.service
      .getAllHistoryById(user.id, page)
      .catch(() => null);
    if (res === null) {
      return new InternalServerErrorException();
    }
    return {
      status: 'success',
      data: res,
    };
  }

  @Get('')
  async getAllhistory(
    @Query('page') page = 0,
    @Session() session: AuthSession,
  ) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.getAllHistory(page).catch(() => null);
    if (res === null) {
      return new InternalServerErrorException();
    }
    return {
      status: 'success',
      data: res,
    };
  }
}
