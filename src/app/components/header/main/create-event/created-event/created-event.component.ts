import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../models/event';
import { UserAuthService } from '../../../../../services/user-auth.service';
import { ActivatedRoute } from "@angular/router";
import { EventInvitations } from '../../../../../models/event-invitations'

@Component({
  selector: 'app-created-event',
  templateUrl: './created-event.component.html',
  styleUrls: ['./created-event.component.css']
})
export class CreatedEventComponent implements OnInit {

    public event: Event = new Event;
    eventInvitations = new EventInvitations;

    public constructor(private route: ActivatedRoute, private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    
    this.userAuthService.getEventCreated(localStorage['currentUser'], this.route.snapshot.params.id).subscribe(res => {
      
      this.event = res['event'] as Event;

      this.eventInvitations = res['ei'] as EventInvitations;
      
    });

  }

  getNewInvitations(ei: EventInvitations){
      this.eventInvitations = ei as EventInvitations;
  }

}
