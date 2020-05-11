import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['currentUser']){
      this.userAuthService.getHome({token: localStorage['currentUser']}).subscribe(resp => {
        if (resp['token']){
          localStorage.clear();
          this.router.navigate([''])
        }
      });
    }else {
        this.router.navigate([''])
    }
  }

}
