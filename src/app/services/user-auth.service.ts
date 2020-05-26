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

  addPicture(image: FormData) {
    return this.http.post<any>('http://localhost:3000/addPicture', image);
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

  editEvent(token: any, event: any) {
    return this.http.post('http://localhost:3000/editEvent', {token, event})
  }

  deleteEvent(token: any, idEvent: Number) {
    return this.http.post('http://localhost:3000/deleteEvent', {token, idEvent})
  }

  getEventCreated(token: any, event: any){
    return this.http.post('http://localhost:3000/eventCreated', {token, event});
  }

  getEventNonCreated(token: any, event: any){
    return this.http.post('http://localhost:3000/eventNonCreated', {token, event});
  }

  exchangeInvitation(token: any, event: Number, nameSurname: String, role: String, confirmationCode: String, confirmed: Boolean){
    return this.http.post('http://localhost:3000/createAttend', {token, event, nameSurname, role, confirmationCode, confirmed});
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

  postQuestion(token: any, event: Number, question: String) {
    return this.http.post('http://localhost:3000/makeQuestion', {token, event, question})
  }

  getQuestions(token: any, event: Number) {
    return this.http.post('http://localhost:3000/getQuestions', {token, event})
  }

  getResponses(token: any, event: Number) {
    return this.http.post('http://localhost:3000/getResponses', {token, event})
  }

  postResponses(token: any, idEvent: Number, answers: any[]) {
    return this.http.post('http://localhost:3000/sendResponses', {token, idEvent, answers})
  }

  postNews(token: any, event: Number, title: String, body: String) {
    return this.http.post('http://localhost:3000/makeNews', {token, event, title, body})
  }

  getNews(token: any, event: Number) {
    return this.http.post('http://localhost:3000/getNews', {token, event})
  }

  getDashboardNews(token: any) {
    return this.http.post('http://localhost:3000/getEventsNews', token)
  }

  getDashboardTimeline(token: any) {
    return this.http.post('http://localhost:3000/getEventsTimeline', token)
  }

  dropQuestion(token: any, idEvent: Number, _id: String) {
    return this.http.post('http://localhost:3000/dropQuestion', {token, idEvent, _id})
  }

  dropNews(token: any, idEvent: Number, _id: String) {
    return this.http.post('http://localhost:3000/dropNews', {token, idEvent, _id})
  }


}
