import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import mongoURI from './config/keys';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NONAME } from 'dns';

const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      'https://cryptgo.co',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'mitsecret',
      resave: false,
      saveUninitialized: true,
      proxy: true,
      name: 'crypgoUser',
      cookie: {
        // secure: true,
        maxAge: 3600000,
        sameSite: 'none',
	httpOnly: true
      },
      store: MongoStore.create({
        mongoUrl:
          'mongodb+srv://casinoAdmin:12345@mitcasino.mkuab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      }),
    }),
  );
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
