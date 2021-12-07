import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html'
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios();

  //   const promesa = new Promise(( resolve , reject ) => {
  //     if(false){
  //       resolve('Hola Mkundo');
  //     }else{
  //       reject('como mierda')
  //     }
  //   })

  //   promesa.then( (mensaje) => {
  //     console.log(mensaje);
  //   })
  //   .catch(error => console.error('Error en mi primesa ',error));

  //   console.log('Fin de Init');

  }

  getUsuarios(){
    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => { resp.json()})
      .then( body => resolve(body));
    })
    return promesa;

  }

}
