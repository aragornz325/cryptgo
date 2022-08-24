import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
export declare class OrdersService {
    private readonly orders;
    constructor(orders: Model<Order>);
    getAll(): Promise<any>;
    getRates(): Promise<any>;
    getById(id: any): Promise<Order>;
    getStatus(id: any): Promise<any>;
    update(id: any, body: any): Promise<any>;
    create(body: any): Promise<any>;
}
