import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  selectedUser: User;

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  //Enviar login al backend
  setLogin(login: any){
    return this.http.post('http://localhost:3000/inicio', login);
  }

  //Enviar registro al backend
  setRegister(register: any) {
    return this.http.post('http://localhost:3000/create-account', register);
  }

  //Enviar la recuperación al servidor
  setRecovery(email: String) {
    return this.http.post('http://localhost:3000/recovery', email);
  }

  getHome(token: any) {
    return this.http.post('http://localhost:3000/home', token);
  }

  isAutenticated() {
    if (localStorage['currentUser']){
      return true;
    }else {
      return false;
    }
  }

  getUserProfile(token: any){
    return this.http.post('http://localhost:3000/account', token);
  }

  putUserProfile(token: any, user: User, dateBirth: any){
    return this.http.put('http://localhost:3000/updateAccount', {token, user, dateBirth})
  }

  putUserPassword(token: any, oldPassword: String, password: String){
    return this.http.put('http://localhost:3000/updatePassword', {token, oldPassword, password})
  }

  deleteUser(token: any){
    return this.http.post('http://localhost:3000/deleteUser', token)
  }

  getUserWellness(token: any) {
    return this.http.post('http://localhost:3000/userWellness', token)
  }

  putUserWellness(token: any, wellnessList: any){
    return this.http.put('http://localhost:3000/updateWellness', {token, wellnessList})
  }

  getWellnessAList() {
    return this.http.get('http://localhost:3000/wellness/alergenics');
  }

  getWellnessDList() {
    return this.http.get('http://localhost:3000/wellness/diversity');
  }

  getEventListCreated(token: any){
    return this.http.post('http://localhost:3000/eventListCreated', token)
  }

  postNewEvent(token: any, event: any){
    return this.http.post('http://localhost:3000/createEvent', {token, event})
  }

  getEventCreated(token: any, event: any){
    return this.http.post('http://localhost:3000/eventCreated', {token, event});
  }

  getEventNonCreated(token: any, event: any){
    return this.http.post('http://localhost:3000/eventNonCreated', {token, event});
  }

  exchangeInvitation(token: any, event: Number, role: String, confirmationCode: String){
    return this.http.post('http://localhost:3000/createAttend', {token, event, role, confirmationCode});
  }

  getEventInvitations(token: any, idEvent: Number){
    return this.http.post('http://localhost:3000/getEventInvitations', {token, idEvent});
  }

  postNewInvitation(token: any, idEvent: Number, invitation: any){
    return this.http.post('http://localhost:3000/createInvitation', {token, idEvent, invitation});
  }

  deleteEventInvitation(token: any, idEvent: Number, code: String){
    return this.http.post('http://localhost:3000/deleteEventInvitation', {token, idEvent, code});
  }

  putEventInvitation(token: any, idEvent: Number, invitation: any) {
    return this.http.post('http://localhost:3000/editEventInvitation', {token, idEvent, invitation});
  }

  getEventInvitation(token: any, code: String, invitation: String) {
    return this.http.post('http://localhost:3000/getEventInvitation', {token, code, invitation});
  }
}
