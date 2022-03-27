import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

import { CargaUsuario } from 'src/app/interfaces/cargar-usuarios.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuario : number = 0;
  public usuarios? : Usuario[]; 
  public desde : number = 0;
  public cargando : boolean = true;

  constructor(
    private usuariosServ : UsuarioService,
    private busquedaService : BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }


  cargarUsuarios(){
    this.usuariosServ
      .cargaUsuarios( this.desde ).subscribe( ( resp:any ) => { 
        this.totalUsuario = resp.total;
        this.usuarios =  resp.usuarios;
        this.cargando = false;
      });
  }


  cambiarPaginas(valor : number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }else if (this.desde > this.totalUsuario){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino : string){
    
    if(termino.length === 0){
      this.cargarUsuarios();
      return;
    }

    this.busquedaService.buscar('usuarios', termino)
            .subscribe((resp) => { this.usuarios = resp});

  }

  eliminar( usuario : Usuario){

    if( usuario.uid === this.usuariosServ.uid){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }
    
    Swal.fire({
      title: 'Borra usuarios?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosServ.eliminarUsuario( usuario )
          .subscribe( res=> {
            Swal.fire(
              'Usuario borrador',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )
            this.cargarUsuarios();
          })
      }
    })

  }


  cambiarRole( usuario : Usuario ){
    this.usuariosServ.actualizarPerfilRole(usuario).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }


}