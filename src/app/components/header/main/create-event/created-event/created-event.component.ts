import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../models/event';
import { UserAuthService } from '../../../../../services/user-auth.service';
import { ActivatedRoute } from "@angular/router";
import { EventInvitations, Invitation } from '../../../../../models/event-invitations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from '../../../../../services/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../../modal/modal.component';
@Component({
  selector: 'app-created-event',
  templateUrl: './created-event.component.html',
  styleUrls: ['./created-event.component.css']
})
export class CreatedEventComponent implements OnInit {

    public event: Event = new Event;
    private editedEvent: Event;
    model: NgbDateStruct = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    };

    date: {year: number, month: number};
    time = {hour: new Date().getHours(), minute: new Date().getMinutes()};
    eventInvitations = new EventInvitations;
    editInvitation: Boolean = false;
    editEvent: Boolean = false;
    codeInv: String = '';
    makingQuestions: Boolean = false;
    makingNews: Boolean = false;
    Questions: any[] = new Array<any>();
    News: any[] = new Array<any>();
    numInvitados: Number = 0;
    form: FormGroup;
    public constructor(private route: ActivatedRoute, 
      private userAuthService: UserAuthService, 
      public fb: FormBuilder,    
      public modal: NgbModal,
      private socketService: SocketService) {
        
      }

  ngOnInit(): void {
    
    this.userAuthService.getEventCreated(localStorage['currentUser'], this.route.snapshot.params.id).subscribe(res => {
      
      this.event = res['event'] as Event;
      
      let d = new Date(this.event.date)

      this.model.year = d.getFullYear();
      this.model.month = d.getMonth(); 
      this.model.day = d.getDate();
      this.time.hour = d.getHours();
      this.time.minute = d.getMinutes();

      this.eventInvitations = res['ei'] as EventInvitations;

      this.numInvitados = this.eventInvitations.invitations.length;

      this.userAuthService.getQuestions(localStorage['currentUser'], res['event']['idEvent']).subscribe(resp => {
        this.Questions = resp['questions'] as any[];
        this.Questions.forEach(e => {
          e['respuestas'] = e['answers'].length
          e['sin'] = this.eventInvitations.invitations.length - e['respuestas'];
        })
      })

      this.userAuthService.getNews(localStorage['currentUser'], res['event']['idEvent']).subscribe(resp => {
        this.News = resp['News'] as any[];
        
      })
      
    });

    

  }

  selectYearMonth(dp: any, tp: any) {
    this.model.year = dp.model.focusDate.year;
    this.model.month = dp.model.focusDate.month;
    this.model.day = dp.model.selectedDate.day;

    this.time = {
      hour: tp.model.hour,
      minute: tp.model.minute
    }
  }

  selectHour(dp: any, tp: any) {

    this.model.year = dp.model.focusDate.year;
    this.model.month = dp.model.focusDate.month;
    this.model.day = dp.model.selectedDate.day;
    
    this.time = {
      hour: tp.model.hour,
      minute: tp.model.minute
    }
    
  }

  getNewInvitations(ei: EventInvitations){
      this.eventInvitations = ei as EventInvitations;
  }

  editItem(code: String, appInvitations: any){
    let inv = new Invitation();
    inv = this.eventInvitations.invitations.find(x => x.code == code);
    appInvitations.editInvitationData(inv['_id'], inv.code, inv.name, inv.surname, inv.confirmed, inv.member, inv.alergenics, inv.functionality);
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

  makeQuestion() {
    this.makingQuestions = true;

  }

  reciveQuestion(q: Boolean) {
    this.makingQuestions = false;
  }

  makeNews() {
    this.makingNews = true;

  }

  reciveNews(n: Boolean) {
    this.makingNews = false;
  }

  editingEvent() {

    this.editedEvent = this.event;
    
    this.form = this.fb.group({
          title: new FormControl(this.editedEvent.title),
          description: new FormControl(this.editedEvent.description),
          location: new FormControl(this.editedEvent.location),
          street: new FormControl(this.editedEvent.street),
          postalCode: new FormControl(this.editedEvent.postalCode) 
    });
    this.editEvent = !this.editEvent;
  }

  cancelEditEvent() {

    this.event.date = this.checkDate(this.event.date)
    this.form = null;
    this.editEvent = !this.editEvent;
  }

  saveEditEvent() {
    this.editedEvent.date = this.event.date;

    this.editedEvent.date = {
      year: this.model.year,
      month: this.model.month-1,
      day: this.model.day,
      hour: this.time.hour,
      minute: this.time.minute
    };

    
    
    this.event.date = this.checkDate(this.editedEvent.date)
    this.editedEvent.title = this.form.controls['title'].value;
    this.editedEvent.description = this.form.controls['description'].value;
    this.editedEvent.location = this.form.controls['location'].value;
    this.editedEvent.street = this.form.controls['street'].value;
    this.editedEvent.postalCode = this.form.controls['postalCode'].value;

    

    this.userAuthService.editEvent(localStorage['currentUser'], this.editedEvent).subscribe(res => {
      this.event = res as Event;
      this.socketService.postEditEvent(this.event.idEvent, this.event.title).subscribe(res => {
        if (res['msg']) {
          const opts = {
            windowClass: 'myCustomClass'
          }
    
          let response = {
            'FELICITACIONES': 'Evento editado correctamente'
          }
          const resp = this.modal.open(ModalComponent, opts)
          resp.componentInstance.closeModal = () => {
            resp.close();
          }
          resp.componentInstance.titulo = Object.keys(response).toString();
          resp.componentInstance.mensaje = response[resp.componentInstance.titulo];
        }
      })
    })

    this.editEvent = !this.editEvent;
  }

  checkDate(input){

    let year = parseInt(input['year'], 10);
    let month = parseInt(input['month']);
    let day = parseInt(input['day'], 10);
    let hour = parseInt(input['hour'], 10);
    let minute = parseInt(input['minute'], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
        return NaN;
    }

    if (year < 100) {
        year += 2000;
    }

    let d = new Date(year, month, day, hour, minute);
    return d;
}



}
