import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) {}

    crearUsuario(formData : RegisterForm){
        return this.http.post(`${base_url}/usuarios`, formData);
    }

    loginUsuario(formData : any){
        return this.http.post(`${base_url}/login`, formData)
        .pipe(
            tap( (res: any) => {
                localStorage.setItem('token', res.token)
            })
        );
    }

}
