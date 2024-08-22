import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceService } from './binance/binance.service';
import { BinanceController } from './binance/binance.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, BinanceController],
  providers: [AppService, BinanceService],
})
export class AppModule {}
