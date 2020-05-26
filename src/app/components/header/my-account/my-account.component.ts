import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../../services/user-auth.service';
import { User } from '../../../models/user';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import *  as $ from 'jquery';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  currentUser: User;
  auxCurrent: User;
  isEditing: Boolean;
  editPassword: Boolean;
  file: File;
  @ViewChild(DatePickerComponent) editDateBirth;


  constructor(public userAuthService: UserAuthService, private router: Router, public modal: NgbModal) { }

  ngOnInit(): void {
    
    this.currentUser = new User();
    this.isEditing = false;
    this.editPassword = false;
    this.userAuthService
    .getUserProfile({token: localStorage['currentUser']})
    .subscribe(res => {
      this.currentUser.idUser = res['idUser'];
      this.currentUser.name = res['name'];
      this.currentUser.surname = res['surname'];
      this.currentUser.email = res['email'];
      this.currentUser.photo = res['photo'];
      this.currentUser.dateBirth = res['dateBirth'];
      if (res['gender']=='F'){
        this.currentUser.gender = 'Mujer'
      }else if (res['gender']=='M'){
        this.currentUser.gender = 'Hombre'
      }else {
        this.currentUser.gender = 'Otro'
      }
      
    })
  }

  onFileChange(event){

    if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];

        if(file.type.includes("image")){//Evaluar si es una imagen
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.onload=function load(){
                this.currentUser.photo = reader.result; //Asignar al thumbnail
                
            }.bind(this);
            this.file=file;

            const formData = new FormData();
            console.log(this.currentUser.idUser+'.'+this.file.type.split('/')[1])
            formData.append('image', this.file, this.currentUser.idUser+'.'+this.file.type.split('/')[1])
            
            this.userAuthService.addPicture(formData).subscribe(res => {
              console.log(res)
            })
            

        }
    }
}

  fixAspect() {
    let img = $('#photo-'+this.currentUser.idUser),
    width = img.width(),
    height = img.height(),
    tallAndNarrow = width / height < 1;

    if (tallAndNarrow) {
      img.addClass('tallAndNarrow');
    }
    img.addClass('loaded');

  }

  editUserData(){
    this.auxCurrent = this.currentUser;
    this.editDateBirth = new DatePickerComponent();
    let year = this.currentUser.dateBirth.toString().split('-')[0];
    let month = this.currentUser.dateBirth.toString().split('-')[1];
    let day = this.currentUser.dateBirth.toString().split('-')[2];
    this.editDateBirth.newDate(+year,+month-1,+day);
    
    
    this.isEditing = true;
  }

  saveUserData() {
    
    
    if (this.currentUser.gender=="Hombre"){
      this.currentUser.gender = 'M'
    }else if (this.currentUser.gender=="Mujer"){
      this.currentUser.gender = 'F'
    }else {
      this.currentUser.gender = 'N'
    }
    this.currentUser.dateBirth = new Date(this.editDateBirth.year, this.editDateBirth.month-1, this.editDateBirth.day)

    this.userAuthService
    .putUserProfile(localStorage['currentUser'], 
    this.currentUser, 
    {year: this.editDateBirth.year, 
      month: this.editDateBirth.month-1, 
      day: this.editDateBirth.day}).subscribe();

    if (this.currentUser.gender=="M"){
      this.currentUser.gender = 'Hombre'
    }else if (this.currentUser.gender=="F"){
      this.currentUser.gender = 'Mujer'
    }else {
      this.currentUser.gender = 'Otro'
    }
    this.auxCurrent = this.currentUser;
    this.isEditing = false;

  }

  updatingPass() {
    this.editPassword = true;
  }

  updatePassword(Cp: String, Np: String, Rnp: String){
    if (Np != Rnp){
      const opts = {
        windowClass: 'myCustomClass'
      }

      const resp = this.modal.open(ModalComponent, opts)
      resp.componentInstance.closeModal = () => {
        resp.close();
      }
      resp.componentInstance.titulo = 'Error de datos';
      resp.componentInstance.mensaje = 'Las nuevas contraseñas no coinciden';

    }else {
      this.userAuthService.putUserPassword(localStorage['currentUser'], Cp, Np).subscribe(res => {
        const opts = {
          windowClass: 'myCustomClass'
        }
        let respuesta;
        if (res['msg']){
          respuesta = {'Éxito': res['msg']}
        }else {
          respuesta = {'Ha ocurrido un error': res['error']}
        }
        
    
        const resp = this.modal.open(ModalComponent, opts)
        resp.componentInstance.closeModal = () => {
          resp.close();
        }
        resp.componentInstance.titulo = Object.keys(respuesta).toString();
        resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];

      });
    }
    this.editPassword = false;
  }

  cancelPassword(){
    this.editPassword = false;
  }

  cancel() {
    this.currentUser = this.auxCurrent;
    this.isEditing = false;
  }

  deleteProfile() {
    const opts = {
      windowClass: 'myCustomClass'
    }
    let respuesta = {'Atención': 'Estás a punto de borrar tu perfil de usuario. No podrás recuperar tus datos una vez hayas dado este paso. ¿Deseas continuar?'}
    

    const resp = this.modal.open(ModalComponent, opts)
    resp.componentInstance.danger = true;
    resp.componentInstance.dissmissModal = () => {
      resp.dismiss();
      console.log(resp.result['__zone_symbol__state'])
    }
    resp.componentInstance.okModal = () => {
      resp.close();
      if (resp.result['__zone_symbol__state']==true){
        this.userAuthService.deleteUser({token: localStorage['currentUser']}).subscribe()
        localStorage.clear();
        this.router.navigate['']
        
      }
    }
    resp.componentInstance.titulo = Object.keys(respuesta).toString();
    resp.componentInstance.mensaje = respuesta[resp.componentInstance.titulo];

  
  }

  uploadFile(e: HTMLElement) {
    e.click()
  }

}
