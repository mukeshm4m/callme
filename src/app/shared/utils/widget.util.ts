import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SessiontimeoutComponent} from "../components/dialogs/sessiontimeout/sessiontimeout.component";

export class WidgetUtil {

  private static options = {"backdrop": false, "keyboard": false};

  public static showSessionTimeoutDialog(ngbModal: NgbModal) {

    const ngbModalRef = ngbModal.open(SessiontimeoutComponent, WidgetUtil.options);
    const componentInstance = ngbModalRef.componentInstance;

    componentInstance.modalRef = ngbModalRef;
    return componentInstance;
  }

}
