import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {constants} from "../../app.constants";

@Injectable()
export class CommonService {

  constructor(private http: Http) {
  }

  sendClientSideException(body: object) {
    return this.http.post(constants.apiUrl.clientSideException, body)
      .map((response: Response) => response.json().detail);
  }
}
