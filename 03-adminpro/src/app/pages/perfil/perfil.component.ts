import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  form! : FormGroup;
  submitted = false;
  public usuario? : Usuario;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioServ : UsuarioService
  ) { 
    this.usuario = usuarioServ.usuario;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        nombre:[this.usuario?.nombre, Validators.required],
        email: [this.usuario?.email, [Validators.required , Validators.email]],
        role:[this.usuario?.role]
      }
    )

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(){

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.usuarioServ.actualizarPerfil(this.form.value)
      .subscribe(res => {
        const {nombre , email} = this.form.value;

        this.usuario!.nombre = nombre;
        this.usuario!.email = email;
        console.log(res);
      })

  }

}
