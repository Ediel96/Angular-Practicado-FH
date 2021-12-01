import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors : Color [] = [
    {backgroundColor: ['#1d3664','#5986c5','#bbbbbb']}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
