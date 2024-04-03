import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../environments";
import {Observable} from "rxjs";
import {Currency} from "../types";




@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor(private http: HttpClient) { }


  fetchCurrency(symbols?: string[]): Observable<Currency> {
    return this.http.get<Currency>(`${environments.currencyFreaks}/rates/latest?apikey=${environments.token}&symbols=${symbols}`);
  }
}
