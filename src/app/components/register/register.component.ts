import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //El registro se comunicará con el servicio de autenticación de usuarios y las notificaciones modales
  constructor(public userAuthService: UserAuthService, public modal: NgbModal) { }

  //También se requerirá el uso del date-picker para definir la fecha de nacimiento del usuario
  @ViewChild(DatePickerComponent) date;
  

  ngOnInit(): void {
    this.date = new DatePickerComponent();
  }

  onSubmit(registerForm: NgForm, pass2: String) {

    //Compureba que todos los campos estén rellenados
    if (registerForm.value.name != undefined && 
      registerForm.value.surname != undefined &&
      registerForm.value.email != undefined && 
      registerForm.value.gender != undefined && 
      registerForm.value.password_1 != undefined && 
      pass2 != undefined){

        //Y que la edad sea superior a 13 años
        let d = new Date();
        let edadMin = new Date(d.getFullYear()-13, d.getMonth(), d.getDate());
        if (new Date(this.date.year, this.date.month-1, this.date.day)<edadMin){

          //Ahora define los parámetros de la request
          let r = {
            name: registerForm.value.name,
            surname: registerForm.value.surname,
            email: registerForm.value.email,
            gender: registerForm.value.gender,
            year: this.date.year,
            month: this.date.month-1,
            day: this.date.day,
            password_1: registerForm.value.password_1,
            password_2: pass2
          }
    
          //Cuando se envíen los datos al servidor, este dará una respuesta a la petición y la mostrará en forma de modal
          this.userAuthService.setRegister(r).subscribe(res => {
    
            const opts = {
              windowClass: 'myCustomClass'
            }
    
            let respuesta = this.getResponse(res);
    
            const resp = this.modal.open(ModalComponent, opts)
            resp.componentInstance.closeModal = () => {
              resp.close();
            }
            resp.componentInstance.titulo = Object.keys(respuesta).toString();
            resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];
    
          })
        }else {

          const opts = {
            windowClass: 'myCustomClass'
          }
    
          let respuesta = {
            "Edad no apta": "Debes tener más de 13 años para usar esta aplicación"
          }
    
          const resp = this.modal.open(ModalComponent, opts)
          resp.componentInstance.closeModal = () => {
            resp.close();
          }
          resp.componentInstance.titulo = Object.keys(respuesta).toString();
          resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];
    
        }

    }else {

      const opts = {
        windowClass: 'myCustomClass'
      }

      let respuesta = {
        "Formulario incompleto": "Por favor, rellena todos los campos"
      }

      const resp = this.modal.open(ModalComponent, opts)
      resp.componentInstance.closeModal = () => {
        resp.close();
      }
      resp.componentInstance.titulo = Object.keys(respuesta).toString();
      resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];

    }
    
  }

  //Obtiene la respuesta simplificada y la transforma para hacer una presentación más comprensible al usuario
  getResponse(res){
    let respuesta;
    switch(Object.keys(res).toString()){
      case 'error': {
        respuesta = {'Ha ocurrido un error': res[Object.keys(res).toString()]};
        break;
      }case 'msg': {
        respuesta = {'Registro enviado': res[Object.keys(res).toString()]};
        break;
      }
    }
    return respuesta;
  }

}
