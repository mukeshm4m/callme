import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../services/auth.service";
import {constants} from "../../app.constants";
import {EmitterUtil} from "../utils/emitter.util";
import {SessiontimeoutUtil} from "../utils/sessiontimeout.util";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionTimeoutService: SessiontimeoutUtil) {
    EmitterUtil.get(constants.events.navigation).subscribe((data: any) => {
      this.router.navigate(data);
    });
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (AuthService.isAuthenticated()) {
      if (state.url === constants.pageUrl.login) {
        this.router.navigate([constants.pageUrl.home]);
      } else {
        this.sessionTimeoutService.onPageChange();
        return true;
      }
    }

    if (state.url === constants.pageUrl.login) {
      return true;
    } else {
      this.router.navigate([constants.pageUrl.login]);
    }
  }
}
