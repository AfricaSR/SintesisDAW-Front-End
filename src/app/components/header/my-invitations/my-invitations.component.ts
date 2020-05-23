import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router, NavigationExtras } from "@angular/router";
@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router) { }
  Events: any[] = new Array<any>();
  ngOnInit(): void {
    this.userAuthService.getDashboardTimeline({token: localStorage['currentUser']}).subscribe(res => {

      this.Events = res as any[];

      this.Events.forEach(e => {
        if (e.closed) {
          e['detail']="Cerrado";
        }else {
          e['detail']="Abierto";
        }
      });
      

    })
  }

  displayEventData(idEvent){
    let idAttend = this.Events.find(e => e['idEvent'] == idEvent)['idAttend']
    
    this.router.navigate(['home/mis-invitaciones/'+idEvent], { queryParams: { At: idAttend } })
  }

}
