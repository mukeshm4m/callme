import {Http, RequestOptions, XHRBackend} from "@angular/http";
import {InterceptedHttp} from "./../interceptors/http.interceptor";

export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new InterceptedHttp(xhrBackend, requestOptions);
}
