import { Component, OnInit } from '@angular/core';
import {Color} from "ng2-charts";
import {constants} from "../app.constants";

@Component({
  selector: 'cml-campaigns',
  templateUrl: './campaigns.component.html'
})
export class CampaignsComponent implements OnInit {

  data = [
    ['data1', 15],
    ['data2', 30],
    ['data3', 45],
    ['data4', 10]
  ];

  labels = {
    data1: '21-60 seconds',
    data2: '11-20 seconds',
    data3: '60+ seconds',
    data4: '0-10 seconds'
  };

  colors = {
    data1: '#21afcb',
    data2: '#314652',
    data3: '#67b857',
    data4: '#f66b36'
  };
  
  constructor() { }

  ngOnInit() {
  }

}
