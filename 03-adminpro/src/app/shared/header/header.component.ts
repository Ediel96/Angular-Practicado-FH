import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  public usuarios? : Usuario;

  constructor( 
      private usuarioServ : UsuarioService 
    ) { 
      this.usuarios = usuarioServ.usuario;
    }

  logout(){
    this.usuarioServ.logout();
  }



}
