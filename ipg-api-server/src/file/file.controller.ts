import {
  BadRequestException,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Res,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { AuthSession } from 'src/types/auth.types';
import { getUploadDecorator } from 'src/decorators/FileIntercept';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly service: FileService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly historyService: HistoryService,
  ) {}

  @Get('name/:id')
  async getName(@Param('id') id: number, @Session() session: AuthSession) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const fileName = await this.service.getUniqueFileName(id);
    console.log(fileName);
    return {
      status: 'success',
      data: {
        fileName,
      },
    };
  }

  @Get('abstract/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/pdf')
  async getAbstract(
    @Param('id') id: number,
    @Res() res: Response,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(403, 'forbidden');
      res.end();
      return;
    }
    const fileStream = await this.service.getAbstract(id);
    if (fileStream === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404, 'not found');
      res.end();
      return;
    }
    const fileName =
      (await this.service.getUniqueFileName(id)) + '_abstract.pdf';
    fileStream.pipe(res);
    res.setHeader(
      'Content-Disposition',
      `filename=${encodeURIComponent(fileName)}`,
    );
  }

  @Get('movie/:id')
  @HttpCode(200)
  @Header('Content-Type', 'video/mp4')
  async getMovie(
    @Param('id') id: number,
    @Res() res: Response,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(403, 'forbidden');
      res.end();
      return;
    }
    const fileStream = await this.service.getMovie(id);
    if (fileStream === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404, 'not found');
      res.end();
      return;
    }
    const fileName = (await this.service.getUniqueFileName(id)) + '_movie.mp4';
    console.log(fileName);
    fileStream.pipe(res);
    res.setHeader(
      'Content-Disposition',
      `filename=${encodeURIComponent(fileName)}`,
    );
  }

  @Get('presentation/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/pdf')
  async getPresentation(
    @Param('id') id: number,
    @Res() res: Response,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(403, 'forbidden');
      res.end();
      return;
    }
    const fileStream = await this.service.getPresentation(id);
    if (fileStream === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404, 'not found');
      res.end();
      return;
    }
    const fileName =
      (await this.service.getUniqueFileName(id)) + '_presentation.pdf';
    console.log(fileName);
    fileStream.pipe(res);
    res.setHeader(
      'Content-Disposition',
      `filename=${encodeURIComponent(fileName)}`,
    );
  }

  @Get('consent/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/pdf')
  async getConsent(
    @Param('id') id: number,
    @Res() res: Response,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(403, 'forbidden');
      res.end();
      return;
    }
    const fileStream = await this.service.getConsent(id);
    if (fileStream === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404, 'not found');
      res.end();
      return;
    }
    const fileName =
      (await this.service.getUniqueFileName(id)) + '_consent.pdf';
    console.log(fileName);
    fileStream.pipe(res);
    res.setHeader(
      'Content-Disposition',
      `filename=${encodeURIComponent(fileName)}`,
    );
  }

  @Post('abstract')
  @UseInterceptors(getUploadDecorator('abstract'))
  async uploadAbstract(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const adminSetting = await this.adminService.getAdminConfig();
    if (!adminSetting.abstractUpload && !session.isAdmin) {
      return new BadRequestException('現在アップロードを禁止されています');
    }
    const user = await this.userService.getUser(Number(session.userId));
    if (!user || user.presentationType === '聴講') {
      if (!user.isAdmin) {
        return new BadRequestException(
          '聴講者はアップロードを許可されていません。',
        );
      }
    }

    if (user.file === null) {
      const newFileData = await this.service.createFileSet();
      await this.userService.setFile(user, newFileData);
      user.file = newFileData;
    }

    if (!file)
      throw new BadRequestException('ファイルがセットされていません。');
    const uploadPath = file.path;
    const res = await this.service
      .setAbstractPath(user.file.id, uploadPath)
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (res === null) {
      throw new BadRequestException();
    }
    await this.historyService.createUploadHistory(user, 'abstract');
    return {
      status: 'success',
      message: 'ファイルがアップロードされました。',
    };
  }

  @Post('movie')
  @UseInterceptors(getUploadDecorator('movie'))
  async uploadMovie(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const adminSetting = await this.adminService.getAdminConfig();
    if (!adminSetting.movieUpload && !session.isAdmin) {
      return new BadRequestException('現在アップロードを禁止されています');
    }
    const user = await this.userService.getUser(Number(session.userId));
    if (!user || user.presentationType === '聴講') {
      if (!user.isAdmin) {
        return new BadRequestException(
          '聴講者はアップロードを許可されていません。',
        );
      }
    }

    if (user.file === null) {
      const newFileData = await this.service.createFileSet();
      await this.userService.setFile(user, newFileData);
      user.file = newFileData;
    }
    if (!file)
      throw new BadRequestException('ファイルがセットされていません。');
    const uploadPath = file.path;
    const res = await this.service
      .setMoviePath(user.file.id, uploadPath)
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (res === null) {
      throw new BadRequestException();
    }
    await this.historyService.createUploadHistory(user, 'movie');
    return {
      status: 'success',
      message: 'ファイルがアップロードされました。',
    };
  }

  @Post('presentation')
  @UseInterceptors(getUploadDecorator('presentation'))
  async uploadPresentation(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const adminSetting = await this.adminService.getAdminConfig();
    if (!adminSetting.presentationUpload && !session.isAdmin) {
      return new BadRequestException('現在アップロードを禁止されています');
    }
    const user = await this.userService.getUser(Number(session.userId));
    if (!user || user.presentationType === '聴講') {
      if (!user.isAdmin) {
        return new BadRequestException(
          '聴講者はアップロードを許可されていません。',
        );
      }
    }

    if (user.file === null) {
      const newFileData = await this.service.createFileSet();
      await this.userService.setFile(user, newFileData);
      user.file = newFileData;
    }
    if (!file)
      throw new BadRequestException('ファイルがセットされていません。');
    const uploadPath = file.path;
    const res = await this.service
      .setPresentationPath(user.file.id, uploadPath)
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (res === null) {
      throw new BadRequestException();
    }
    await this.historyService.createUploadHistory(user, 'presentation');
    return {
      status: 'success',
      message: 'ファイルがアップロードされました。',
    };
  }

  @Post('consent')
  @UseInterceptors(getUploadDecorator('consent'))
  async uploadConsent(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Session() session: AuthSession,
  ) {
    if (!session.auth) {
      return new UnauthorizedException();
    }
    const user = await this.userService.getUser(Number(session.userId));
    if (!user || user.presentationType === '聴講') {
      if (!user.isAdmin) {
        return new BadRequestException(
          '聴講者はアップロードを許可されていません。',
        );
      }
    }

    if (user.file === null) {
      const newFileData = await this.service.createFileSet();
      await this.userService.setFile(user, newFileData);
      user.file = newFileData;
    }
    if (!file)
      throw new BadRequestException('ファイルがセットされていません。');
    const uploadPath = file.path;
    const res = await this.service
      .setConsentPath(user.file.id, uploadPath)
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (res === null) {
      throw new BadRequestException();
    }
    await this.historyService.createUploadHistory(user, 'consent');
    return {
      status: 'success',
      message: 'ファイルがアップロードされました。',
    };
  }
}
