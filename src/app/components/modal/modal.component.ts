import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

//Esta clase permite emitir notificaciones modales dentro de cualquier componente que lo llame
export class ModalComponent implements OnInit {

  //El componente padre definirá los valores que quiere que aparezcan en el modal
  @Input() closeModal: (any) => void;
  @Input() titulo: String;
  @Input() mensaje: String;

  constructor() { }

  ngOnInit(): void {

    
  }

}
