import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { UserAuthService } from '../../../../../services/user-auth.service';
import { User } from '../../../../../models/user';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('msg') inputText: ElementRef;
  public socket;
  @Input() isHost: Boolean;
  @Input() idEvent: Number;
  @Input() idAttend: Number;
  messages: any[] = new Array<any>();

  user: User = new User();

  constructor(private socketService: SocketService, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.userAuthService.getUserProfile({ token: localStorage['currentUser'] }).subscribe(res => {
      this.user = res as User;

      this.socket = io('http://localhost:3000', { query: { idEvent: [this.idEvent, +this.idAttend] } })

      
      this.socket.on('messages', msg => {
        if (msg['idAttend'] == +this.idAttend){
          this.messages = msg['messages'];
        }
        

      })

      this.socket.on('sendMessage', () => {
        this.socketService.getChat(localStorage['currentUser'], this.idEvent, +this.idAttend).subscribe(res => {
          if (res['idAttend'] == +this.idAttend){
            this.messages = res['messages'];
          }
        })

      })

    });

  }

  sendMessage(msg: String) {
    if (msg != '' && msg != null && msg != undefined) {
      let message = {
        role: 'Invitado',
        name: this.user.name,
        surname: this.user.surname,
        idEvent: this.idEvent,
        idAttend: +this.idAttend,
        message: msg,
        createdAt: new Date()
      }
      this.inputText.nativeElement.value = "";

      this.socketService.sendMessage(this.idEvent, +this.idAttend, message).subscribe()
    }

  }



}
