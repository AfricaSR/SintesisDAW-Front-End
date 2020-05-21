import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../../../../../services/user-auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() Questions: any[];
  @Input() makingQuestions: Boolean;
  @Input() numInvitados: Number;
  @Output() makingQuestionsChange = new EventEmitter<Boolean>();
  @Input() idEvent: Number;
  @Output() QuestionsChange = new EventEmitter<any[]>();
  form: FormGroup;

  
  constructor(public fb: FormBuilder, public userAuthService: UserAuthService) {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });

  }

  ngOnInit(): void {

  }

  addQuestion() {
    this.makingQuestions = true;
    this.makingQuestionsChange.emit(this.makingQuestions);
    const questions = this.form.controls.questions as FormArray;
    questions.push(this.fb.group({
      question: new FormControl(''),
    }));
  }

  saveQuestion(form: FormGroup) {

    this.userAuthService.postQuestion(localStorage['currentUser'], this.idEvent, form.controls[0].value['question']).subscribe(res => {
      this.Questions = res['questions'] as any[];
      this.Questions.forEach(e => {
        e['respuestas'] = e['answers'].length;
        e['sin'] = this.numInvitados;
      })
      this.QuestionsChange.emit(this.Questions)
      this.makingQuestions = false;
      this.makingQuestionsChange.emit(this.makingQuestions)
    })

  }

}