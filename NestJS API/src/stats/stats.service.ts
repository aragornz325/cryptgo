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
    const newstats = await this.stats.find();
    const stats = newstats.filter(stat => stat.userId !== '622b924c7d812bd7ee763160')
    let earnings = 0;
    stats.map(stat => {
      return earnings += stat.winning;
    })
    return { stats: stats.reverse(), earnings };
  }

  async create(userId: string, coins: any, game: string, description: string): Promise<Stat> {
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