import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
  })
export class PoliciesService {

  constructor(private http: HttpClient) { }


  downloadLeavePolicy()
  {
    let url="src/assets/files/leavepolicy.pdf"
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
      });
    let requestOptions = {headers : headerOptions,responseType: 'blob' as 'blob'};
    this.http.get(url,requestOptions).pipe(map((data :any)  => {
      let blob = new Blob([data], { type: 'application/pdf'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Leave_Policy.pdf';
      link.click();
      window.URL.revokeObjectURL(link.href);

      })).subscribe((result : any) => {
      });
    }

    // headers.append('Authorization', 'JWT ' + localStorage.getItem('id_token'));
    // return this.http.get(url,{  headers: headers,responseType: ResponseContentType.Blob }).map(
    // (res) => {
      // return new Blob([res.blob()], { type: 'application/pdf' })
      //})
    }
