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

  removeItem() {
    const creds = this.form.controls.invitations as FormArray;
    creds.removeAt(creds.length - 1);
    this.tagsAChange.emit(new Array)
    this.tagsFChange.emit(new Array)
    this.isAddingChange.emit(false);
  }

  focusTagInputA(): void {
    this.tagInputRefA.nativeElement.focus();
  }


  focusTagInputF(): void {
    this.tagInputRefF.nativeElement.focus();
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


  /*
  @Input() Invitations: EventInvitations;
  @ViewChild('tagInputA') tagInputRefA: ElementRef;
  @ViewChild('tagInputF') tagInputRefF: ElementRef;
  tagsA: string[] = [];
  tagsF: string[] = [];
  formA: FormGroup;
  formF: FormGroup;

  form: FormGroup;

  Allergenics: Array<Wellness>;
  Functionality: Array<Wellness>;


  constructor(public userAuthService: UserAuthService, public fb: FormBuilder) {
    this.form = this.fb.group({
      Invitations: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.formA = this.fb.group({
      tagA: [undefined]
    });
    this.formF = this.fb.group({
      tagF: [undefined]
    });

    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();
    
    this.userAuthService.getWellnessAList().subscribe(res => {
      this.Allergenics = res['wellnessList'] as Array<Wellness>
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      this.Functionality = res['wellnessList'] as Array<Wellness>
    });
    
  }

  
  focusTagInputA(): void {
    this.tagInputRefA.nativeElement.focus();
  }

  focusTagInputF(): void {
    this.tagInputRefF.nativeElement.focus();
  }

  onKeyUpA(event: KeyboardEvent): void {
    const inputValue: string = this.formA.controls.tagA.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTagA();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTagA(inputValue);
        this.formA.controls.tagA.setValue('');
      }
    }
  }

  onKeyUpF(event: KeyboardEvent): void {
    const inputValue: string = this.formF.controls.tagF.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTagF();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTagF(inputValue);
        this.formF.controls.tagF.setValue('');
      }
    }
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

  pushSelectA(tagA: string) {
    this.addTagA(tagA)
  }

  pushSelectF(tagF: string) {
    this.addTagF(tagF)
  }

*/
}
