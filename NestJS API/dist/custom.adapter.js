"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
class CustomIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, url) {
        super(app);
        this.url = url;
    }
    async connectToRedis() {
        const pubClient = (0, redis_1.createClient)({ url: this.url });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
exports.CustomIoAdapter = CustomIoAdapter;
//# sourceMappingURL=custom.adapter.js.map