import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MedicosComponent } from './intermedio/espias/medicos.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
