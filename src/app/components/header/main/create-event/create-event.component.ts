import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationExtras } from "@angular/router";
import { UserAuthService } from '../../../../services/user-auth.service';
import { Event } from '../../../../models/event';
import { EventInvitations } from '../../../../models/event-invitations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  time = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  createEvent: Boolean = false;
  currentEvent: Event;
  eventList: Array<Event>;
  hasEvents: Boolean;

  constructor(private userAuthService: UserAuthService, private router: Router, public modal: NgbModal) {
  }

  ngOnInit(): void {
    this.eventList = new Array<Event>();
    this.userAuthService.getEventListCreated({token: localStorage['currentUser']}).subscribe(res => {
      
      if (res['length']>0){
        this.hasEvents = true;
        this.eventList = res as Event[];
      }else {
        this.hasEvents = false;

      }

      this.eventList.forEach(e => {
        this.userAuthService.getEventInvitations(localStorage['currentUser'], e.idEvent).subscribe(res => {
          e['invitados'] = res['invitations'].length;
          e['asistentes'] = res['invitations'].filter((obj) => obj['confirmed'] === true).length;
        })
      })
      
    })
  }
  displayEventData(idEvent){
    
    this.router.navigate(['home/creaciones/'+idEvent])
  }

  selectDay(dp: any, tp: any) {

    this.currentEvent.date = {
      year: dp.model.selectedDate.year,
      month: dp.model.selectedDate.month-1,
      day: dp.model.selectedDate.day,
      hour: tp.model.hour,
      minute: tp.model.minute
    }

  }

  selectHour(dp: any, tp: any) {

    this.currentEvent.date = {
      year: dp.model.selectedDate.year,
      month: dp.model.selectedDate.month-1,
      day: dp.model.selectedDate.day,
      hour: tp.model.hour+2,
      minute: tp.model.minute
    }

  }

  createNewEvent(){
    this.currentEvent = new Event();
    this.currentEvent.code = this.makeRandom();
    let d = new Date();
    this.currentEvent.date = {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
      hour: d.getHours(),
      minute: d.getMinutes()
    };
    this.createEvent = true;
  }

  saveNewEvent() {
    
    this.userAuthService.postNewEvent(localStorage['currentUser'], this.currentEvent).subscribe(res => {
      const opts = {
        windowClass: 'myCustomClass'
      }

      let response;

      if (res['msg']){
        response = { 'Felicitaciones' : res['msg'] };
      }else if (res['error']){
        response = { 'Ha ocurrido un error' : res['error'] };
      }
      const resp = this.modal.open(ModalComponent, opts)
      resp.componentInstance.closeModal = () => {
        resp.close();
      }
      resp.componentInstance.titulo = Object.keys(response).toString();
      resp.componentInstance.mensaje = response[resp.componentInstance.titulo];
    });
    this.createEvent = false;
  }

  cancelNewEvent() {
    this.currentEvent = null;
    this.createEvent = false;
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

}
