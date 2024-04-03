import {Component, OnInit} from '@angular/core';
import {CurrencyApiService} from "./services/currency-api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencySymbols} from "./constants";
import {Currency} from "./types";
import {convertCurrency} from "./utilities/convertation-currency";
import {catchError, throwError} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CurrencyApiService]
})
export class AppComponent implements OnInit {
  currency: Currency | undefined;
  form!: FormGroup;
  currencySymbols: string[] = Object.keys(CurrencySymbols);

  constructor(private fb: FormBuilder, private currencyApiService: CurrencyApiService) {
    this.form = this.fb.group({
      selectFromCurrency: new FormControl<CurrencySymbols>(CurrencySymbols.USD),
      selectToCurrency: new FormControl<CurrencySymbols>(CurrencySymbols.RUB),
      currencyLeft: new FormControl<number | null>(null, [Validators.required]),
      currencyRight: new FormControl<number | null>(null, [Validators.required])
    })
  }

  ngOnInit() {
    this.currencyApiService.fetchCurrency(this.currencySymbols)
      .pipe(
        catchError((error) => throwError(() => error)),
        takeUntilDestroyed())
      .subscribe(currency => this.currency = currency)

    this.currencyLeftControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value: number) => {
      if(this.currency) {
        this.currencyRightControl.patchValue(
          convertCurrency(
            value,
            this.currencyRightControl,
            this.currency,
            this.selectFromCurrencyControl.value,
            this.selectToCurrencyControl.value
          ), { emitEvent: false }
        )
      }
    });

    this.currencyRightControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value: number) => {
      if(this.currency) {
        this.currencyLeftControl.patchValue(
          convertCurrency(
            value,
            this.currencyLeftControl,
            this.currency,
            this.selectToCurrencyControl.value,
            this.selectFromCurrencyControl.value,
            false
          ), { emitEvent: false }
        )
      }
    });
  }


  get currencyLeftControl(): FormControl {
    return this.form?.get('currencyLeft') as FormControl
  }
  get currencyRightControl(): FormControl {
    return this.form?.get('currencyRight') as FormControl
  }

  get selectFromCurrencyControl(): FormControl {
    return this.form?.get('selectFromCurrency') as FormControl
  }

  get selectToCurrencyControl(): FormControl {
    return this.form?.get('selectToCurrency') as FormControl
  }
}
