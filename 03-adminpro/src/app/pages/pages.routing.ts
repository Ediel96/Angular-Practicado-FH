import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingComponent } from './accout-setting/accout-setting.component';
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component';

// import { HomeComponent } from './';

const routes: Routes = [
  {
      path: 'dashboard', component: PagesComponent ,
      children:[
      { path: '', component: DashboardComponent, data : {titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data : {titulo: 'Progress' } },
      { path: 'grafica1', component: Grafica1Component, data : {titulo: 'Grafica #1' } },
      { path: 'account-settings', component: AccoutSettingComponent, data : {titulo: 'Ajustes' } },
      { path: 'promesas', component: PromesasComponent, data : {titulo: 'Prosesas' } },
      { path: 'rxjs', component: RxjsComponent, data : {titulo: 'Rxjs' } },
      { path: '' , redirectTo: '/dashboard', pathMatch:'full', data : {titulo: '' } }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
