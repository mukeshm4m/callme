import {FormControl} from "@angular/forms";
import {AppUtils} from "./app.util";

export class ValidatorUtil {

  public static emailValidator(control: FormControl): { [key: string]: any } {

    const emailRegexp = /^['_A-Za-z0-9-\+]+(\.['_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i;

    if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  public static grNameCheck(control: FormControl): { [key: string]: any } {

    if (control.value !== '' && control.value != null) {

      if (!(new RegExp("^[a-zA-Z]", "i")).test(control.value)) {
        return {invalidGrName: true};
      }
      if (control.value && (new RegExp("[*$&%_+~^,<>{}():;=?@#|\\[\\]]", "i")).test(control.value) || !(new RegExp("[\x00-\x7F]", "i")).test(control.value)) {
        return {invalidGrName: true};
      }
    }
  }

  public static matchWithValidator(toControlName: string) {
    let ctrl: FormControl;
    let toCtrl: FormControl;
    return function matchWith(control: FormControl): { [key: string]: any } {

      if (!control.parent) {
        return null;
      }

      if (!ctrl) {
        ctrl = control;
        toCtrl = control.parent.get(toControlName) as FormControl;

        if (!toCtrl) {
          return null;
        }

        toCtrl.valueChanges.subscribe(() => {
          ctrl.updateValueAndValidity();
        });
      }

      if (ctrl.value !== "" && toCtrl.value !== ctrl.value) {
        return {
          matchWith: true
        };
      }
      return null;
    };
  }

  public static validateName(control: FormControl): { [key: string]: any } {

    const value = control.value;
    if (!AppUtils.isUndefinedOrNull(value)) {
      if (!(new RegExp("^[a-zA-Z]", "i")).test(value)) {
        return {"nameCheck": true};
      }

      if ((new RegExp("[*$&%_+~^,<>{}():;=?@#|\\[\\]]", "i")).test(value) || !(new RegExp("[\x00-\x7F]", "i")).test(value)) {
        return {"nameCheck": true};
      }
    }
    return null;
  }
}
