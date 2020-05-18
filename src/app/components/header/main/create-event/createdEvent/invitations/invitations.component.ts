import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EventInvitations, Invitation, I_Wellness, I_Response } from '../../../../../../models/event-invitations'
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Wellness } from '../../../../../../models/wellness';
import { UserAuthService } from '../../../../../../services/user-auth.service';
import { find, get, pull } from 'lodash';
import { InvitationComponent } from './invitation/invitation.component';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  @ViewChild('newInvitations') newInvitation: ElementRef;
  @Input() Invitations: EventInvitations;
  @Input() editInvitation: Boolean;
  @Input() codeInv: String;
  @Output() editInvitationChange = new EventEmitter<Boolean>();
  @Output() invitationsChange = new EventEmitter<EventInvitations>();
  invitationsList: Invitation[];
  form: FormGroup;
  auxSur: String = '';
  isAdding: Boolean = false;
  auxHasValue: Boolean = false;

  //*************** */
    tagsA: string[] = [];
    tagsF: string[] = [];
    formA: FormGroup;
    formF: FormGroup;
    Allergenics: Array<Wellness>;
    Functionality: Array<Wellness>;
  //*************** */

  constructor(public fb: FormBuilder, public fbW: FormBuilder, public userAuthService: UserAuthService) {
    this.form = this.fb.group({
      invitations: this.fb.array([]),
    });
    this.formA = this.fbW.group({
      wellness: this.fbW.array([]),
    });
    this.formF = this.fbW.group({
      wellness: this.fbW.array([]),
    });
    this.formA = this.fb.group({
      tagA: [undefined]
    });
    this.formF = this.fb.group({
      tagF: [undefined]
    });

  }

  ngOnInit(): void {

    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();
    
    this.userAuthService.getWellnessAList().subscribe(res => {
      this.Allergenics = res['wellnessList'] as Array<Wellness>
      let head = new Wellness();
      head.name = "Añadir Alérgeno"
      this.Allergenics.unshift(head);
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      this.Functionality = res['wellnessList'] as Array<Wellness>
      let head = new Wellness();
      head.name = "Añadir Diversidad"
      this.Functionality.unshift(head);
    });

  }

  tagsAChange(tagsA: string[]){
    this.tagsA = tagsA;
  }

  tagsFChange(tagsF: string[]){
    this.tagsF = tagsF;
  }

  formSave(form: FormGroup){

    if (this.editInvitation){

      form.controls[0].value['alergenics'] = this.tagsA;
      form.controls[0].value['functionality'] = this.tagsF;
      this.auxSur = form.controls[0].value['surname'];
      this.auxHasValue = true;
      this.userAuthService.putEventInvitation(
        localStorage['currentUser'], 
        this.Invitations.idEvent, 
        form.controls[0].value).subscribe(res => {
          this.Invitations = res as EventInvitations;
          this.invitationsChange.emit(this.Invitations);
          this.editInvitationChange.emit(false)
        })
        
  
      //console.log(form.controls[0].value)
      this.form = this.fb.group({
        invitations: this.fb.array([]),
      });
      this.tagsA = [];
      this.tagsF = [];
      this.isAdding = false;

    }else {

      form.controls[0].value['code'] = this.makeRandom();
      form.controls[0].value['alergenics'] = this.tagsA;
      form.controls[0].value['functionality'] = this.tagsF;
      this.auxSur = form.controls[0].value['surname'];
      this.auxHasValue = true;
      this.userAuthService.postNewInvitation(
        localStorage['currentUser'], 
        this.Invitations.idEvent, 
        form.controls[0].value).subscribe(res => {
          this.Invitations = res as EventInvitations;
          this.invitationsChange.emit(this.Invitations);
        })
        
  
      //console.log(form.controls[0].value)
      this.form = this.fb.group({
        invitations: this.fb.array([]),
      });
      this.tagsA = [];
      this.tagsF = [];
      this.isAdding = false;
    }
  }

  addInvitation() {
    this.isAdding = true;
    const creds = this.form.controls.invitations as FormArray;
    creds.push(this.fb.group({
      code: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      confirmed: new FormControl(false),
      member: new FormControl(false),
      alergenics: new FormControl([]),
      functionality: new FormControl([]),
      responses: new FormControl('')
    }));

  }

  addWithSurname() {
    this.isAdding = true;
    const creds = this.form.controls.invitations as FormArray;
    creds.push(this.fb.group({
      code: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(this.auxSur),
      confirmed: new FormControl(false),
      member: new FormControl(false),
      alergenics: new FormControl([]),
      functionality: new FormControl([]),
      responses: new FormControl('')
    }));
  }

  editInvitationData(_id: String, code: String, name: String, surname: String, confirmed: Boolean, member: Boolean, alergenics: string[], functionality: string[], responses: any) {
    this.isAdding = true;
    this.tagsAChange(alergenics)
    this.tagsFChange(functionality)
    const creds = this.form.controls.invitations as FormArray;
    creds.push(this.fb.group({
      _id: new FormControl(_id),
      code: new FormControl(code),
      name: new FormControl(name),
      surname: new FormControl(surname),
      confirmed: new FormControl(confirmed),
      member: new FormControl(member),
      alergenics: new FormControl(alergenics),
      functionality: new FormControl(functionality),
      responses: new FormControl(responses)
    }));

  }

  makeRandom() {
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let lengthOfCode = 6;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  addTagA(tagA: string): void {
    if (tagA[tagA.length - 1] === ',' || tagA[tagA.length - 1] === ' ') {
      tagA = tagA.slice(0, -1);
    }
    if (tagA.length > 0 && !find(this.tagsA, tagA)) {
      this.tagsA.push(tagA);
    }
  }

  addTagF(tagF: string): void {
    if (tagF[tagF.length - 1] === ',' || tagF[tagF.length - 1] === ' ') {
      tagF = tagF.slice(0, -1);
    }
    if (tagF.length > 0 && !find(this.tagsF, tagF)) {
      this.tagsF.push(tagF);
    }
  }


  pushSelectA(tagA: string) {
    this.addTagA(tagA)
  }

  pushSelectF(tagF: string) {
    this.addTagF(tagF)
  }

}
