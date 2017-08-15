import {ToasterService} from "angular2-toaster";

export class ToasterUtil {

  public static showSuccessToast(toaster: ToasterService, title: string, message: string) {
    toaster.pop("success", title, message);
  }

  public static showWarningToast(toaster: ToasterService, title: string, message: string) {
    toaster.pop("warning", title, message);
  }

  public static showErrorToast(toaster: ToasterService, title: string, message: string) {
    toaster.pop("error", title, message);
  }
}
