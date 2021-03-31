import {
  Controller,
  Get,
  Session,
  UnauthorizedException,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthSession } from 'src/types/auth.types';

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('')
  async getAdminConfig(@Session() session: AuthSession) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const data = await this.service.getAdminConfig();
    return {
      status: 'success',
      data,
    };
  }

  @Post('abstract')
  async setAbstractUploadFlag(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.setAbstractUploadFlag();
    return {
      status: 'success',
      data: res.abstractUpload,
    };
  }

  @Post('movie')
  async setMovieUploadFlag(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.setMovieUploadFlag();
    return {
      status: 'success',
      data: res.movieUpload,
    };
  }

  @Post('presentation')
  async setPresentationUploadFlag(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.setPresentationUploadFlag();
    return {
      status: 'success',
      data: res.presentationUpload,
    };
  }

  @Post('redirect')
  async setRedirectFlag(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.setRedirectFlag();
    return {
      status: 'success',
      data: res.redirect,
    };
  }

  @Post('program-page')
  async setProgramPageVisible(@Session() session: AuthSession) {
    if (!session.auth || !session.isAdmin) {
      return new UnauthorizedException();
    }
    const res = await this.service.setProgramPageVisible();
    return {
      status: 'success',
      data: res.programPage,
    };
  }
}
