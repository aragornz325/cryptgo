"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'https://cryptgo.co',
            'http://localhost:3000',
            'http://localhost:3550',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    app.use(cookieParser());
    app.use(session({
        secret: 'mitsecret',
        resave: false,
        saveUninitialized: true,
        proxy: true,
        name: 'crypgoUser',
        cookie: {
            secure: true,
            maxAge: 3600000,
            sameSite: 'none',
            httpOnly: true
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://casinoAdmin:12345@mitcasino.mkuab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        }),
    }));
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map