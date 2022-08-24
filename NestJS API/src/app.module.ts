import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlackjackController } from './blackjack/blackjack.controller';
import { PokerController } from './poker/poker.controller';
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
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';
import { OrdersModule } from './orders/orders.module';

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
    OrdersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    BlackjackController,
    PokerController,
    RouletteController,
    PokerOfflineController,
    StatsController,
    FeedbackController,
  ],
})
export class AppModule {}
