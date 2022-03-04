import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  form! : FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioServ: UsuarioService 
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['hamilton@gmail.com', Validators.email,],
        password: ['123456', Validators.required],
        remember: [false]
      }
    );

      // this.onSignIn()

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  login(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('login', this.form.value)

    this.usuarioServ.loginUsuario(this.form.value).subscribe(res => {

      console.log('login',res);
      Swal.fire('Success', 'Login exitoso', 'success');
      this.router.navigate(['/']);

    },err => {
      console.warn(err);
      Swal.fire('Error', err.error.msg, 'error');
    });

    // console.log('formulario : ',this.form.value);
    
  }

  onSucces(googleUser : any) {
    var id_token = googleUser.getAutResponse().id_token;
    console.log(id_token);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {
    

    console.log(document.getElementById('my-signin2'))

    // await this.usuarioService.googleInit();
    // this.auth2 = this.usuarioService.auth2;

    // this.attachSignin( document.getElementById('my-signin2') );
    
  };
  

}
