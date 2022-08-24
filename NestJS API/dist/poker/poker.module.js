"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerModule = void 0;
const common_1 = require("@nestjs/common");
const poker_service_1 = require("./poker.service");
const poker_controller_1 = require("./poker.controller");
const poker_gateway_1 = require("./adapters/poker.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const pokerRoom_schema_1 = require("./schemas/pokerRoom.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const stats_module_1 = require("../stats/stats.module");
let PokerModule = class PokerModule {
};
PokerModule = __decorate([
    (0, common_1.Module)({
        imports: [stats_module_1.StatsModule, mongoose_1.MongooseModule.forFeature([{ name: 'PokerRoom', schema: pokerRoom_schema_1.PokerRoomSchema }]), mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }])],
        providers: [poker_service_1.PokerService, poker_gateway_1.PokerGateway],
        controllers: [poker_controller_1.PokerController],
        exports: [poker_service_1.PokerService]
    })
], PokerModule);
exports.PokerModule = PokerModule;
//# sourceMappingURL=poker.module.js.map