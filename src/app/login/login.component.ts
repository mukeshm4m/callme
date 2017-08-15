import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ValidatorUtil} from "../shared/utils/validator.util";
import {Router} from "@angular/router";

@Component({
  selector: 'cml-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required, ValidatorUtil.emailValidator]),
      'password': new FormControl('',Validators.required)
    });
  }


  onLogin(){
    console.log(this.loginForm);
    if(this.loginForm.valid) {
    }
    
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
