import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlackjackController } from './blackjack/blackjack.controller';
import { BlackjackModule } from './blackjack/blackjack.module';
import { AuthModule } from './auth/auth.module';
import { RouletteModule } from './roulette/roulette.module';
import { AppController } from './app.controller';
import config from './config/keys';
import { RouletteController } from './roulette/roulette.controller';
import { PokerOfflineModule } from './poker-offline/poker-offline.module';
import { PokerOfflineController } from './poker-offline/poker-offline.controller';
import { StatsController } from './stats/stats.controller';
import { StatsModule } from './stats/stats.module';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackModule } from './feedback/feedback.module';
import { PokerHoldemModule } from './poker-holdem/poker-holdem.module';
import { OrdersModule } from './orders/orders.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    BlackjackModule,
    RouletteModule,
    PokerOfflineModule,
    AuthModule,
    StatsModule,
    FeedbackModule,
	  PokerHoldemModule,
    RouterModule.register([{
      path: 'poker-holdem',
      module: PokerHoldemModule
    }]),
    OrdersModule
  ],
  controllers: [
    AppController,
    UsersController,
    BlackjackController,    
    RouletteController,
    PokerOfflineController,
    StatsController,
    FeedbackController,
  ],
})
export class AppModule {}
