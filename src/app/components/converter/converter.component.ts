import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, shareReplay, tap } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent  implements OnInit {

  @Output() onRatesFetched: EventEmitter<any> = new EventEmitter<any>()
  public currencyForm!: FormGroup
  public currencies$!: Observable<any>
  public rate!: number | string;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) { 
    this.initForm()
    this.currencies$ = this.currencyService.getCurrencies().pipe(shareReplay())
  }

  initForm() {
    this.currencyForm = this.fb.group({
      base_currency: new FormControl(''),
      target_currency: new FormControl('')
    })
  }

  ngOnInit() {
    this.targetCurrencyListener()
  }

  targetCurrencyListener() {
    this.currencyForm.get('target_currency')?.valueChanges
    .pipe(
      tap(() => this.rate = '')
    ).subscribe()
  }

  get getControl() {
    return this.currencyForm.controls
  }

  fetchRates() {
    const { base_currency, target_currency } = this.currencyForm.value
    this.currencyService.getExchangeRate(base_currency)
    .pipe(
      tap((response: any) => {
        const rate = response.find((rate: any) => rate.currency.toLowerCase() === target_currency.toLowerCase())        
        if(!rate) {
          alert('No conversion rate found for the target currency')
          return
        }
        
        this.rate = rate.amount
        const conversion = {
          currencyFrom: base_currency,
          ...rate
        }      

        this.onRatesFetched.emit(conversion)
      })
    ).subscribe()
  }

}
