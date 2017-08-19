import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {JwtHelper} from "angular2-jwt";

import {constants} from "../../app.constants";
import {LoginUser} from "../models/loginuser.model";

@Injectable()
export class AuthService {
  
  public loginUser: LoginUser;
  public jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http: Http) {
    this.loginUser = AuthService.getLoginUser();
  }
  
  /********************
   * STATIC ACCESS *****
   *********************/
  public static logout(): boolean {
    if (localStorage.getItem(constants.localStorageUserLoginKey)) {
      localStorage.removeItem(constants.localStorageUserLoginKey);
      return true;
    }
    return false;
  }
  
  public static isAuthenticated(): boolean {
    
    const loginUser = AuthService.getLoginUser();
    if (loginUser) {
      const jwtHelper = new JwtHelper();
      const token = loginUser.token;
      if (jwtHelper.isTokenExpired(token)) {
        AuthService.logout();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
  
  public static getTokenExpiry(): number {
    const loginUser = AuthService.getLoginUser();
    let date: number;
    if (loginUser) {
      const jwtHelper = new JwtHelper();
      const token = loginUser.token;
      date = jwtHelper.getTokenExpirationDate(token).valueOf();
      return date;
    }
    date = new Date(0).valueOf();
    return date;
  }
  
  public static getToken(): string {
    
    if (AuthService.isAuthenticated()) {
      return AuthService.getLoginUser().token;
    }
    
    return '';
  }
  
  public static getUserId(): number {
    
    const loginUser = AuthService.getLoginUser();
    if (AuthService.isAuthenticated()) {
      return loginUser.id;
    }
    
    return null;
  }
  
  public static getLoginUserName(): string {
    
    const loginUser = AuthService.getLoginUser();
    if (AuthService.isAuthenticated()) {
      return loginUser.name;
    }
    
    return null;
  }
  
  public static isLoginFromGoogle(): boolean {
    
    const loginUser = AuthService.getLoginUser();
    if (AuthService.isAuthenticated()) {
      return loginUser.googleLogin;
    }
    
    return false;
  }
  
  public static updateToken(token: string): string {
    
    if (token !== null) {
      if (AuthService.isAuthenticated()) {
        let loginUser = AuthService.getLoginUser();
        loginUser.token = token;
        localStorage.setItem(constants.localStorageUserLoginKey, JSON.stringify(loginUser));
        return AuthService.getLoginUser().token;
      }
    }
  }
  
  /**************************
   * HELPER FUNCTIONS ********
   **************************/
  private static getLoginUser() {
    const storedLoginUser = JSON.parse(localStorage.getItem(constants.localStorageUserLoginKey));
    return storedLoginUser ? storedLoginUser : null;
  }
  
  private buildLoginUser(token: any): LoginUser {
    const decodedToken: any = this.jwtHelper.decodeToken(token);
  
    const loginInfo = decodedToken.login;
    const loginUser = new LoginUser(
      loginInfo.id,
      decodedToken.version,
      loginInfo.name,
      loginInfo.email,
      decodedToken.exp,
      token,
      decodedToken.googleLogin,
      loginInfo.roles,
      loginInfo.permissions);
    
    return loginUser;
  }
  
  login(data: any): Observable<any> {
    return this.http.post(constants.apiUrl.login, JSON.stringify(data))
      .map((response: Response) => {
        
        this.addLoginUserInLocalStorage(response);
        return response.json() && response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      })
  }
  
  private addLoginUserInLocalStorage(response: Response) {
    const headers = response.headers;
    const token = headers.get(constants.apiRequestHeaderKeys.authToken);
    this.loginUser = this.buildLoginUser(token);
    
    localStorage.setItem(constants.localStorageUserLoginKey, JSON.stringify(this.loginUser));
  }
  
  updateToken() {
    return this.http.get(constants.apiUrl.refreshToken)
      .map((response: Response) => {
        return response.json() && response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      })
  }
  
  forgotPassword(data: any): Observable<any> {
    return this.http.post(constants.apiUrl.forgotPassword, JSON.stringify(data))
      .map((response: Response) => {
        return response.json() && response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      })
  }
}
