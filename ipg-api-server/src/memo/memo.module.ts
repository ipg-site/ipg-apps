import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo } from 'src/entities/memo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [TypeOrmModule.forFeature([Memo])],
})
export class MemoModule {}
