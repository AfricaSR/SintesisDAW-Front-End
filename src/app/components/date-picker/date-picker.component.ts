import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})

//Clase para generar una selección de fechas entre los parámetros válidos
export class DatePickerComponent implements OnInit {
  date: Date;
  year: number;
  month: number;
  day: number;
  daysInMonth: number;
  arrayYear: Array<Number>;
  arrayMonth: Array<Number>;
  arrayDay: Array<Number>;

  constructor() { }

  ngOnInit(): void {
    this.date = new Date();
    this.arrayYear = new Array;
    this.arrayMonth = new Array;
    this.arrayDay = new Array;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth()+1;
    this.day = this.date.getDate();
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.ranges(this.year, 'year');
    this.ranges(this.month, 'month');
    this.ranges(this.daysInMonth, 'day');
  }
  /*
  Para evitar la entrada de fechas incorrectas (ej. 31 de febrero), 
  cada vez que se cambia un parámetro de los tres selectores se actualizan
  los rangos de fechas habilitados en los selectores.
  Además así se protegen los campos contra entrada de datos que no sean numéricos.
  */
  ranges(range: number, type: String){

    switch(type){
      case 'year':
        this.arrayYear = [];
        for(let i = range; i >= range-100; i--){
          this.arrayYear.push(i)
        }
        break;
      case 'month':
        this.arrayMonth = [];
        for(let i = 1; i <= 12; i++){
          this.arrayMonth.push(i);
        }
        break;
      case 'day':
        this.arrayDay = [];
        for(let i = 1; i <= range; i++){
          this.arrayDay.push(i);
        }
        break;
    }

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

  }

  newDate(year, month, day){

    this.date = new Date(year, month, day);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.ranges(this.month, 'month');
    this.ranges(this.daysInMonth, 'day');
  }



}
