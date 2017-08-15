import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {ValidatorUtil} from "../shared/utils/validator.util";
import {Router} from "@angular/router";

@Component({
  selector: 'cml-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private router : Router) {
    this.signupForm = new FormGroup({
      'first name': new FormControl('', [Validators.required]),
      'last name': new FormControl('',Validators.required),
      'company name': new FormControl('',Validators.required),
      'phone': new FormControl('',Validators.required),
      'email': new FormControl('',[Validators.required, ValidatorUtil.emailValidator]),
      'password': new FormControl('',Validators.required),
      'confirm password': new FormControl('',Validators.required)
    });
  }


  onSignup(){
    console.log(this.signupForm);
    if(this.signupForm.valid){
      this.router.navigate(['/home']);
    }
  }
  ngOnInit() {
  }

}
