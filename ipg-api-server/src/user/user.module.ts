import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { File } from '../entities/files.entity';
import { Admin } from '../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'src/admin/admin.service';
import { FileService } from 'src/file/file.service';
import { History } from 'src/entities/history.entity';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AdminService, FileService, HistoryService],
  imports: [TypeOrmModule.forFeature([User, File, Admin, History])],
})
export class UserModule {}
