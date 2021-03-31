import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.use(cors({ origin: true, credentials: true }));
  const sess: session.SessionOptions = {
    secret: 'ipa-kanto-gakusei',
    resave: false,
    saveUninitialized: false,
    cookie: {},
  };
  if (process.env.NODE_ENV === 'production') {
    console.info('PRODUCTION MODE');
    app.set('trust proxy', true); // trust first proxy
    sess.cookie.sameSite = 'none';
    sess.cookie.secure = true; // serve secure cookies
  }
  console.info(sess);
  app.use(
    session({
      ...sess,
    }),
  );
  await app.listen(3001);
}
bootstrap();
