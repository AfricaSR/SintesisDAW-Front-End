import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../../services/user-auth.service';
@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage['currentUser']){
      this.userAuthService.getHome({token: localStorage['currentUser']}).subscribe(resp => {
        if (resp['token']){
          this.router.navigate(['home/bienestar'])
        }
      });
    }else {
        this.router.navigate([''])
    }
    
  }

}
