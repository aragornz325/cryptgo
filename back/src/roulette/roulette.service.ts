import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addBetCoins } from 'src/poker-offline/functions/addCoins.function';
import { reverseCoins } from 'src/poker-offline/functions/reverseCoins.function';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { RouletteNumber, rouletteNumbers } from './classes/roulette.number.class';
import { checkOut } from './functions/checkout';
import { verifyBet } from './functions/get_total_bet';
import { RouletteBet } from './interfaces/roulette.bet.interface';
import { Roulette } from './interfaces/roulette.interface';

@Injectable()
export class RouletteService {
    constructor(private readonly statsService: StatsService, @InjectModel('User') private readonly users: Model<User>) {}
    async createRoulette(userId: string, rouletteBets: RouletteBet[]): Promise<any> {
        let user = await this.users.findOne({ _id: userId });
        let number = Math.random()*360;
        let slice = number/9.72
        let sliceNumber = Math.floor(slice)
        while(sliceNumber > 36){
            sliceNumber = sliceNumber - 36
        }
        let rouletteNumber = rouletteNumbers[sliceNumber]
        let totalBets = verifyBet(rouletteBets, user);
        if(!totalBets.status){
            return { status : false, message: totalBets.message }
        }
        let newTotalBets = {
            one: totalBets.totalCoins[0],
            five: totalBets.totalCoins[1],
            ten: totalBets.totalCoins[2],
            twentyfive: totalBets.totalCoins[3],
            fifty: totalBets.totalCoins[4],
            hundred: totalBets.totalCoins[5],
            twohundred: totalBets.totalCoins[6],
            fivehundred: totalBets.totalCoins[7],
            thousand: totalBets.totalCoins[8],
        }
        user.coins = addBetCoins(user, reverseCoins(newTotalBets));
        user.markModified('coins');
        await user.save();
        // await this.statsService.create(user._id, reverseCoins(newTotalBets), 'Roulette', 'Bets');
        const { newBets, stat } = await checkOut(user, rouletteNumber, rouletteBets);
        await user.save();
        if(stat){
            // await this.statsService.create(user._id, reverseCoins(stat), 'Roulette', 'User Won');
        }
        //console.log(user);
        let totalRotation = rouletteNumber.number*9.72 + 360*randomIntFromInterval(5,13)
        //return { bets: rouletteBets, rouletteNumber: rouletteNumber, status: true, rotation: totalRotation }
        return { coins: user.coins, bets: rouletteBets, newBets, status: true, rotation: totalRotation, rouletteNumber: rouletteNumber, wonCoins: reverseCoins(stat) }
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}