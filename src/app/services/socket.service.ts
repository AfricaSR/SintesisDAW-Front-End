import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from "socket.io-client";
import 'rxjs';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket;
  constructor(private http: HttpClient) { 
  }

  getChats(token: any, idEvent: Number){
    return this.http.post('http://localhost:3000/getChats', { token, idEvent })
  }

  initChat(idEvent: Number, idAttend: Number) {
    this.socket = io('http://localhost:3000', {query: { idEvent: [idEvent, idAttend]} } )

    this.socket.on('messages', msg => {
      return msg;
    })
      
  }

  sendMessage(idEvent: Number, idAttend: Number, message: any) {
    return this.http.post('http://localhost:3000/sendMessage', {idEvent, idAttend, message})
  }

  getChat(token: any, idEvent: Number, idAttend: Number){
    return this.http.post('http://localhost:3000/getChat', {token, idEvent, idAttend})
  }

  
}
