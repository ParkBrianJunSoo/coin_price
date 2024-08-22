import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BinanceService {
  private readonly API_URL = 'https://api.binance.com/api/v3';

  constructor(private readonly httpService: HttpService) {}

  async getPrices(symbols: string[]): Promise<{ symbol: string, price: number }[]> {
    // 각 심볼에 대한 API 요청 생성
    const requests = symbols.map((symbol) => {
      const url = `${this.API_URL}/ticker/price?symbol=${symbol}`; // http://localhost:3000/binance/prices?symbols
      return lastValueFrom(this.httpService.get(url));
    });

    // 모든 요청을 병렬로 처리하여 응답 받기
    const responses = await Promise.all(requests);

    // 응답 데이터를 파싱하여 가격 목록 생성
    const prices = responses.map(response => ({
      symbol: response.data.symbol,
      price: parseFloat(response.data.price),
    }));

    // 전체 코인 가격을 콘솔에 출력
    console.log('Fetched prices:', prices);

    return prices;
  }
}
