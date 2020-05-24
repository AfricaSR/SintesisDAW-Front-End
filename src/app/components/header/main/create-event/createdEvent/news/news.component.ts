import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../../../../../services/user-auth.service';
import { SocketService } from '../../../../../../services/socket.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() News: any[];
  @Input() makingNews: Boolean;

  @Output() makingNewsChange = new EventEmitter<Boolean>();
  @Input() idEvent: Number;
  @Output() NewsChange = new EventEmitter<any[]>();
  form: FormGroup;

  
  constructor(public fb: FormBuilder, public userAuthService: UserAuthService, private socketService: SocketService) {
  
    this.form = this.fb.group({
      News: this.fb.array([]),
    });

  }

  ngOnInit(): void {

  }

  addNew() {
    this.makingNews = true;
    this.makingNewsChange.emit(this.makingNews);
    const News = this.form.controls.News as FormArray;
    News.push(this.fb.group({
      title: new FormControl(''),
      body: new FormControl(''),
    }));
  }

  saveNew(form: FormGroup) {

    this.userAuthService.postNews(localStorage['currentUser'], this.idEvent, form.controls[0].value['title'], form.controls[0].value['body']).subscribe(res => {
      this.News = res['News'] as any[];
      this.NewsChange.emit(this.News)
    })

    

    this.makingNews = false;
    this.makingNewsChange.emit(this.makingNews)

  }

}