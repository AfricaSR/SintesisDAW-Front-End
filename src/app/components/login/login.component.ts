import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, public modal: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm){
    this.userAuthService.setLogin(authForm.value).subscribe(res => {
      
      const opts = {
        windowClass: 'myCustomClass'
      }

      let head;
      let token;
      if (res['msg']){
        head = { msg : res['msg'] };
        token = { token: res['token'] };
        
        this.userAuthService.getHome(token).subscribe(resp => {
          if (resp['token']){
            localStorage.setItem('currentUser', token.token );
            this.router.navigate(['home'])
          }
        });
      }else if (res['error']){
        head = { error : res['error'] };
      }

      let respuesta = this.getResponse(head);

      const resp = this.modal.open(ModalComponent, opts)
      resp.componentInstance.closeModal = () => {
        resp.close();
      }
      resp.componentInstance.titulo = Object.keys(respuesta).toString();
      resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];
      
    });
  }

  getResponse(res){
    let respuesta;
    switch(Object.keys(res).toString()){
      case 'error': {
        respuesta = {'Ha ocurrido un error': res[Object.keys(res).toString()]};
        break;
      }case 'msg': {
        respuesta = {'Te damos la Bienvenida': res[Object.keys(res).toString()]};
        break;
      }
    }
    return respuesta;
  }

}
