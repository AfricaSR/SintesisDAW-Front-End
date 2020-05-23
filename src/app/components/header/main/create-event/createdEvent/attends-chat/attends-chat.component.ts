import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { SocketService } from '../../../../../../services/socket.service';
import { UserAuthService } from '../../../../../../services/user-auth.service';
import { User } from '../../../../../../models/user';
import *  as $ from 'jquery';
import * as io from "socket.io-client";
import { isUndefined } from 'util';
@Component({
  selector: 'app-attends-chat',
  templateUrl: './attends-chat.component.html',
  styleUrls: ['./attends-chat.component.css']
})
export class AttendsChatComponent implements OnInit, AfterViewInit {
  chats: any[] = new Array<any>();
  messages: any[] = new Array<any>();
  selectedChat;
  @Input() idEvent: Number;
  @ViewChild('msg') inputText: ElementRef;
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  private items = [];
  public socket;
  user: User = new User();
  idAttend: Number = 0;
  constructor(private socketService: SocketService, private userAuthService: UserAuthService) { }
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    

    this.items.push({});
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0
    });
  }

  ngOnInit(): void {

    this.userAuthService.getUserProfile({ token: localStorage['currentUser'] }).subscribe(res => {
      this.user = res as User;

      this.socketService.getChats(localStorage['currentUser'], this.idEvent).subscribe(res => {

        this.chats = res['chats'] as any[];

      })

    });

  }

  sendMessage(msg: String) {
    if (msg != '' && msg != null && msg != undefined) {
      let message = {
        role: 'Anfitrión',
        name: this.user.name,
        surname: this.user.surname,
        idEvent: this.idEvent,
        idAttend: this.idAttend,
        message: msg,
        createdAt: new Date()
      }
      this.inputText.nativeElement.value = "";
      this.socketService.sendMessage(this.idEvent, this.idAttend, message).subscribe().closed
  }
}

  expandChat(idAttend: Number) {
    
    if (!isUndefined(this.selectedChat)){
      $(this.selectedChat).removeClass('active_chat')
      this.selectedChat = $('#'+this.chats.find(x => x.idAttend == idAttend)['_id'])
      $(this.selectedChat).addClass('active_chat')
    }else {
      this.selectedChat = $('#'+this.chats.find(x => x.idAttend == idAttend)['_id'])
      $(this.selectedChat).addClass('active_chat')
    }
    this.scrollToBottom();

    this.idAttend = idAttend;
    this.messages = this.chats.find(x => x.idAttend == idAttend)['messages']
    this.socket = io('http://localhost:3000', { query: { idEvent: [this.idEvent, this.idAttend, true] } })  
  
    this.socket.on('viewed', msg => {

      this.messages = msg['chats'].find(x => x.idAttend == idAttend)['messages'];

    })

    this.socket.on('sendMessage', () => {
      this.socketService.getChats(localStorage['currentUser'], this.idEvent).subscribe(res => {

        this.messages = res['chats'].find(x => x.idAttend == this.idAttend)['messages']
        this.scrollToBottom();

    })
  })
  
  }

}
