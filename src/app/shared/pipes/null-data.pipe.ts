import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullData'
  })
export class NullDataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (null != value) { return value ;}
    else {return "Not Provided"; }
  }

}
