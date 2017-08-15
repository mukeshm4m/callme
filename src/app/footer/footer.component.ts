import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'cml-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  @Input()
  showContent = false;
  constructor() { }

  ngOnInit() {
  }

}
