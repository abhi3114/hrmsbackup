import { Injectable } from '@angular/core';

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
}
