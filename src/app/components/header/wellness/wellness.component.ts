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

  Allergenics: Array<Wellness>;
  Functionality: Array<Wellness>;

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.Allergenics = new Array<Wellness>();
    this.Functionality = new Array<Wellness>();
    this.userAuthService.getWellnessAList().subscribe(res => {
      this.Allergenics = res as Wellness[];
      console.log(this.Allergenics)
      this.Allergenics['wellnessList'].forEach(e => {
        e.route = '../../../assets/icons/corona.svg';
      });
    });
    this.userAuthService.getWellnessDList().subscribe(res => {
      this.Functionality = res as Wellness[];
      console.log(this.Functionality)
      this.Functionality['wellnessList'].forEach(e => {
        e.route = '../../../assets/icons/corona.svg';
      });
    })
  }

  
}
