import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCoinsDto } from './dto/update-bjcoins.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getBalances(): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    update(id: string, updateUserDto: CreateUserDto): Promise<User>;
    updateCoins(id: string, updateBJCoinsDto: UpdateCoinsDto): Promise<User>;
}
