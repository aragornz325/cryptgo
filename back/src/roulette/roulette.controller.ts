import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Res,
  } from '@nestjs/common';
import { Roulette } from './interfaces/roulette.interface';
import { RouletteService } from './roulette.service';

@Controller('api/roulette')
export class RouletteController {
  constructor(private readonly rouletteService: RouletteService) {}
  @Post()
  async create(@Body() body){
    return await this.rouletteService.createRoulette(body.userId, body.rouletteBets);
  }
}
