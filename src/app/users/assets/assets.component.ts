import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from './assets.service';
import {Observable,Subject} from 'rxjs';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
  })
export class AssetsComponent implements OnInit {
  inventory_data:any;invertoryData:any;
  assetTableOptions: DataTables.Settings = {};
  assetTableTrigger: Subject<any> = new Subject();
  constructor(private router:Router,private api:AssetsService)
  {
    this.assetTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.api.getAllInventory().subscribe(res => {
      this.inventory_data=res;
      this.invertoryData=this.inventory_data.inventories_data;
      this.assetTableTrigger.next();
      }, (err) => {
        alert(err.error);
        });
  }

  ngOnInit() {
  }

}
