import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
  })
export class MonthYearService {

  constructor() { }
  populateYear()
  {
    var start = 2000; var end = new Date().getFullYear(); var year=[];
    for(var i=start;i<=end;i++)
    {
      var yr=i.toString();
      year.push(yr);
    }
    return year;
  }
  populateMonth()
  {
    var months=[];
    months.push({id:1,name:"January"});months.push({id:2,name:"February"});months.push({id:3,name:"March"});
    months.push({id:4,name:"April"});months.push({id:5,name:"May"});months.push({id:6,name:"June"});
    months.push({id:7,name:"July"});months.push({id:8,name:"August"});months.push({id:9,name:"September"});
    months.push({id:10,name:"October"});months.push({id:11,name:"November"});months.push({id:12,name:"December"});
    return months;
  }
  getFilterData()
  {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);var lastDay = new Date(y, m + 1, 0);
    var filterData=[];filterData.push({firstDay:firstDay,lastDay:lastDay});
    return filterData;
  }
  getMonthandYear()
  {
    var currentDate=moment();
    var end = new Date().getFullYear();
    var startOfMonth = moment().startOf('month');
    var tenthDayOfMonth=moment(startOfMonth).add(10,'d');
    if (currentDate.isBetween(startOfMonth, tenthDayOfMonth))
    {
      var currentmonth= new Date().getMonth();
      if(currentmonth == 0){var currentmonth= 12; var y=(end-1).toString();}else{var y=end.toString();}
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

  getSalaryEditableRange(selectedmonth,selectedyear)
  {
    var currentDate=moment();
    var startOfMonth =moment().startOf('month');
    var previousMonth =moment().subtract(1, 'months');
    var startOfPreviousMonth =moment(previousMonth).startOf('month');
    var FifthOfCurrentMonth=moment(startOfMonth).add(5,'d');
    var SixthOfPreviousMonth =moment(startOfPreviousMonth).add(6,'d');
    if((currentDate.isBetween(SixthOfPreviousMonth, FifthOfCurrentMonth)))
    {
      var editable_start_date=moment(previousMonth).startOf('month');
      var editable_last_date=moment(previousMonth).endOf('month');
    }
    else
    {
      var editable_start_date=moment().startOf('month');
      var editable_last_date=moment().endOf('month');
    }
    var hard_coded_date="15"+"/"+selectedmonth+"/"+selectedyear;
    var comparable_date= moment(hard_coded_date,'DD/MM/YYYY');
    var isBetween = comparable_date.isBetween(editable_start_date, editable_last_date);
    return isBetween;
  }
}
