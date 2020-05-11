import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from '../../services/user-auth.service';

import *  as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  $: any;

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    
  }



}
