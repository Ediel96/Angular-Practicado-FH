import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [] = [
    {
      titulo : 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo : 'My Perfil', url: './perfil'},
        {titulo : 'Main', url: '/'},
        {titulo : 'ProgressBar', url: 'progress'},
        {titulo : 'Grafica', url: 'grafica1'},
        {titulo : 'Promesas', url: 'promesas'},//rxjs
        {titulo : 'Rxjs', url: 'rxjs'},

      ]
    },

    {
      titulo : 'Mnatenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        {titulo : 'Usuarios', url: './usuarios'},
        {titulo : 'Hopitales', url: '/hospitales'},
        {titulo : 'Medicos', url: '/medicos'},
      ]
    }


  ]

  constructor() { }
}
