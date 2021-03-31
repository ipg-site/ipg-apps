import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { generatePassword, hashPassword } from 'src/utils/password';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const rawPassword = generatePassword();
    const password = hashPassword(rawPassword);
    await connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({
        id: 0,
      })
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: 'admin@fourier.svbl.uec.ac.jp',
          address: '東京都調布市調布ケ丘1-5-1',
          grade: 'その他',
          fullName: '電通 太郎',
          isAdmin: true,
          password,
          presentationType: '聴講',
          title: '',
          university: '電気通信大学',
          id: 0,
        },
      ])
      .execute();
    console.info(`

      GENERATE ADMIN USER!!!!
      PASSWORD: ${rawPassword}

      NOTE: THIS PASSWORD IS SHOWED AT ONCE! IF YOU FORGET THIS PASSWORD, YOU MUST SEEDS TO DATABASE AGAIN.
      
`);
  }
}
