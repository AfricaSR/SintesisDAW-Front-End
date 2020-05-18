import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../models/event';
import { UserAuthService } from '../../../../../services/user-auth.service';
import { ActivatedRoute } from "@angular/router";
import { EventInvitations, Invitation } from '../../../../../models/event-invitations'

@Component({
  selector: 'app-created-event',
  templateUrl: './created-event.component.html',
  styleUrls: ['./created-event.component.css']
})
export class CreatedEventComponent implements OnInit {

    public event: Event = new Event;
    eventInvitations = new EventInvitations;
    editInvitation: Boolean = false;
    codeInv: String = '';

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

  editItem(code: String, appInvitations: any){
    let inv = new Invitation();
    inv = this.eventInvitations.invitations.find(x => x.code == code);
    appInvitations.editInvitationData(inv['_id'], inv.code, inv.name, inv.surname, inv.confirmed, inv.member, inv.alergenics, inv.functionality, inv.Responses);
    this.codeInv = code;
    this.editInvitation = true;
  }

  editInvitationChange(edit: Boolean){
    this.editInvitation = edit;
  }

  removeItem(code: String) {
    this.userAuthService.deleteEventInvitation(
      localStorage['currentUser'], 
      this.eventInvitations.idEvent, 
      code).subscribe(res => {
        this.eventInvitations = res as EventInvitations;
    })
  }



}
