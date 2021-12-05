import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {


  
  

  constructor(private  settingsServices : SettingService) { }

  ngOnInit( ): void {
    
    
    
  }

}
