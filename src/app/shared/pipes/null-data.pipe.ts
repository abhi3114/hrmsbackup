import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullData'
  })
export class NullDataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null || value == "" )
    {
      return "N/A";
    }
    else
    {
      return value ;
    }
  }

}
