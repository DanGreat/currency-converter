import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private baseUrl: string = environment.baseUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  private mapCurrenciesToArray(objectData: any): any[] {
    return Object.entries(objectData).map((currency) => currency[1])
  }

  private mapRatesToArray(objectData: any): any[] {
    return Object.entries(objectData).map(data => ({currency: data[0], amount: data[1]}))
  }

  getCurrencies(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/currencies`)
    .pipe(
      map((currencies: any) => this.mapCurrenciesToArray(currencies.data))
    )
  }

  getExchangeRate(base_currency: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/latest`, 
    { 
      params: {
        base_currency
      }
    })
    .pipe(
      map((conversions: any) => this.mapRatesToArray(conversions.data))
    )
  }
}
