import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  constructor() { }

  public ocultarModal: boolean = false;


  ngOnInit(): void {
  }

  cerrarModal(){
    console.log('true')
    this.ocultarModal = true;
  }

}
