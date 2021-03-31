import { Injectable } from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity'; // これを追加
import { Repository } from 'typeorm'; // これを追加
import { InjectRepository } from '@nestjs/typeorm'; // これを追加

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdminConfig(configName = 'default') {
    await this.adminRepository.insert({
      abstractUpload: true,
      movieUpload: true,
      name: configName,
      presentationUpload: true,
      redirect: false,
    });
    return await this.adminRepository.findOne({ name: configName });
  }

  async getAdminConfig(configName = 'default') {
    const adminData = await this.adminRepository.findOne({ name: configName });
    if (adminData === null || adminData === undefined) {
      //ないのでデフォルトセット
      return this.createAdminConfig();
    } else {
      return adminData;
    }
  }

  async setAbstractUploadFlag(
    flag: true | false | null = null,
    configName = 'default',
  ) {
    const data = await this.getAdminConfig(configName);
    if (flag === null) {
      data.abstractUpload = !data.abstractUpload;
    } else {
      data.abstractUpload = flag;
    }
    return this.adminRepository.save(data);
  }

  async setMovieUploadFlag(
    flag: true | false | null = null,
    configName = 'default',
  ) {
    const data = await this.getAdminConfig(configName);
    if (flag === null) {
      data.movieUpload = !data.movieUpload;
    } else {
      data.movieUpload = flag;
    }
    return this.adminRepository.save(data);
  }

  async setPresentationUploadFlag(
    flag: true | false | null = null,
    configName = 'default',
  ) {
    const data = await this.getAdminConfig(configName);
    if (flag === null) {
      data.presentationUpload = !data.presentationUpload;
    } else {
      data.presentationUpload = flag;
    }
    return this.adminRepository.save(data);
  }

  async setRedirectFlag(
    flag: true | false | null = null,
    configName = 'default',
  ) {
    const data = await this.getAdminConfig(configName);
    if (flag === null) {
      data.redirect = !data.redirect;
    } else {
      data.redirect = flag;
    }
    return this.adminRepository.save(data);
  }

  async setProgramPageVisible(
    flag: true | false | null = null,
    configName = 'default',
  ) {
    const data = await this.getAdminConfig(configName);
    if (flag === null) {
      data.programPage = !data.programPage;
    } else {
      data.programPage = flag;
    }
    return this.adminRepository.save(data);
  }
}
