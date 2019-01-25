import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency'
  })
export class IndianCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any
  {
    if(value!=undefined)
    {
      var n=value.toLocaleString('en-IN', {
        currency: 'INR',
        maximumFractionDigits: 0
        });
      return n;
    }
    else{return null;}

  }

}
