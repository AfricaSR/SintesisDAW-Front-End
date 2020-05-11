import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import *  as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  $: any;

  constructor() { }

  ngOnInit(): void {

  }

  goHome(){

  }


}
