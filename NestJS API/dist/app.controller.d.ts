import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    logout(req: any): Promise<{
        success: string;
    }>;
    getUser(req: any): Promise<any>;
}
