import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

interface Currency {
  code: string;
  symbol: string;
}

type ExchangeRates = Record<Currency['code'], number>;

const DEFAULT_CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
];

const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  EUR: 1,
  GBP: 1,
  USD: 1,
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  readonly currencies = signal<Currency[]>(DEFAULT_CURRENCIES);
  readonly currentCurrency = signal<Currency>(DEFAULT_CURRENCIES[0]);
  private http = inject(HttpClient);
  private rates$ = this.http.get<ExchangeRates>(
    'https://lp-store-server.vercel.app/rates'
  );

  private exchangeRates = toSignal(this.rates$, {
    initialValue: DEFAULT_EXCHANGE_RATES,
  });

  readonly exchangeRate = computed<number>(
    () => this.exchangeRates()[this.currentCurrency().code]
  );

  setCurrency(currencyCode: Currency['code']): void {
    const newCurrency = this.currencies().find((c) => c.code === currencyCode);
    if (newCurrency) this.currentCurrency.set(newCurrency);
  }
}
