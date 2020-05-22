import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../models/event';
import { UserAuthService } from '../../../../services/user-auth.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-my-invitation',
  templateUrl: './my-invitation.component.html',
  styleUrls: ['./my-invitation.component.css']
})
export class MyInvitationComponent implements OnInit {
  public event: Event = new Event;
  constructor(private route: ActivatedRoute, private userAuthService: UserAuthService) { }
  idAttend: Number;
  ngOnInit(): void {
    if (this.route.snapshot.queryParams['At']!=undefined){
      this.idAttend = this.route.snapshot.queryParams['At']
    
      this.userAuthService.getEventNonCreated(localStorage['currentUser'], this.route.snapshot.params.id).subscribe(res => {
        this.event = res['event'] as Event;
      })
    }
    
    
  }

}
