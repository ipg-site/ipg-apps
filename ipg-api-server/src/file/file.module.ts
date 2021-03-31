import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { User } from '../entities/user.entity';
import { File } from '../entities/files.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Admin } from 'src/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { HistoryService } from 'src/history/history.service';
import { History } from 'src/entities/history.entity';

@Module({
  controllers: [FileController],
  providers: [FileService, UserService, AdminService, HistoryService],
  imports: [TypeOrmModule.forFeature([User, File, Admin, History])],
})
export class FileModule {}
