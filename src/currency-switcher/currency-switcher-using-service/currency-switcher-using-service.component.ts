import { Component, OnInit, inject } from '@angular/core';
import { CurrencyService } from '../../currency.service';

@Component({
  selector: 'app-currency-switcher-using-service',
  templateUrl: './currency-switcher-using-service.component.html',
  standalone: true,
})
export class CurrencySwitcherUsingServiceComponent {
  currencyService = inject(CurrencyService);
}
