import { Component, OnInit } from '@angular/core';
import { Wellness } from '../../../models/wellness';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from "@angular/router"
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

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.userWellness = new Array<any>();
    this.userAuthService.getUserWellness({token: localStorage['currentUser']}).subscribe(res => {
      res['wellness'].forEach(e => {
        this.userWellness.push(e)
      });
    })
    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();
    this.userAuthService.getWellnessAList().subscribe(res => {
      res['wellnessList'].forEach(e => {
        let el = new Wellness();
        el = e as Wellness;
        if (this.userWellness.includes(el.idWellness)){
          el.had = true;
        }else {
          el.had = false;
        }
        this.Allergenics.push(el)
      });
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      res['wellnessList'].forEach(e => {
        let el = new Wellness();
        el = e as Wellness;
        if (this.userWellness.includes(el.idWellness)){
          el.had = true;
        }else {
          el.had = false;
        }
        this.Functionality.push(el)
      });
    });


  }
  setUW(id){
    if (this.userWellness.includes(id)){
      this.userWellness.splice(this.userWellness.indexOf(id), 1)

    }else {
      this.userWellness.push(id)

    }
    
  }

  editWellness() {
    this.isEditing = true;
  }

  saveWellness(){
    console.log(this.userWellness)
    this.isEditing = false;
  }
  
}
