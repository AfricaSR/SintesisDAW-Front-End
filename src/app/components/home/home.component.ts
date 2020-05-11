import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['currentUser']){
      this.userAuthService.getHome({token: localStorage['currentUser']}).subscribe(resp => {
        if (resp['token']){
          this.router.navigate(['home'])
        }
      });
    }else {
        this.router.navigate([''])
    }
    
  }

}
