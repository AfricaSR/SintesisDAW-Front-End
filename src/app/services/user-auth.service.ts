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
}
