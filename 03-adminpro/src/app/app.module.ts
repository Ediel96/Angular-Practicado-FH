import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

//Component
import { AppComponent } from './app.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

//Modulos
import { PagesModule } from './pages/pages.module';
import {AuthModule} from './auth/auth.module'


import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



@NgModule({
  declarations: [
    AppComponent,



    NopagesfoundComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AuthModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
