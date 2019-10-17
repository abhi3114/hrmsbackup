import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
  })
export class CustomPdfService {

  constructor() { }

  getSalarySlipPdf(salData,user_name)
  {
    var incentDetails=[]; var incentTable=[]; var noteDetails=[];
    var basic,hra,travel,otherexpense,professionalTax,pbi,epf,earlierepf,special,tds,od,sa,ot,ar,esic;
    var ispf,uanno,empDesignation,empno;
    var username=user_name;
    if(_.find(salData.components,{title:"Basic"}) != undefined){basic=_.find(salData.components,{title:"Basic"}).amount;}else{basic =0;}
    if(_.find(salData.components,{title:"HRA"})!= undefined){ hra=_.find(salData.components,{title:"HRA"}).amount;}else{hra =0;}
    if(_.find(salData.components,{title:"Travelling Allowance"}) != undefined){ travel=_.find(salData.components,{title:"Travelling Allowance"}).amount;}else{travel =0;}
    if(_.find(salData.components,{title:"Additional Payout"}) != undefined){otherexpense=_.find(salData.components,{title:"Additional Payout"}).amount;}else{otherexpense =0;}
    if( _.find(salData.components,{title:"Professional Tax"})!= undefined){professionalTax=_.find(salData.components,{title:"Professional Tax"}).amount;}else{professionalTax =0;}
    if( _.find(salData.components,{title:"Performance Based Incentive"})!= undefined){pbi=_.find(salData.components,{title:"Performance Based Incentive"}).amount;}else{pbi =0;}
    if(_.find(salData.components,{title:"EPF"}) != undefined)
    {
      epf=_.find(salData.components,{title:"EPF"}).amount;epf=epf-salData.details.epf_basic_deductible
      }else{epf =0;}
      if(_.find(salData.components,{title:"Earlier PF Deduction"}) != undefined){earlierepf=_.find(salData.components,{title:"Earlier PF Deduction"}).amount;}else{earlierepf =0;}
      if(_.find(salData.components,{title:"Special Allowance"}) != undefined){special=_.find(salData.components,{title:"Special Allowance"}).amount;}else{special =0;}
      if(_.find(salData.components,{title:"TDS"}) != undefined){tds=_.find(salData.components,{title:"TDS"}).amount;}else{tds =0;}
      if(_.find(salData.components,{title:"Other Deductions"}) != undefined){od=_.find(salData.components,{title:"Other Deductions"}).amount;}else{od =0;}
      if(_.find(salData.components,{title:"Salary Advance"}) != undefined){sa=_.find(salData.components,{title:"Salary Advance"}).amount;}else{sa =0;}
      if(_.find(salData.components,{title:"Overtime"}) != undefined){ot=_.find(salData.components,{title:"Overtime"}).amount;}else{ot =0;}
      if(_.find(salData.components,{title:"Arrears"}) != undefined){ar=_.find(salData.components,{title:"Arrears"}).amount;}else{ar =0;}
      if(_.find(salData.components,{title:"ESIC Deduction"}) != undefined)
      {
        esic=_.find(salData.components,{title:"ESIC Deduction"}).amount;esic=esic-salData.details.esic_basic_deductible
      }
      else{esic =0;}
      if(_.find(salData.components,{title:"Incentive"}) != undefined)
      {
        var incentive=_.find(salData.components,{title:"Incentive"}).amount;
        if(_.find(salData.components,{title:"Incentive"}).details != undefined)
        {
          var IncentiveDetails=_.find(salData.components,{title:"Incentive"}).details;
          if(IncentiveDetails!="" && IncentiveDetails != null)
          {
            incentDetails.push({text:'INCENTIVE DETAILS', style: 'subheader',alignment: 'center'})
            incentTable.push({text:IncentiveDetails, style: 'tableContent',colSpan: 4,alignment: 'left'},{},{},{})
          }

        }
      }
      else
      {
        var incentive =0;
      }
      if(salData.details.notes.length >0)
      {
        noteDetails.push({text:'*NOTE', style: 'subheader',alignment: 'left'})
        _.each(salData.details.notes,function(d){
          noteDetails.push({text:d+'\n', style: 'tableContent',alignment: 'left'})
          })

      }
      var joindate=moment(salData.date_of_joining).format("DD/MM/YYYY");
      if(salData.details.pf_account_no){ispf=salData.details.pf_account_no;}
      else{  ispf='';}
      if(salData.details.uan_no){ uanno=salData.details.uan_no;}
      else{ uanno='';}
      if(salData.details.designation){ empDesignation=salData.details.designation;}
      else{ empDesignation='';}
      if(salData.details.employee_number){ empno=salData.details.employee_number;}
      else{ empno="";}
      var Earnings=0;var Deductions=0;
      Earnings=Earnings+parseInt(basic)+parseInt(hra)+parseInt(travel)+parseInt(incentive)+parseInt(special)+parseInt(otherexpense)+parseInt(ot)+parseInt(ar)+parseInt(pbi)-salData.details.epf_basic_deductible-salData.details.esic_basic_deductible;
      Deductions=Deductions+parseInt(professionalTax)+parseInt(epf)+parseInt(earlierepf)+parseInt(tds)+parseInt(od)+parseInt(sa)+parseInt(esic);
      var finalIncentive=parseInt(incentive)+parseInt(pbi);
      var imageDataUri='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATIAAABJCAYAAAC+VKpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzVFRDA2Qzc3NzVBMTFFN0FGQjhGQUQxNDUzQ0Y5NUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzVFRDA2Qzg3NzVBMTFFN0FGQjhGQUQxNDUzQ0Y5NUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NUVEMDZDNTc3NUExMUU3QUZCOEZBRDE0NTNDRjk1QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NUVEMDZDNjc3NUExMUU3QUZCOEZBRDE0NTNDRjk1QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pibu4DoAACS7SURBVHja7H0NnBTF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';
      var dd = {
        content:
        [
        {
          style: 'tableTitle',
          color: '#444',
          table: {
            widths: [300,200],
            // headerRows: 2,
            body: [
            [{image: imageDataUri, style: 'tableHeader',width: 200,border: [false, false, false, false]},{text:'PropertyPistol Realty Pvt. Ltd,\n'+'#705,Mayuresh Chamber, 7th Floor, Sector-11, CBD Belapur, Navi Mumbai,\n'+'Maharashtra, India.', style: 'tableTileContent',border: [false, false, false, false]}]
            ]
          }
          },

          {
            style: 'tableExample',
            color: '#dfdfdf',
            table: {
              widths: [130, 120, 110,120],
              body: [
              [{text: salData.title, style: 'tableHeader',colSpan:4,alignment: 'center'},{},{},{}],
              [{text: 'Employee No.', style: 'tableheadContent',border: [true, true, false, false]}, {text: empno, style: 'tableContent',border: [false, true, true, false], alignment: 'left'},
              {text: 'Date of Joining', style: 'tableheadContent',border: [true, false, false, false]}, {text: joindate, style: 'tableContent',border: [false, false, true,false], alignment: 'left'}],
              [{text: 'Name', style: 'tableheadContent',border: [true, false, false, false]}, {text: username, style: 'tableContent',border: [false, false, true, false], alignment: 'left'},
              {text: 'Pan Card No', style: 'tableheadContent',border: [true, false, false, false]}, {text:salData.details.pan_no, style: 'tableContent',border: [false, false, true, false], alignment: 'left'}],
              [{text: 'Location', style: 'tableheadContent',border: [true, false, false, false]}, {text: 'Mumbai', style: 'tableContent',border: [false, false, true, false], alignment: 'left'},
              {text: 'PF Account No ', style: 'tableheadContent',border: [true, false, false, false]}, {text:ispf, style: 'tableContent',border: [false, false, true, false], alignment: 'left'}],
              [{text: 'Designation', style: 'tableheadContent',border: [true, false, false, false]}, {text:empDesignation, style: 'tableContent',border: [false, false, true, false], alignment: 'left'},
              {text: 'UAN No', style: 'tableheadContent',border: [true, false, false, false]}, {text:uanno, style: 'tableContent',border: [false, false, true, false], alignment: 'left'}],
              [{text: 'Days in a Month', style: 'tableheadContent',border: [true, false, false, true]}, {text:salData.total_days, style: 'tableContent',border: [false, false, true, true], alignment: 'left'},
              {text: 'Days Present: '+salData.active_days, style: 'tableheadContent',border: [true, false, false, true]}, {text: 'LWP: '+salData.lwp, style: 'tableHeader',border: [false, false, true, true], alignment: 'left'}],
              ]
              },
              layout: {
                hLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? 1 : 1;
                  },
                  vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                    },
                    hLineColor: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                        },
                      }
                      },
                      {
                        style: 'salTable',
                        color: '#dfdfdf',
                        table: {
                          widths: [130, 120, 110,120],
                          body: [
                          [{text: 'Particulars', style: 'tableHeader', alignment: 'left',border: [true, true, false, false]}, {text: 'Earnings', style: 'tableHeader', alignment: 'right',border: [true, true, true, false]},

                          {text: 'Particulars', style: 'tableHeader', alignment: 'left',border: [true, true, true, true]}, {text: 'Deductions', style: 'tableHeader', alignment: 'right',border: [true, true, true, true]}],

                          [{text: 'Basic', style: 'tableheadContent',border: [true, true, true, false]},
                          {text:(this.convertAmountintoCurrency(basic)), style: 'tableContent', alignment: 'right',border: [true, true, true, false]},

                          {text: 'Professional Tax', style: 'tableheadContent',border: [true, false, true, false]},
                          {text:(this.convertAmountintoCurrency(professionalTax)), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'HRA', style: 'tableheadContent',border: [true, false, true, false]},
                          {text: this.convertAmountintoCurrency((hra)), style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'IT TDS', style: 'tableheadContent',border: [true, false, true, false]}, {text:this.convertAmountintoCurrency(tds), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Travelling Allowance', style: 'tableheadContent',border: [true, false, true, false]}, {text: this.convertAmountintoCurrency(travel), style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'EPF', style: 'tableheadContent',border: [true, false, true, false]}, {text:this.convertAmountintoCurrency(epf), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Other Earnings', style: 'tableheadContent',border: [true, false, true, false]}, {text:this.convertAmountintoCurrency(otherexpense) , style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'Earlier PF Deduction', style: 'tableheadContent',border: [true, false, true, false]},  {text: this.convertAmountintoCurrency(earlierepf), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Incentives', style: 'tableheadContent',border: [true, false, true, false]},
                          {text:this.convertAmountintoCurrency(finalIncentive), style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'Other Deduction', style: 'tableheadContent',border: [true, false, true, false]},  {text: this.convertAmountintoCurrency(od), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Special Allowance', style: 'tableheadContent',border: [true, false, true, false]}, {text:this.convertAmountintoCurrency(special), style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'Salary Advance', style: 'tableheadContent',border: [true, false, true, false]},
                          {text: this.convertAmountintoCurrency(sa), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Overtime', style: 'tableheadContent',border: [true, false, true, false]},
                          {text:this.convertAmountintoCurrency(ot), style: 'tableContent', alignment: 'right',border: [true, false, true, false]},

                          {text: 'ESIC Deduction', style: 'tableheadContent',border: [true, false, true, false]},
                          {text: this.convertAmountintoCurrency(esic), style: 'tableContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Arrears', style: 'tableheadContent',border: [true, false, true, false]},
                          {text:this.convertAmountintoCurrency(ar), style: 'tableheadContent', alignment: 'right',border: [true, false, true, false]},

                          {text: '', style: 'tableheadContent',border: [true, false, true, false]}, {text: '', style: 'tableheadContent', alignment: 'right',border: [true, false, true, false]}],

                          [{text: 'Total', style: 'tableHeader',border: [true, true, false, false]}, {text: 'Gross Earnings: '+this.convertAmountintoCurrency(Earnings)+'*', style: 'grossContent', alignment: 'right',border: [false, true, true, false]},

                          {text: 'Total', style: 'tableHeader',border: [true, true, false, false]}, {text:'Gross Deductions: '+this.convertAmountintoCurrency(Deductions) , style: 'grossContent', alignment: 'right',border: [false, true, true, false]}],

                          [{text: 'Net Salary Payable', style: 'tableHeader',colSpan: 2, alignment: 'left'}, {},
                          {text:this.convertAmountintoCurrency(salData.amount), style: 'grossContent',colSpan: 2, alignment: 'right',border: [false, true, true, false]}, {}],

                          [{text: 'Net Salary Payable in Words', style: 'tableHeader',colSpan: 2, alignment: 'left'}, {},{text:this.convertAmountintoCurrency(salData.amount), style: 'grossContent',colSpan: 2, alignment: 'right',}, {} ],

                          ]
                          },
                          layout: {
                            hLineWidth: function(i, node) {
                              return (i === 0 || i === node.table.body.length) ? 1 : 1;
                              },
                              vLineWidth: function(i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                  return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                                  },
                                  vLineColor: function(i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                                    },
                                  }
                                  },
                                  incentDetails,
                                  // {text:'INCENTIVE DETAILS', style: 'subheader',alignment: 'center'},
                                  {
                                    style: 'salTable',
                                    color: '#444',
                                    table: {
                                      widths: [130, 100, 150,100],
                                      // headerRows: 2,
                                      body: [ incentTable],

                                      },
                                      layout: {
                                        hLineWidth: function(i, node) {
                                          return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                          },
                                          vLineWidth: function(i, node) {
                                            return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                            },
                                            hLineColor: function(i, node) {
                                              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                                              },
                                              vLineColor: function(i, node) {
                                                return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                                                },
                                              }
                                              },
                                              noteDetails,
                                              {text:'This is computer genrated payslip. No signature is required.', style: 'subheader',alignment: 'left'},
                                              ],
                                              styles: {
                                                header: {
                                                  fontSize: 18,
                                                  bold: true,
                                                  margin: [0, 0, 0, 10]
                                                  },
                                                  subheader: {
                                                    fontSize: 12,
                                                    bold: true,
                                                    margin: [0, 10, 0, 5]
                                                    },
                                                    tableExample: {
                                                      margin: [0, 5, 0, 10]
                                                      },
                                                      salTable: {
                                                        margin: [0, 5, 0, 10]
                                                        },
                                                        tableTitle:
                                                        {
                                                          margin: [0, 5, 0, 30],
                                                          borderCollapse: 0
                                                          },
                                                          tableContent:{
                                                            fontSize: 10,
                                                            color: 'black'
                                                            },
                                                            tableheadContent:{
                                                              fontSize: 12,
                                                              color: 'black'
                                                              },
                                                              grossContent:{
                                                                fontSize: 10,
                                                                color: 'black',
                                                                bold: true,
                                                                },
                                                                tableTileContent:{
                                                                  fontSize: 10,
                                                                  color: 'black',
                                                                  },
                                                                  tableHeader: {
                                                                    bold: true,
                                                                    fontSize: 12,
                                                                    color: 'black'
                                                                    },
                                                                    blankrow:
                                                                    {
                                                                      color:'gray',
                                                                      fillColor: 'gray'
                                                                      },
                                                                      },
                                                                      defaultStyle: {
                                                                        // alignment: 'justify'
                                                                      }
                                                                    }
                                                                    return dd;
                                                                  }
                                                                  getSalaryRevisonLetterPdf(salary_data,user_name)
                                                                  {
                                                                    var imageDataUri='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATIAAABJCAYAAAC+VKpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzVFRDA2Qzc3NzVBMTFFN0FGQjhGQUQxNDUzQ0Y5NUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzVFRDA2Qzg3NzVBMTFFN0FGQjhGQUQxNDUzQ0Y5NUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NUVEMDZDNTc3NUExMUU3QUZCOEZBRDE0NTNDRjk1QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NUVEMDZDNjc3NUExMUU3QUZCOEZBRDE0NTNDRjk1QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pibu4DoAACS7SURBVHja7H0NnBTF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';
                                                                    var comp;var date=moment(salary_data.start_date).format("DD/MM/YYYY");
                                                                    comp=salary_data.components; var anexData="";var monthlyTot=0;var yearlyTot=0;var annual=0;
                                                                    var getComponentDetails = function ()
                                                                    {
                                                                      var revComponents = [];
                                                                      revComponents.push([{ text: 'Annexure I', style: 'tableHeader',colSpan:3,alignment:'center' },{}, {}]);
                                                                      revComponents.push([{ text: 'Component', style: 'tableHeader', fillColor: '#efefef' }, { text: 'Amount per month (Rs.)', style: 'tableHeader', fillColor: '#efefef' }, { text: 'Amount per year (Rs.)', style: 'tableHeader', fillColor: '#efefef' }]);;
                                                                      for (var i = 0; i < comp.length; i++)
                                                                      {
                                                                        if(comp[i].title !='Professional Tax')
                                                                        {
                                                                          annual=parseInt(comp[i].amount)*12;
                                                                          monthlyTot=monthlyTot+parseInt(comp[i].amount);
                                                                          yearlyTot=yearlyTot+annual;
                                                                          var compamount= (comp[i].amount).toLocaleString('en-IN', {currency: 'INR',maximumFractionDigits: 0})
                                                                          var convertedannual=annual.toLocaleString('en-IN', {currency: 'INR',maximumFractionDigits: 0});
                                                                          revComponents.push([{ text: comp[i].title, style: 'tableContent' },
                                                                            { text:compamount , style: 'tableContent' },
                                                                            { text:convertedannual , style: 'tableContent' }])
                                                                        }

                                                                      }
                                                                      var convertedmonthlyTot=monthlyTot.toLocaleString('en-IN', {currency: 'INR',maximumFractionDigits: 0});
                                                                      var convertedyearlyTot=yearlyTot.toLocaleString('en-IN', {currency: 'INR',maximumFractionDigits: 0});
                                                                      revComponents.push([{ text: 'Total', style: 'tableContent' },
                                                                        { text:convertedmonthlyTot  , style: 'tableContent' },
                                                                        { text:convertedyearlyTot, style: 'tableContent' }])
                                                                      var  salRevComp = {
                                                                        headerRows: 1,
                                                                        widths: [150,150 ,150],
                                                                        body: revComponents
                                                                      }
                                                                      return salRevComp
                                                                    }
                                                                    var dd =
                                                                    {
                                                                      content:
                                                                      [
                                                                      {
                                                                        style: 'tableTitle',
                                                                        color: '#444',
                                                                        table: {
                                                                          widths: [300,200],
                                                                          // headerRows: 2,
                                                                          body: [
                                                                          [{image:imageDataUri, style: 'tableHeader',width: 200,border: [false, false, false, false]},{text:'PropertyPistol Realty Pvt. Ltd,\n'+'#705,Mayuresh Chamber, 7th Floor, Sector-11, CBD Belapur, Navi Mumbai,\n'+'Maharashtra, India.', style: 'tableTileContent',border: [false, false, false, false]}]
                                                                          ]
                                                                        }
                                                                        },
                                                                        {text:'Date: '+date, style: 'letterTileContent',alignment: 'left'},
                                                                        {text:'Name of Employee: '+user_name, style: 'letterContent',alignment: 'left'},
                                                                        {text:'Subject: Salary Revision Letter', style: 'letterContent',alignment: 'left'},
                                                                        {text:'Dear ' +user_name+',', style: 'letterContent',alignment: 'left'},
                                                                        {text:'We are pleased to inform you that keeping in view of your good performance at your work place and role, the Management has taken a decision to give you a salary increment.', style: 'letterContent',alignment: 'left'},
                                                                        {text:'    Consequently, your compensation has been revised and the new enhanced compensation will as below with salary break-up', style: 'letterContent',alignment: 'left'},
                                                                        {
                                                                          style: 'tableTitle',
                                                                          color: '#444',
                                                                          table: getComponentDetails()
                                                                          },
                                                                          {text:'Your terms of appointment remain same as your offer letter. ', style: 'tableExample',alignment: 'justify'},
                                                                          {text:'We are sure that this will motivate you and you will strive to continuously improvement in your performance in future also.', style: 'tableExample',alignment: 'justify'},
                                                                          {text:'For, Propertypistol Realty Pvt. Ltd.', style: 'letterTileContent',alignment: 'left'},
                                                                          {text:'Ashish Narain Agarwal', style: 'letterTileContent',alignment: 'left'}

                                                                          ],
                                                                          styles: {
                                                                            tableExample: {
                                                                              margin: [0,10, 0, 10],
                                                                              fontSize: 10,
                                                                              color: 'black'
                                                                              },
                                                                              tableContent:{
                                                                                fontSize: 10,
                                                                                color: 'black'
                                                                                },
                                                                                tableHeader: {
                                                                                  bold: true,
                                                                                  fontSize: 12,
                                                                                  color: 'black'
                                                                                  },
                                                                                  letterContent:
                                                                                  {
                                                                                    margin: [0,0, 0, 10],
                                                                                    fontSize: 10,
                                                                                    color: 'black'
                                                                                    },
                                                                                    letterTileContent:{
                                                                                      margin: [0,30, 0, 10],
                                                                                      fontSize: 10,
                                                                                      color: 'black',
                                                                                      },
                                                                                      tableTileContent:{
                                                                                        fontSize: 10,
                                                                                        color: 'black',
                                                                                      }
                                                                                      },
                                                                                      defaultStyle: {
                                                                                        // alignment: 'justify'
                                                                                      }

                                                                                    }
                                                                                    return dd
                                                                                  }

                                                                                  convertAmountintoCurrency(number)
                                                                                  {
                                                                                    if(number!=undefined)
                                                                                    {
                                                                                      var n=number.toLocaleString('en-IN', {
                                                                                        currency: 'INR',
                                                                                        maximumFractionDigits: 0
                                                                                        });
                                                                                      return n;
                                                                                    }

                                                                                  }
                                                                                }


