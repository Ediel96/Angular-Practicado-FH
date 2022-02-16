import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(
            private http: HttpClient, 
            private router: Router
        ) {}

    logout(){
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');

    }

    validarToken(): Observable<boolean>{
        const token = localStorage.getItem('token') || '';
        
        return this.http.get(`${base_url}/login/renew`,{
            headers:{
                'x-token':token
            }
        }).pipe(
            tap(( res:any ) => {
                localStorage.setItem('token', res.token)
            }),
            map(res => true),
            catchError(error => of(false))
        );

    }

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
