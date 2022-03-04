import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public usuario? : Usuario;

    constructor(
            private http: HttpClient, 
            private router: Router
        ) {}

    logout(){
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');

    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get uid():string{
        return this.usuario?.uid || '';
    }

    validarToken(): Observable<boolean>{
        
        return this.http.get(`${base_url}/login/renew`,{
            headers:{
                'x-token':this.token
            }
        }).pipe(
            map(( res:any ) => {
            
                const {
                     email,
                     google,
                     nombre,
                     role,
                     img = '',
                     uid
                } = res.usuariodb; 

                this.usuario = new Usuario(nombre , email, '', img, google, role, uid);
                
                // this.usuario.imprimirUsuario();
                localStorage.setItem('token', res.token);
                
                return true;
            }),
            map(res => true),
            catchError(error => of(false))
        );

    }

    crearUsuario(formData : RegisterForm){
        return this.http.post(`${base_url}/usuarios`, formData);
    }


    actualizarPerfil(data: { email: string, nombre : string, role : string}){

        data = {
            ...data
        };

        return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {headers:{
            'x-token':this.token
            }
        });

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
