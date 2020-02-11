import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
  })
export class CommonSalaryService {
  constructor() {}
  getMonthandYear()
  {
    var currentDate=moment();
    var end = new Date().getFullYear();
    var startOfMonth = moment().startOf('month');
    var tenthDayOfMonth=moment(startOfMonth).add(10,'d');
    if (currentDate.isBetween(startOfMonth, tenthDayOfMonth))
    {
      var currentmonth= new Date().getMonth();
      if(currentmonth == 0)
      {
        var currentmonth= 12;
        var y=(end-1).toString();
      }
      else{
        var y=end.toString();
      }
    }
    else
    {
      var currentmonth= new Date().getMonth()+1; var y=end.toString();
    }

    var selectedmonth= currentmonth.toString();
    var selectedyear=y;

    var data={selectedmonth,selectedyear}
    return data
  }

}
