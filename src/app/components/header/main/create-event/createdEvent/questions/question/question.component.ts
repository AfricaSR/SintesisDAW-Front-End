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
  @Output() makingQuestionsChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  saveItem() {
    const questions = this.form.controls.questions as FormGroup;
    this.formSave.emit(questions);
  }

  addQuestion() {
    const questions = this.form.controls.questions as FormArray;
    questions.push(this.fb.group({
      question: new FormControl(''),
    }));
  }

}
