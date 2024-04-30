import { Component, OnInit, inject } from '@angular/core';
import { CurrencyStore } from './currency.store';
import { CurrencySwitcherUsingStoreComponent } from './currency-switcher/currency-switcher-using-store/currency-switcher-using-store.component';
import { DecimalPipe } from '@angular/common';
import { CurrencySwitcherUsingServiceComponent } from './currency-switcher/currency-switcher-using-service/currency-switcher-using-service.component';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    CurrencySwitcherUsingStoreComponent,
    CurrencySwitcherUsingServiceComponent,
    DecimalPipe,
  ],
  standalone: true,
})
export class HomePageComponent {
  protected readonly currencyStore = inject(CurrencyStore);
  protected readonly currencyService = inject(CurrencyService);
  protected readonly priceInUsdAtStore = 10;
  protected readonly priceInUsdAtStation = 100;
}
