import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../../services/user-auth.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['currentUser']){
      this.userAuthService.getHome({token: localStorage['currentUser']}).subscribe(resp => {
        if (resp['token']){
          this.router.navigate(['home/perfil'])
        }
      });
    }else {
        this.router.navigate([''])
    }
    
  }

}
