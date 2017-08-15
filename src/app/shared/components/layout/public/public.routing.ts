import {Routes} from "@angular/router";
import {LoginComponent} from "../../../../login/login.component";
import {SignupComponent} from "../../../../signup/signup.component";

export const PUBLIC_ROUTES: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Log In | CallMyList Customer Portal'},
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    data: {title: 'Signup | CallMyList Customer Portal'}
  }
];
