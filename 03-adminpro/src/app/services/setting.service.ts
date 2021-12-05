import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public elmentTheme  = document.querySelector('#theme');

  constructor( ) { 

    const themeUrl = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';  
    this.elmentTheme?.setAttribute('href',themeUrl);
    
  }

  changeTheme(theme : string){
    const url = `./assets/css/colors/${theme}.css`;
    this.elmentTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.chenckCurrentTheme();
    
  }

  chenckCurrentTheme(){
    const links = document.querySelectorAll('.selector')
   links.forEach(elem => {

     elem.classList.remove('working');
     const btnTheme = elem.getAttribute('data-theme');
     const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
     const currentTheme = this.elmentTheme?.getAttribute('href');

     if(btnThemeUrl === currentTheme){
       elem.classList.add('working')
     }

   })
 }


}
