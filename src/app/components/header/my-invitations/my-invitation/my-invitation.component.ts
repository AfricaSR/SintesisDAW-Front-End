import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../models/event';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../../../services/user-auth.service';
import { SocketService } from '../../../../services/socket.service';
import { ActivatedRoute } from "@angular/router";
import { User } from '../../../../models/user';
@Component({
  selector: 'app-my-invitation',
  templateUrl: './my-invitation.component.html',
  styleUrls: ['./my-invitation.component.css']
})
export class MyInvitationComponent implements OnInit {
  public event: Event = new Event;
  Questions: any[] = new Array<any>();
  Responses: any[] = new Array<any>();
  emptyResponses: any[] = new Array<any>();
  form: FormGroup;
  currentUser: User = new User();
  hasQuestions: Boolean = false;
  constructor(public fb: FormBuilder, 
    private route: ActivatedRoute, 
    private userAuthService: UserAuthService, 
    private socketService: SocketService) { 
      this.form = this.fb.group({
        answers: this.fb.array([]),
      });
    }
  idAttend: Number;
  ngOnInit(): void {
    if (this.route.snapshot.queryParams['At']!=undefined){
      this.idAttend = this.route.snapshot.queryParams['At']

      this.userAuthService
    .getUserProfile({token: localStorage['currentUser']})
    .subscribe(res => {
      this.currentUser.name = res['name'];
      this.currentUser.surname = res['surname']; 
    })
    
      this.userAuthService.getEventNonCreated(localStorage['currentUser'], this.route.snapshot.params.id).subscribe(res => {
        this.event = res['event'] as Event;

        
        this.userAuthService.getResponses(localStorage['currentUser'], this.event['idEvent']).subscribe(resp => {
          this.Questions = resp as any[];
          
          const Questions = this.form.controls.answers as FormArray;
          this.Questions.forEach(e => {
            if (e['answer'] == "") {
              this.hasQuestions = true;
              Questions.push(this.fb.group({
                question: new FormControl({value: e['question'], disabled: true}),
                answer: new FormControl(''),
              }));
            }else {
              let r = {
                question: e['question'],
                answer: e['answer']['answer']
              }

              this.Responses.push(r)
            }
          })
        })

      })

    }
    
  }

  saveResponses() {
    const Answers = this.form.controls.answers as FormGroup;
    let num = Answers.controls['length'] as unknown as number;

    let responses = new Array<any>();

    for (let i = 0; i < num; i++) {
      if (Answers.controls[i]['controls']['answer'].value != ""){
        let r = {
          question: Answers.controls[i]['controls']['question'].value,
          idAttend: this.idAttend,
          name: this.currentUser.name,
          surname: this.currentUser.surname,
          answer: Answers.controls[i]['controls']['answer'].value
        }

        responses.push(r)
      }

    }
    this.userAuthService.postResponses(localStorage['currentUser'], this.event.idEvent, responses).subscribe(res => {
      console.log(res)


    })

    this.socketService.postResponse(this.event.host, this.event.title, this.currentUser.name, this.currentUser.surname).subscribe()
  }

}
