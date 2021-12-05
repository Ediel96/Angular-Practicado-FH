import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service'

@Component({
  selector: 'app-accout-setting',
  templateUrl: './accout-setting.component.html',
  styles: [
  ]
})
export class AccoutSettingComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor( private settingService : SettingService) { }

  ngOnInit(): void {
    this.settingService.chenckCurrentTheme();
  }

  changeTheme( theme : string){
    this.settingService.changeTheme(theme)
  }

  
  
}
