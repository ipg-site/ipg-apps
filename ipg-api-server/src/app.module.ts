import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoModule } from 'src/memo/memo.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MemoModule,
    UserModule,
    FileModule,
    AuthModule,
    AdminModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
