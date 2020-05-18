import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EventInvitations, Invitation, I_Wellness, I_Response } from '../../../../../../../models/event-invitations'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Wellness } from '../../../../../../../models/wellness';
import { UserAuthService } from '../../../../../../../services/user-auth.service';
import { find, get, pull } from 'lodash';
//[Invitations]="eventInvitations"
@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent {

  @Input() form: FormGroup;
  @Input() fb: FormBuilder;
  @Input() isAdding: Boolean;
  @Input() editInvitation: Boolean;
  @Output() editInvitationChange = new EventEmitter<Boolean>();
  @Output() isAddingChange = new EventEmitter<boolean>();
  @Output() formSave = new EventEmitter<FormGroup>();

//*************** */
@ViewChild('tagInputA') tagInputRefA: ElementRef;
@ViewChild('tagInputF') tagInputRefF: ElementRef;
@Input() tagsA: string[] = [];
@Input() tagsF: string[] = [];
@Output() tagsAChange = new EventEmitter<string[]>();
@Output() tagsFChange = new EventEmitter<string[]>();
@Input() formA: FormGroup;
@Input() formF: FormGroup;
@Input() fbW: FormBuilder;
//*************** */


  constructor() {

  }

  saveItem() {
    const creds = this.form.controls.invitations as FormGroup;
    this.tagsAChange.emit(this.tagsA)
    this.tagsFChange.emit(this.tagsF)
    this.formSave.emit(creds);
  }

  editItem() {
    const creds = this.form.controls.invitations as FormGroup;
    this.tagsAChange.emit(this.tagsA)
    this.tagsFChange.emit(this.tagsF)

    this.formSave.emit(creds);
    this.editInvitationChange.emit(false)
  }

  removeItem() {
    const creds = this.form.controls.invitations as FormArray;
    creds.removeAt(creds.length - 1);
    this.tagsAChange.emit(new Array)
    this.tagsFChange.emit(new Array)
    this.isAddingChange.emit(false);
  }


  removeTagA(tagA?: string): void {
    if (!!tagA) {
      pull(this.tagsA, tagA);
    } else {
      this.tagsA.splice(-1);
    }
  }

  removeTagF(tagF?: string): void {
    if (!!tagF) {
      pull(this.tagsF, tagF);
    } else {
      this.tagsF.splice(-1);
    }
  }


}
