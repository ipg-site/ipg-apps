import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from '../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminModule {}
