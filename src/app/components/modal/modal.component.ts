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
  @Input() dissmissModal: (any) => void;
  @Input() okModal: (any) => void;
  ok: Boolean = false;
  @Input() danger: Boolean = false;
  @Input() titulo: String;
  @Input() mensaje: String;

  constructor() { }

  ngOnInit(): void {

    
  }

  setOk(){
    this.ok = true;
  }

}
