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
    console.log(token)
    return this.http.post('http://localhost:3000/deleteUser', token)
  }

  getWellnessAList() {
    return this.http.get('http://localhost:3000/wellness/alergenics');
  }

  getWellnessDList() {
    return this.http.get('http://localhost:3000/wellness/diversity');
  }
}
