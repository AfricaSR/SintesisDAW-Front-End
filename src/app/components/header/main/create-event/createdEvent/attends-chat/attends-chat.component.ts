import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { SocketService } from '../../../../../../services/socket.service';
import { UserAuthService } from '../../../../../../services/user-auth.service';
import { User } from '../../../../../../models/user';
@Component({
  selector: 'app-attends-chat',
  templateUrl: './attends-chat.component.html',
  styleUrls: ['./attends-chat.component.css']
})
export class AttendsChatComponent implements OnInit {
  chats: any[] = new Array<any>();
  messages: any[] = new Array<any>();
  @Input() idEvent: Number;
  @ViewChild('msg') inputText: ElementRef;
  public socket;
  user: User = new User();
  constructor(private socketService: SocketService, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.userAuthService.getUserProfile({ token: localStorage['currentUser'] }).subscribe(res => {
      this.user = res as User;

      this.socketService.getChats(localStorage['currentUser'], this.idEvent).subscribe(res => {
        console.log(res)
      })
/*
      this.socket = io('http://localhost:3000', { query: { idEvent: [this.idEvent, this.idAttend] } })

      this.socket.on('messages', msg => {
        this.messages = msg['messages'];

      })

      this.socket.on('sendMessage', msg => {
        this.messages = msg['messages'];

      })*/

    });

  }

  sendMessage(msg: String) {
  }

}
