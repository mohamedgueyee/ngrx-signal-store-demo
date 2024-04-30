import { Component, OnInit, inject } from '@angular/core';
import { CurrencyStore } from '../../currency.store';

@Component({
  selector: 'app-currency-switcher-using-store',
  templateUrl: './currency-switcher-using-store.component.html',
  standalone: true,
})
export class CurrencySwitcherUsingStoreComponent {
  currencyStore = inject(CurrencyStore);
}
