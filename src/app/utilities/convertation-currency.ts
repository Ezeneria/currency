import {CurrencySymbols} from "../constants";
import {Currency} from "../types";
import {FormControl} from "@angular/forms";

export function convertCurrency (
  from: number,
  to: FormControl,
  currency: Currency,
  fromSymbol: CurrencySymbols,
  toSymbol: CurrencySymbols,
  defaultDirectionConvert: boolean = true): number {

  if(fromSymbol === CurrencySymbols.USD) {
    return +(from * currency.rates[toSymbol]).toFixed(2);
  } else {
    return +(currency.rates[toSymbol] / currency.rates[fromSymbol] * from).toFixed(2)
  }
}
