import {Component, OnDestroy, OnInit} from "@angular/core";
import {SimpleTimer} from "ng2-simple-timer";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {constants} from "../../../../app.constants";

@Component({
  selector: 'cml-sessiontimeout',
  templateUrl: './sessiontimeout.component.html'
})
export class SessiontimeoutComponent implements OnInit, OnDestroy {
  static isShowing = false;
  seconds: number = constants.sessionTimeout.timeoutComponentShowTime;
  modalRef: NgbModalRef;
  private subscriptionId: string;

  constructor(private router: Router, private timerService: SimpleTimer, private authService: AuthService) {
    this.timerService.newTimer('sessionTimeout', 1);
    this.subscriptionId = this.timerService.subscribe('sessionTimeout', tick => this.updateTimer(tick));
  }

  updateTimer(tick) {
    this.seconds = constants.sessionTimeout.timeoutComponentShowTime - tick;
    if (this.seconds <= 0) {
      this.timerService.unsubscribe(this.subscriptionId);
      this.expireSession();
    }
  }

  expireSession() {
    this.modalRef.dismiss('expired');
    AuthService.logout();
    this.router.navigate(['/login']);
  }

  refreshSession() {
    this.timerService.unsubscribe(this.subscriptionId);
    this.authService.updateToken()
      .subscribe((result: any) => {
      });
    this.modalRef.dismiss('refreshed');
  }

  ngOnInit() {
    SessiontimeoutComponent.isShowing = true;
  }

  ngOnDestroy() {
    SessiontimeoutComponent.isShowing = false;
  }
}
