import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1: string[] = ['Edad 20 - 30', 'Edad 30 - 40', 'Edad 40 - 60'];
  public data1 = [
    [30, 40, 120]
  ];

}
