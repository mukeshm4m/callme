import {Component, Input, OnInit} from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'cml-donut-chart',
  templateUrl: './donut-chart.component.html'
})
export class DonutChartComponent implements OnInit {
  
  @Input() charId: string = "cml-chart";
  @Input() title: string;
  @Input() labels;
  @Input() colors;
  @Input() height: number = 0;
  @Input() data: any[] = [];

  constructor() { }

  ngOnInit() {
  
    setTimeout(() => {
      this.drawChart();
    }, 10);
  }
  
  drawChart() {
    let chart = c3.generate({
      bindto: '#' + this.charId,
      data: {
        type : 'donut',
        columns: this.data,
        names: this.labels,
        colors: this.colors,
        order: null
      },
      donut: {
        title: this.title,
        label: {
          format: function (value, ratio, id) {
            return d3.format('%')(value/100);
          }
        }
      },
      legend: {
        show: true
      }
    });
    
    if(this.height > 0) {
      setTimeout(() => {
        chart.resize({height: this.height})
      }, 10);
    }
    
  }

}
