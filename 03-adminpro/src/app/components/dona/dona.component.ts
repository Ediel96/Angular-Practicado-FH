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
  @Input('labels') labels : string [] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') data : number [][] = [
    [350, 450, 100],
  ];



  constructor() { }

  ngOnInit(): void {
    console.log(this.title);
    console.log(this.labels);
    console.log(this.data);
  }

  public doughnutChartLabels: Label[] = this.labels;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: MultiDataSet = this.data

  public colors : Color [] = [
    {backgroundColor: ['#1d3664','#5986c5','#bbbbbb']}
  ]

}
