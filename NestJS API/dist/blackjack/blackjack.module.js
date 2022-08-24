"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackjackModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blackjack_controller_1 = require("./blackjack.controller");
const blackjack_service_1 = require("./blackjack.service");
const blackjack_schema_1 = require("./schemas/blackjack.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const stats_module_1 = require("../stats/stats.module");
let BlackjackModule = class BlackjackModule {
};
BlackjackModule = __decorate([
    (0, common_1.Module)({
        imports: [stats_module_1.StatsModule, mongoose_1.MongooseModule.forFeature([{ name: 'Blackjack', schema: blackjack_schema_1.BlackjackShema }]), mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }])],
        controllers: [blackjack_controller_1.BlackjackController],
        providers: [blackjack_service_1.BlackjackService],
        exports: [blackjack_service_1.BlackjackService]
    })
], BlackjackModule);
exports.BlackjackModule = BlackjackModule;
//# sourceMappingURL=blackjack.module.js.map