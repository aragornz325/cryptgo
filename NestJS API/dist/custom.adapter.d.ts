import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
export declare class CustomIoAdapter extends IoAdapter {
    private adapterConstructor;
    private url;
    constructor(app: any, url: string);
    connectToRedis(): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): any;
}
