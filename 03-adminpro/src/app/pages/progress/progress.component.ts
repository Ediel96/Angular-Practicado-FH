import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent {

  progreso1 : number = 25;
  pregreso2 : number = 35;

  get getPorcentaje(){
    return `${this.progreso1}%`
  }

  get getPorcentaje2(){
    return `${this.pregreso2}%`
  }



}
