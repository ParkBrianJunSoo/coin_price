import { Controller, Get, Query } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('prices')
  async getPrices(@Query('symbols') symbols?: string): Promise<{ symbol: string, price: number }[]> {
    // 심볼이 주어지면, 쉼표로 나누어서 배열로 변환
    const symbolsArray = symbols ? symbols.split(',') : ['BTCUSDT', 'ETHUSDT', 'APTUSDT', 'SOLUSDT', 'XRPUSDT'];
    
    // 서비스에서 가격 가져오기
    return this.binanceService.getPrices(symbolsArray);
  }
}
