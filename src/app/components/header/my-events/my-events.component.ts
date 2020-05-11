import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../../services/user-auth.service';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['currentUser']){
      this.userAuthService.getHome({token: localStorage['currentUser']}).subscribe(resp => {
        if (resp['token']){
          this.router.navigate(['home/mis-eventos'])
        }
      });
    }else {
        this.router.navigate([''])
    }
}
}
