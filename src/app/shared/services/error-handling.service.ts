import {ErrorHandler, Injectable} from "@angular/core";
import {CommonService} from "./common.service";
import {constants} from "../../app.constants";

@Injectable()
export class ErrorHandlingService implements ErrorHandler {
  loginUserGuid: string = null;

  handleError(error) {
    const errorObj = {
      errorUrl: window.location.href,
      errorMessage: error.message,
      sessionVaraibles: this.loginUserGuid,
      stackTrace: error.stack,
      source: 'ss',
      cause: ''
    };
    //this.commonService.sendClientSideException(errorObj).subscribe();

  }

  constructor(private commonService: CommonService) {
    const loginUser = JSON.parse(localStorage.getItem(constants.localStorageUserLoginKey));
    this.loginUserGuid = loginUser ? loginUser.id : null;
  }

}
