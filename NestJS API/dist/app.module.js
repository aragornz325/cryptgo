"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users/users.controller");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const blackjack_controller_1 = require("./blackjack/blackjack.controller");
const poker_controller_1 = require("./poker/poker.controller");
const blackjack_module_1 = require("./blackjack/blackjack.module");
const auth_module_1 = require("./auth/auth.module");
const roulette_module_1 = require("./roulette/roulette.module");
const app_controller_1 = require("./app.controller");
const keys_1 = require("./config/keys");
const roulette_controller_1 = require("./roulette/roulette.controller");
const poker_offline_module_1 = require("./poker-offline/poker-offline.module");
const poker_offline_controller_1 = require("./poker-offline/poker-offline.controller");
const stats_controller_1 = require("./stats/stats.controller");
const stats_module_1 = require("./stats/stats.module");
const feedback_controller_1 = require("./feedback/feedback.controller");
const feedback_module_1 = require("./feedback/feedback.module");
const poker_module_1 = require("./poker/poker.module");
const orders_module_1 = require("./orders/orders.module");
const orders_controller_1 = require("./orders/orders.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot(keys_1.default.mongoURI),
            blackjack_module_1.BlackjackModule,
            roulette_module_1.RouletteModule,
            poker_offline_module_1.PokerOfflineModule,
            auth_module_1.AuthModule,
            stats_module_1.StatsModule,
            feedback_module_1.FeedbackModule,
            poker_module_1.PokerModule,
            orders_module_1.OrdersModule
        ],
        controllers: [
            app_controller_1.AppController,
            users_controller_1.UsersController,
            blackjack_controller_1.BlackjackController,
            poker_controller_1.PokerController,
            roulette_controller_1.RouletteController,
            poker_offline_controller_1.PokerOfflineController,
            stats_controller_1.StatsController,
            feedback_controller_1.FeedbackController,
            orders_controller_1.OrdersController
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map