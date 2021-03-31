import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { File } from '../entities/files.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET_KEY } from 'src/secrets';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';
import { History } from 'src/entities/history.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    HistoryService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([User, File, History]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '600s' },
    }),
  ],
})
export class AuthModule {}
