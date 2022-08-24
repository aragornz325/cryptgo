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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const { client, testClient, Client, Config } = require('coingate-v2');
const coingate = testClient('7aKKKUsEPzGLKzZkzWjBypB8NTYsdqLHYHtGxw47');
let OrdersService = class OrdersService {
    constructor(orders) {
        this.orders = orders;
    }
    async getAll() {
        try {
            const orders = await coingate.listOrders();
            const myOrders = await this.orders.find({});
            return { orders, myOrders };
        }
        catch (err) {
            return { error: err };
        }
    }
    async getRates() {
        try {
            return await coingate.listExchangeRates();
        }
        catch (err) {
            return err;
        }
    }
    async getById(id) {
        try {
            const response = await this.orders.findById(id);
            return response;
        }
        catch (err) {
            return err;
        }
    }
    async getStatus(id) {
        try {
            const response = await coingate.getOrder(id);
            return { id, status: response.status };
        }
        catch (err) {
            return err;
        }
    }
    async update(id, body) {
        try {
            const check = await this.orders.findOne({ _id: id });
            if (!check.synced || !body.synced) {
                const newOrder = await this.orders.findOneAndUpdate({ _id: id }, body, { new: true });
                return { newOrder, success: true };
            }
            else {
                return { success: false, error: 'Already synced!' };
            }
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
    async create(body) {
        const { price_amount, price_currency, receive_currency, userId, coins } = body;
        const response = await coingate.createOrder({
            price_amount, price_currency, receive_currency,
        }).catch(err => {
            return err;
        });
        console.log(response);
        const order = await this.orders.create({
            paidAmount: response.price_amount,
            paidWith: response.price_currency,
            receivedWith: 'Pending...',
            receivedAmount: 'Pending...',
            coingateOrderId: response.id,
            coins,
            userId
        }).catch(err => { return err; });
        return { success: true, msg: response, dbInfo: order };
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map