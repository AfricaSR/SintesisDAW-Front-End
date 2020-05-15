import { Component, OnInit, Input } from '@angular/core';
import { EventInvitations, Invitation, I_Wellness, I_Response } from '../../../../../../models/event-invitations'
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  @Input() Invitations: EventInvitations[];

  constructor() { }

  ngOnInit(): void {
  }

}
