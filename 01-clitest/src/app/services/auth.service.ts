import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    console.log("Hola este es el servicio de auth");
  }
}
