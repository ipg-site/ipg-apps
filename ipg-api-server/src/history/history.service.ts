import { Injectable } from '@nestjs/common';
import { History } from 'src/entities/history.entity'; // これを追加
import { Repository } from 'typeorm'; // これを追加
import { InjectRepository } from '@nestjs/typeorm'; // これを追加
import { User } from 'src/entities/user.entity';
import { HistoryType } from 'src/types/history.types';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async createUploadHistory(
    user: User,
    fileType: 'abstract' | 'presentation' | 'movie' | 'consent',
    uploadTimestamp: Date = new Date(),
  ) {
    const type: HistoryType = 'fileUpload';
    return this.historyRepository.insert({
      user,
      type: type,
      value: `${fileType}@${uploadTimestamp.toISOString()}`,
    });
  }

  async createLoginHistory(user: User, loginTimestamp: Date = new Date()) {
    const type: HistoryType = 'userLogin';
    return this.historyRepository.insert({
      user,
      type: type,
      value: loginTimestamp.toISOString(),
    });
  }

  async createUserCreateHistory(user: User, createDetail: string) {
    const type: HistoryType = 'userCreate';
    return this.historyRepository.insert({
      user,
      type: type,
      value: createDetail,
    });
  }
  async createUserProfileUpdateHistory(
    user: User,
    updateTimestamp: Date = new Date(),
  ) {
    const type: HistoryType = 'userEdit';
    return this.historyRepository.insert({
      user,
      type: type,
      value: updateTimestamp.toISOString(),
    });
  }

  async createUserDeleteHistory(user: User, deleteDetail: string) {
    const type: HistoryType = 'userDelete';
    return this.historyRepository.insert({
      user,
      type: type,
      value: deleteDetail,
    });
  }

  async createUserChangePasswordHistory(
    user: User,
    changeTimestamp: Date = new Date(),
  ) {
    const type: HistoryType = 'userChangePassword';
    return this.historyRepository.insert({
      user,
      type: type,
      value: changeTimestamp.toISOString(),
    });
  }

  async createUserResetPasswordHistory(
    user: User,
    resetTimestamp: Date = new Date(),
  ) {
    const type: HistoryType = 'userResetPassword';
    return this.historyRepository.insert({
      user,
      type: type,
      value: resetTimestamp.toISOString(),
    });
  }

  async getAllHistory(page = 0, count = 100) {
    return this.historyRepository.find({
      skip: page * count,
      take: count,
      relations: ['user', 'user.file'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getAllHistoryById(id: number, page = 0, count = 100) {
    return this.historyRepository.find({
      where: {
        user: {
          id,
        },
      },
      skip: page * count,
      take: count,
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
