import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket.service';
import *  as $ from 'jquery';
import * as io from "socket.io-client";
import { isUndefined } from 'util';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public socket;
  notifications: any[];
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    //Se abre un socket para recibir todas las notificaciones
    this.socket = io('http://localhost:3000', { query: { token: localStorage['currentUser'] } })
    //Una vez activado el socket, se reciben las notificaciones y se almacenan en el array
    this.socket.on('sendNotifications', ntfs => {

      if (isUndefined(this.notifications)) {
        this.notifications = new Array<any>();
        ntfs['LVL_Attend'].forEach(e => {
          this.notifications.push(e)
        });
        ntfs['LVL_User'].forEach(e => {
          this.notifications.push(e)
        });
        ntfs['LVL_Host'].forEach(e => {
          this.notifications.push(e)
        });
      }
    })

    

    //Una vez abierto el panel de notificaciones estas pueden declararse como vistas
    this.socketService.viewNotifications({ token: localStorage['currentUser'] }).subscribe()


  }

}
