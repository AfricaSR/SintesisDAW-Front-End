import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  News: any[] = new Array<any>();
  hasNews: Boolean = false;

  Events: any[] = new Array<any>();
  hasEvents: Boolean = false;
  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.userAuthService.getDashboardNews({token: localStorage['currentUser']}).subscribe(res => {
      this.News = res['news'] as any[];
      if (this.News.length > 0) {
        this.hasNews = true;
      }
    })

    this.userAuthService.getDashboardTimeline({token: localStorage['currentUser']}).subscribe(res => {

      this.Events = res as any[];

      if (this.Events.length > 0) {
        this.hasEvents = true;
        this.Events.forEach(e => {

          let firstDate = moment(e.date);
          let secondDate = moment(new Date());
          let diffInDays = Math.abs(firstDate.diff(secondDate, 'days')); 
          if (diffInDays == 1){
            e['remains'] = diffInDays + ' día';
          }else {
            e['remains'] = diffInDays + ' días';
          }
          
  
        })
      }

      
    })
    
  }


}
