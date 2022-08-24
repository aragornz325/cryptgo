"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerOfflineModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const stats_module_1 = require("../stats/stats.module");
const user_schema_1 = require("../users/schemas/user.schema");
const poker_offline_controller_1 = require("./poker-offline.controller");
const poker_offline_service_1 = require("./poker-offline.service");
const poker_offline_schema_1 = require("./schemas/poker_offline.schema");
let PokerOfflineModule = class PokerOfflineModule {
};
PokerOfflineModule = __decorate([
    (0, common_1.Module)({
        imports: [stats_module_1.StatsModule, mongoose_1.MongooseModule.forFeature([{ name: 'PokerOffline', schema: poker_offline_schema_1.PokerOfflineSchema }]), mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }])],
        controllers: [poker_offline_controller_1.PokerOfflineController],
        providers: [poker_offline_service_1.PokerOfflineService],
        exports: [poker_offline_service_1.PokerOfflineService]
    })
], PokerOfflineModule);
exports.PokerOfflineModule = PokerOfflineModule;
//# sourceMappingURL=poker-offline.module.js.map