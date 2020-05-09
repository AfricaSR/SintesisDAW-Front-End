import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  constructor(public userAuthService: UserAuthService, public modal: NgbModal) { }

  ngOnInit(): void {
  }
  onSubmit(recoveryForm: NgForm) {


    if (recoveryForm.value.email != undefined) {

      this.userAuthService.setRecovery(recoveryForm.value).subscribe(res => {

        console.log(res)
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
        "Formulario incompleto": "Por favor, introduce tu email para que podamos enviarte un correo de renovación"
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
