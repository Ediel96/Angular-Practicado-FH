import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  FormGroup, AbstractControl, } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})

export class RegisterComponent implements OnInit{

  form! : FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder, 
      private usuarioServ : UsuarioService,
      private route: Router
    ) 
    { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nombre: ['tes17', Validators.required],
        email: ['tes17@gmail.com', Validators.email,],
        password: ['1234567', Validators.required],
        terminos: [false, Validators.requiredTrue]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.usuarioServ.crearUsuario(this.form.value).subscribe(res => {
      this.route.navigate(['/login'])
      Swal.fire({
        icon: 'success',
        title: 'Registro exitosos',
        timer: 1500
      })

    },
    (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error.msg}`,
      })
      }
    )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
