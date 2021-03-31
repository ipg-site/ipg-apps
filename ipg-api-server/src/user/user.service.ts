import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity'; // これを追加
import { File } from 'src/entities/files.entity';
import { FindConditions, Not, ObjectLiteral, Repository } from 'typeorm'; // これを追加
import { InjectRepository } from '@nestjs/typeorm'; // これを追加
import { Presentation, UserDTO } from '../types/user.types';
import { convertToTimeZone } from 'date-fns-timezone';
import { generatePassword, hashPassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addUser(userData: UserDTO) {
    const user = new User();
    user.fullName = userData.fullName;
    user.email = userData.email;
    user.password = userData.password;
    user.university = userData.university;
    user.grade = userData.grade;
    user.presentationType = userData.presentationType;
    user.address = userData.address;
    user.title = userData.title;
    user.isAdmin = userData.isAdmin;
    user.presentationId = userData.presentationId;
    return this.userRepository.insert(user);
  }

  async getUserList() {
    const users = await this.userRepository.find({
      relations: ['file'],
    });
    return users.map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  async getUserListByType(type: Presentation) {
    const whereQuery:
      | string
      | ObjectLiteral
      | FindConditions<User>
      | FindConditions<User>[] =
      String(type) === 'null'
        ? {
            presentationType: Not('聴講'),
          }
        : {
            presentationType: type,
          };
    const users = await this.userRepository.find({
      relations: ['file'],
      where: whereQuery,
      order: {
        presentationId: 'ASC',
        id: 'ASC',
      },
    });
    return users.map((user) => ({
      fullName: user.fullName,
      presentationId: user.presentationId,
      title: user.title,
      university: user.university,
      fileId: user?.file?.id || null,
    }));
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['file'],
      order: {
        presentationId: 'ASC',
        id: 'ASC',
      },
    });
    return {
      ...user,
      password: undefined,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['file'],
    });
    if (user) {
      return user;
    }
    return null;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['file'],
    });
    if (user.isAdmin) {
      return null;
    }
    return this.userRepository.remove(user);
  }

  async adminUpdateUserProfile(user: User) {
    return this.userRepository.save(user);
  }

  async changePassword(user: User, newPassword: string) {
    if (user.password === newPassword) {
      return null;
    }
    user.password = newPassword;
    const now = convertToTimeZone(new Date(), {
      timeZone: 'Asia/Tokyo',
    });
    user.lastLoginAt = now.toISOString();
    return this.userRepository.save(user);
  }

  async resetPassword(user: User) {
    user.lastLoginAt = null;
    const newPassword = generatePassword();
    user.password = hashPassword(newPassword);
    await this.userRepository.save(user);
    return newPassword;
  }

  async setFile(user: User, file: File) {
    user.file = file;
    return this.userRepository.save(user);
  }
}
