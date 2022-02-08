import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  FormGroup, AbstractControl, } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})

export class RegisterComponent implements OnInit{

  form! : FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private usuarioServ : UsuarioService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nombre: ['example22', Validators.required],
        email: ['example22@gmail.com',[Validators.email,]],
        password: ['example221', [Validators.required, Validators.required]],
        // password2: ['',[Validators.required,]],
        terminos: [false, Validators.requiredTrue]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    console.log('form : ',this.form.value);
    console.log('respuesta valida: ',this.form.invalid);


    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value, null, 2);

    this.usuarioServ.crearUsuario(this.form.value).subscribe(res => {
      console.log('respuesta: ',res)
    },
    (err) => console.warn(err)
    )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
