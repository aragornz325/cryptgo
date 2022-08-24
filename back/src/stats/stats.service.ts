import { Injectable } from '@nestjs/common';
import { Stat } from './interfaces/stats.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bet } from './interfaces/bet.interface';
import { coinToNumber } from './functions/coinToNumber.function';

@Injectable()
export class StatsService {

  constructor(@InjectModel('Stats') private readonly stats: Model<Stat>) {}

  async findAll(): Promise<Object> {
    const stats = await this.stats.find();
    const earnings = await this.stats.aggregate([{
      $group: {
        _id: { year: { $year: "$date" } },
        earnings: { $sum: '$winning' }
      }
    }])
    return { stats: stats.reverse(), earnings: earnings[0].earnings };
  }

  async create(userId: string, coins: Bet, game: string, description: string): Promise<Stat> {
    let winning: number = coinToNumber(coins);
    return await this.stats.create({ userId, winning, game, description });
  }

  async delete(id: string): Promise<Object> {
    return await this.stats.deleteOne({ _id: id })
  }

  async deleteAll(): Promise<Object> {
    return await this.stats.deleteMany({})
  }
}