import {Injectable} from "@angular/core";
import {ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "./../../../environments/environment";
import {constants} from "./../../app.constants";
import {AuthService} from "./../../shared/services/auth.service";

import {EmitterUtil} from "./../../shared/utils/emitter.util";


@Injectable()
export class InterceptedHttp extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res)
      }, (error: any) => {
        this.onError(error);
      });
  }

  //CRUD operatioons
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(this.updateUrl(url), this.buildOptions(options));
  }

  post(url: string, body: string, responseType?: number, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(this.updateUrl(url), body, this.buildOptions(options, responseType));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(this.updateUrl(url), body, this.buildOptions(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(this.updateUrl(url), this.buildOptions(options));
  }

  //Helper functions
  private buildOptions(options?: RequestOptionsArgs, responseType?: number): RequestOptionsArgs {

    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    let headerKeys = constants.apiRequestHeaderKeys;
    let headers = constants.apiRequestHeaders.default;
    options.headers.append(headerKeys.contentType, headers.contentType);
    options.headers.append(headerKeys.source, headers.source);
    options.headers.append(headerKeys.requestCode, headers.requestCode);

    options.headers.append(headerKeys.ifModifiedSince, headers.ifModifiedSince);
    options.headers.append(headerKeys.cacheControl, headers.cacheControl);
    options.headers.append(headerKeys.pragma, headers.pragma);

    if (AuthService.isAuthenticated()) {
      let token = AuthService.getToken();
      options.headers.append(headerKeys.authorization, token);
      options.headers.append(headerKeys.xAuthorization, token);
    }

    if (responseType) {
      options.responseType = 2;
    }

    return options;
  }

  private updateUrl(req: string) {

    // loading i18n files
    if (req.indexOf("i18n") != -1) {
      return req;
    }

    // Append trailing slash
    if (req.indexOf('?') > 0) {
      req = req.slice(0, req.indexOf('?')) + '/' + req.slice(req.indexOf('?'));
    } else {
      req += '/';
    }
    return environment.apiBaseUrl + req;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onSuccess(response: Response): void {
    let token = response.headers.get('x_auth_token') !== null ? response.headers.get('x_auth_token') : response.headers.get('X_AUTH_TOKEN');
    AuthService.updateToken(token);
  }

  private onError(error: any): void {
    if (error.status === 400) {
      let body = error.json();
      if (body.statusCode != 1004) {
        EmitterUtil.get(constants.events.navigation).emit(['/error', body.statusCode]);
      }
    }
  }
}