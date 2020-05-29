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
    return this.http.post('http://evenfy.es:3000/getChats', { token, idEvent })
  }

  initChat(idEvent: Number, idAttend: Number) {
    this.socket = io('http://evenfy.es:3000', {query: { idEvent: [idEvent, idAttend]} } )

    this.socket.on('messages', msg => {
      return msg;
    })
      
  }

  sendMessage(idEvent: Number, idAttend: Number, message: any) {
    return this.http.post('http://evenfy.es:3000/sendMessage', {idEvent, idAttend, message})
  }

  getChat(token: any, idEvent: Number, idAttend: Number){
    return this.http.post('http://evenfy.es:3000/getChat', {token, idEvent, idAttend})
  }

  viewNotifications(token: any) {
    return this.http.post('http://evenfy.es:3000/viewNotifications', token);
  }

  postNews(idEvent: Number, title: String) {
    return this.http.post('http://evenfy.es:3000/postNews', {idEvent, title})
  }

  postAttend(idEvent: Number, user: any) {
    return this.http.post('http://evenfy.es:3000/postAttend', {idEvent, user})
  }

  postWellness(token: any) {
    return this.http.post('http://evenfy.es:3000/postWellness', token)
  }

  postUnvailable(idEvent: any) {
    return this.http.post('http://evenfy.es:3000/eventUnavailable', idEvent)
  }

  postNewQuestion(idEvent: Number, title: String) {
    return this.http.post('http://evenfy.es:3000/eventNewQuestion', {idEvent, title})
  }

  postResponse(idUser: Number, title: String, name: String, surname: String) {
    return this.http.post('http://evenfy.es:3000/postReponses', {idUser, title, name, surname})
  }

  postEditEvent(idEvent: Number, title: String) {
    return this.http.post('http://evenfy.es:3000/postEditEvent', {idEvent, title})
  }


  
}
