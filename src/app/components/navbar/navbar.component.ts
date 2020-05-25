import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as io from "socket.io-client";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public socket;
  notViewed: number = 0;
  constructor() { }

  ngOnInit(): void {
    //Incorporar un socket para las notificaciones
    this.socket = io('http://localhost:3000', { query: { token: localStorage['currentUser'] } })
    
    //Contar las notificaciones no vistas
    this.socket.on('sendNotifications', notifications => {
      notifications['LVL_Attend'].forEach(e => {
        if (!e['viewed']){
          this.notViewed++;
        }
      });
      notifications['LVL_User'].forEach(e => {
        if (!e['viewed']){
          this.notViewed++;
        }
      });
      notifications['LVL_Host'].forEach(e => {
        if (!e['viewed']){
          this.notViewed++;
        }
      });

      if (this.notViewed > 0) {
        $('label').append('<style>label:before{content:"'+this.notViewed+'" !important;}</style>');
      }

      this.socket.close()

    })
  }

 

}
