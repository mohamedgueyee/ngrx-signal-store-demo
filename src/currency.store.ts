import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withState,
  patchState,
  withMethods,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';

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

export const CurrencyStore = signalStore(
  { providedIn: 'root' },
  withState({
    currencies: DEFAULT_CURRENCIES,
    currentCurrency: DEFAULT_CURRENCIES[0],
    exchangeRates: { EUR: 1, GBP: 1, USD: 1 } as ExchangeRates,
  }),
  withComputed(({ exchangeRates, currentCurrency }) => ({
    exchangeRate: computed(() => exchangeRates()[currentCurrency().code]),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    setCurrency(currencyCode: Currency['code']) {
      const newCurrency = store
        .currencies()
        .find((c) => c.code === currencyCode);
      patchState(store, { currentCurrency: newCurrency });
    },
    loadExchangeRates: rxMethod<ExchangeRates>(
      pipe(
        switchMap(() =>
          http.get<ExchangeRates>('https://lp-store-server.vercel.app/rates')
        ),
        tap((exchangeRates) => patchState(store, { exchangeRates }))
      )
    ),
  })),
  withHooks({
    onInit: ({ loadExchangeRates }) => {
      loadExchangeRates(of({}));
    },
  })
);

console.log('currencyStore: ', CurrencyStore);
