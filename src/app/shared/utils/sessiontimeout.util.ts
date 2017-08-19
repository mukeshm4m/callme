import {Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SimpleTimer} from "ng2-simple-timer";
import {WidgetUtil} from "./widget.util";
import {SessiontimeoutComponent} from "../components/dialogs/sessiontimeout/sessiontimeout.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {constants} from "../../app.constants";

@Injectable()
export class SessiontimeoutUtil {
  subscriptionId: string;
  tempId: string;

  constructor(private router: Router, private modalService: NgbModal, private timerService: SimpleTimer) {
  }

  onPageChange() {
    this.timerService.unsubscribe(this.tempId);
    this.timerService.newTimer('startTime', constants.sessionTimeout.tickTime);
    this.tempId = this.timerService.subscribe('startTime', tick => this.startLogoutTimer(tick));
  }

  startLogoutTimer(tick: number) {
    if (tick === 1) {
      this.unsubscribeTimer();
      if (AuthService.isAuthenticated()) {
        this.timerService.newTimer('logoutTime', constants.sessionTimeout.tickTime);
        this.subscriptionId = this.timerService.subscribe('logoutTime', a => this.timerTickCallBack(a));
      }
    }
    if (tick >= 1) {
      this.timerService.unsubscribe(this.tempId);
    }
  }

  unsubscribeTimer() {
    this.timerService.unsubscribe(this.subscriptionId);
  }

  public timerTickCallBack = (val: any): void => {
    const diff: number = AuthService.getTokenExpiry() - new Date().valueOf();
    if (diff < 0) {
      this.timerService.unsubscribe(this.subscriptionId);
      if (AuthService.isAuthenticated()) {
        AuthService.logout();
        this.router.navigate(['/login']);
      }
    }
    else if (diff <= constants.sessionTimeout.showComponentBeforeTime && !SessiontimeoutComponent.isShowing) {
      WidgetUtil.showSessionTimeoutDialog(this.modalService);
    }
  };
}
