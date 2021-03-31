import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { History } from '../entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, UserService],
  imports: [TypeOrmModule.forFeature([History, User])],
})
export class HistoryModule {}
