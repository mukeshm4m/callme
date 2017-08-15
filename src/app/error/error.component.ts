import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cl-error',
  templateUrl: './error.component.html',
  styles: ['.error-section{height: 50vh;color: #fff;}.text-light{font-weight: 300;}']
})
export class ErrorComponent implements OnInit {
  
  errorCode: string = '404';
  errorMessage: string = "Sorry, your request cannot be processed at the moment. Please try again in a few hours.";
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      if(id !== null) {
        this.errorCode = id;
        switch (id) {
          case "403":
          case "401":
            this.errorMessage = "You do not have permissions to view this page.";
            break;
          case "404":
            this.errorMessage = "The Link you followed may be broken or the page have been removed from the server. Please click the following button to go back to home page.";
            break;
          default:
            break;
        }
      }
    });
  }

}
