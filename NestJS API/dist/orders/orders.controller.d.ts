import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<Order[]>;
    getRates(): Promise<any>;
    getById(id: string): Promise<Order>;
    getStatus(id: string): Promise<any>;
    update(id: string, body: object): Promise<any>;
    create(body: any): Promise<any>;
}
