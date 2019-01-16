import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoosterSessionService } from './booster-session.service';
import {Observable,Subject} from 'rxjs';
@Component({
  selector: 'app-booster-session',
  templateUrl: './booster-session.component.html',
  styleUrls: ['./booster-session.component.css']
  })
export class BoosterSessionComponent implements OnInit {
  user_data:any;booster_session_data:any;
  boosterSessionTableOptions: DataTables.Settings = {};
  boosterSessionTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:BoosterSessionService)
  {
    this.boosterSessionTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getBoosterSessions().subscribe(res => {
      this.user_data=res;
      this.booster_session_data=this.user_data.booster_session_data;
      this.boosterSessionTableTrigger.next();
      }, (err) => {
        alert(err.error);
        });
  }

  ngOnInit() {
  }

}
