import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';

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
  public imageSubir? : File;
  public imgTemp? : any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioServ : UsuarioService,
    private fileUploadServ : FileUploadService
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

  cambiarImagen(event:any): any | undefined{
    this.imageSubir = event.target.files[0] as File;

    if(!this.imageSubir){
      return  this.imgTemp! = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageSubir as File);

    reader.onloadend = () => {
      this.imgTemp! = reader.result;
    }

  }

  subirImagen(){
    console.log(this.imageSubir!);
    this.fileUploadServ
      .actualizarFoto(this.imageSubir!, 'usuarios', this.usuario?.uid!)
      .then(img => this.usuario!.img = img);
  }

}
