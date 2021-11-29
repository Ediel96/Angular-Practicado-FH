import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

//Module
import { PagesRoutingModule } from './pages/pages.routing';

//component
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes : Routes = [

  //path: '/dashboard PagesROuting'
  //path: '/auth AuthRouting'
  { path: '' , redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**' , component : NopagesfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }
