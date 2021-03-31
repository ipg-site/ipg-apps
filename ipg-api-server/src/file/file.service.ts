import { Injectable } from '@nestjs/common';
import { File } from 'src/entities/files.entity'; // これを追加
import { Repository } from 'typeorm'; // これを追加
import { InjectRepository } from '@nestjs/typeorm'; // これを追加
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/entities/user.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createFileSet() {
    const file = new File();
    await this.fileRepository.insert(file);
    return file;
  }

  async getUniqueFileName(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['file'],
      where: {
        file: id,
      },
    });
    if (!user || !user.file) {
      return null;
    }
    if (user.presentationId === '' || user.presentationId === null) {
      return `${String(user.id).padStart(3, '0')}_${user.fullName}`;
    }
    return `${user.presentationId} ${user.title || ''}`;
  }

  async getAbstract(id: number) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    const fullPath = path.join(process.cwd(), file.abstractPath);
    if (!fs.existsSync(fullPath)) {
      file.abstractPath = null;
      await this.fileRepository.save(file);
      return null;
    }
    const fileStream = fs.createReadStream(fullPath);
    return fileStream;
  }

  async setAbstractPath(id: number, filePath: string) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    if (file.abstractPath !== null && file.abstractPath !== '') {
      const fullPath = path.join(process.cwd(), file.abstractPath);
      fs.unlinkSync(fullPath);
    }
    file.abstractPath = filePath;
    const res = await this.fileRepository.save(file).catch(() => null);
    return res;
  }

  async getMovie(id: number) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    const fullPath = path.join(process.cwd(), file.moviePath);
    if (!fs.existsSync(fullPath)) {
      file.moviePath = null;
      await this.fileRepository.save(file);
      return null;
    }
    const fileStream = fs.createReadStream(fullPath);
    return fileStream;
  }

  async setMoviePath(id: number, filePath: string) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    if (file.moviePath !== null && file.moviePath !== '') {
      const fullPath = path.join(process.cwd(), file.moviePath);
      fs.unlinkSync(fullPath);
    }
    file.moviePath = filePath;
    const res = await this.fileRepository.save(file).catch(() => null);
    return res;
  }

  async getPresentation(id: number) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    const fullPath = path.join(process.cwd(), file.presentationPath);
    if (!fs.existsSync(fullPath)) {
      file.presentationPath = null;
      await this.fileRepository.save(file);
      return null;
    }
    const fileStream = fs.createReadStream(fullPath);
    return fileStream;
  }

  async setPresentationPath(id: number, filePath: string) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    if (file.presentationPath !== null && file.presentationPath !== '') {
      const fullPath = path.join(process.cwd(), file.presentationPath);
      fs.unlinkSync(fullPath);
    }
    file.presentationPath = filePath;
    const res = await this.fileRepository.save(file).catch(() => null);
    return res;
  }

  async getConsent(id: number) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    const fullPath = path.join(process.cwd(), file.consentPath);
    if (!fs.existsSync(fullPath)) {
      file.consentPath = null;
      await this.fileRepository.save(file);
      return null;
    }
    const fileStream = fs.createReadStream(fullPath);
    return fileStream;
  }

  async setConsentPath(id: number, filePath: string) {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      return null;
    }
    if (file.consentPath !== null && file.consentPath !== '') {
      const fullPath = path.join(process.cwd(), file.consentPath);
      fs.unlinkSync(fullPath);
    }
    file.consentPath = filePath;
    const res = await this.fileRepository.save(file).catch(() => null);
    return res;
  }
}
