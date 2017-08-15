import {Directive, ElementRef, Input} from "@angular/core";
import * as Inputmask from "inputmask";

@Directive({
  selector: '[cml-pattern]'
})
export class PatternDirective {

  constructor(private el: ElementRef) {
  }

  @Input('cml-pattern')
  public set defineInputType(pattern: string) {
    let ph = this.el.nativeElement.placeholder;
    Inputmask({regex: pattern, placeholder: ph}).mask(this.el.nativeElement);
  }
}