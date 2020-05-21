import { Component, OnInit } from '@angular/core';
import { Wellness } from '../../../models/wellness';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-wellness',
  templateUrl: './wellness.component.html',
  styleUrls: ['./wellness.component.css']
})
export class WellnessComponent implements OnInit {
  isEditing: boolean = false;
  userWellness: Array<any>;
  Allergenics: Array<Wellness>;
  Functionality: Array<Wellness>;

  constructor(public userAuthService: UserAuthService, private router: Router, public modal: NgbModal) { }

  ngOnInit(): void {
    this.userWellness = new Array<any>();
    this.userAuthService.getUserWellness({ token: localStorage['currentUser'] }).subscribe(res => {
      res['wellnessList'].forEach(e => {
        this.userWellness.push(e)
      });
    })
    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();

    this.userAuthService.getWellnessAList().subscribe(res => {
      this.Allergenics = res['wellnessList'] as Array<Wellness>
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      this.Functionality = res['wellnessList'] as Array<Wellness>
    });


  }
  setUW(id) {
    if (this.userWellness.includes(id)) {
      this.userWellness.splice(this.userWellness.indexOf(id), 1)

    } else {
      this.userWellness.push(id)

    }

  }

  editWellness() {
    this.isEditing = true;
  }

  saveWellness() {
    this.userAuthService.putUserWellness(localStorage['currentUser'], this.userWellness).subscribe(res => {
      const opts = {
        windowClass: 'myCustomClass'
      }

      const resp = this.modal.open(ModalComponent, opts)
      resp.componentInstance.closeModal = () => {
        resp.close();
      }
      resp.componentInstance.titulo = Object.keys(res).toString();
      resp.componentInstance.mensaje = res[resp.componentInstance.titulo];
    });

    this.userAuthService.putAlFromEvent({token: localStorage['currentUser']}).subscribe();
    this.userAuthService.putFuFromEvent({token: localStorage['currentUser']}).subscribe();
    this.isEditing = false;

  }

}
