import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input('title') title : string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100],];

  public doughnutChartType: ChartType = 'doughnut';

  public colors : Color [] = [
    {backgroundColor: ['#1d3664','#5986c5','#bbbbbb']}
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
