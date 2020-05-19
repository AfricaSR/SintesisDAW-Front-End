import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() fb: FormBuilder;
  @Input() makingNews: Boolean;
  @Output() formSave = new EventEmitter<FormGroup>();
  @Output() makingNewsChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  saveItem() {
    const News = this.form.controls.News as FormGroup;
    this.formSave.emit(News);
  }

  addNew() {
    const News = this.form.controls.News as FormArray;
    News.push(this.fb.group({
      title: new FormControl(''),
      body: new FormControl(''),
    }));
  }

}
