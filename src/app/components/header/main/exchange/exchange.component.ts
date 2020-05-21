import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event } from '../../../../models/event';
import { EventInvitations } from '../../../../models/event-invitations';
import { UserAuthService } from '../../../../services/user-auth.service';
import { FormControl } from '@angular/forms';
import { User } from '../../../../models/user';
import { Wellness } from '../../../../models/wellness';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  @ViewChild('userVerify') userVerify: ElementRef;
  foudInvitation: Boolean = false;
  currentUser: User = new User;
  event: Event = new Event;
  userWellness: Array<any>;
  Allergenics: Array<Wellness>;
  Functionality: Array<Wellness>;
  code: String;
  declaration: String = "Sí, asístiré al evento";
  confirm: Boolean = true;

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService
    .getUserProfile({token: localStorage['currentUser']})
    .subscribe(res => {
      this.currentUser.idUser = res['idUser'];
      this.currentUser.name = res['name'];
      this.currentUser.surname = res['surname'];
      this.currentUser.dateBirth = res['dateBirth'];
      if (res['gender']=='F'){
        this.currentUser.gender = 'Mujer'
      }else if (res['gender']=='M'){
        this.currentUser.gender = 'Hombre'
      }else {
        this.currentUser.gender = 'Otro'
      }
    })
    this.userWellness = new Array<any>();
    this.userAuthService.getUserWellness({token: localStorage['currentUser']}).subscribe(res => {
      res['wellnessList'].forEach(e => {
        this.userWellness.push(e)
      });
    })
    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();
    
    this.userAuthService.getWellnessAList().subscribe(res => {
      this.Allergenics = res['wellnessList'] as Array<Wellness>
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      this.Functionality = res['wellnessList'] as Array<Wellness>
    });
    
  }

  onClickSubmit(userExchange: any) {
    this.code = userExchange['invitacion'];
    this.userAuthService.getEventInvitation(localStorage['currentUser'], userExchange['evento'], userExchange['invitacion']).subscribe(res => {
      if (res['ei']){
        this.foudInvitation = true;
        
        this.userAuthService.getEventNonCreated(localStorage['currentUser'], res['ei']['idEvent']).subscribe(resp => {
          this.event = resp['event'] as Event;
          
        });
      }
    })
 };

 onClickSubmitVerify(userVerify: any) {

    this.userAuthService.exchangeInvitation(
      localStorage['currentUser'],
      this.event.idEvent,
      'Asistente',
      this.code,
      this.confirm
      ).subscribe(res => {
        console.log(res)
      })

 }

 changeDeclaration() {
   this.confirm = !this.confirm;
   if (!this.confirm){
     this.declaration = "No asistiré"
   }else {
    this.declaration = "Sí, asístiré al evento"
   }
 }

}
