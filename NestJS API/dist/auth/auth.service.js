"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require('bcryptjs');
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (user === null) {
            return { error: "User does not exist" };
        }
        else {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return { error: "Password is not correct" };
            }
            return user;
        }
    }
    async login(user) {
        if (user.error) {
            return user;
        }
        else {
            const payload = { userId: user._id, sub: user._id.toString() };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
    }
    async getUserData(access_token) {
        if (!access_token) {
            return { error: 'User not logged in' };
        }
        else {
            const { userId } = this.jwtService.decode(access_token);
            return await this.usersService.findOne(userId);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map