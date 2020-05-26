import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() fb: FormBuilder;
  @Input() makingQuestions: Boolean;
  @Output() formSave = new EventEmitter<FormGroup>();
  @Output() makingQuestionsChange = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  saveItem() {
    const questions = this.form.controls.questions as FormGroup;
    this.formSave.emit(questions);
    this.makingQuestions = false;
    this.makingQuestionsChange.emit(this.makingQuestions)
  }

  addQuestion() {
    const questions = this.form.controls.questions as FormArray;
    questions.push(this.fb.group({
      question: new FormControl(''),
    }));
    this.makingQuestions = true;
    this.makingQuestionsChange.emit(this.makingQuestions)
  }

  cancelQuestion() {
    const creds = this.form.controls.questions as FormArray;
    creds.removeAt(creds.length - 1);
    this.makingQuestions = false;
    this.makingQuestionsChange.emit(this.makingQuestions)
  }


}
