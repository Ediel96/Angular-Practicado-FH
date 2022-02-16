import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private UsuarioServ: UsuarioService,
    private router: Router
    ){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.UsuarioServ.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
