import {Injectable} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import * as _ from "underscore";
import {constants} from "../../app.constants";

@Injectable()
export class AppUtils {

  public static isBusinessLogicError(response): boolean {
    if (!AppUtils.isUndefinedOrNull(response) && response.statusCode == constants.errorCodes.businessRuleFailure) {
      return true;
    }
    return false;
  }

  public static getError(response): string {
    if (!AppUtils.isUndefinedOrNull(response) && !AppUtils.isUndefinedOrNull(response.errors) && response.errors.length > 0) {
      return response.errors[0].message.replace(/\\n/g, "<br>");
    } else {
      return "";
    }
  }

  public static isUndefinedOrNull(value): boolean {
    return (_.isUndefined(value) || _.isNull(value) || value.length === 0);
  }

  public static markAsDirty(group: FormGroup) {
    group.markAsDirty()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty();
      } else if (group.controls[i] instanceof FormGroup) {
        AppUtils.markAsDirty(<FormGroup>group.controls[i]);
      }
    }
  }

  public static deepCopy(to: Array<any>, from: Array<any>) {

    for (let i = 0; i < to.length; i++) {
      to.pop();
    }
    to.pop();
    for (let i = 0; i < from.length; i++) {
      to.push(from[i]);
    }
  }

  public static copyDataInForm(data, form) {
    Object.keys(data).forEach(name => {
      if (form.controls[name]) {
        form.controls[name].patchValue(data[name]);
      }
    });
  }

  public static enableForm(group: FormGroup) {
    for (let i in group.controls) {
      group.controls[i].enable();
    }
  }

  public static disableForm(group: FormGroup) {
    for (let i in group.controls) {
      group.controls[i].disable();
    }
  }

  public static copyObjectFields(newObject, oldObject) {
    Object.keys(newObject).forEach(name => {
      if (oldObject[name] || oldObject[name] == null) {
        oldObject[name] = newObject[name];
      }
    });
  }

  public static contains(criteriaName: string, array: any): boolean {
    let exists = false;

    if (!AppUtils.isUndefinedOrNull(array)) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === criteriaName) {
          exists = true;
          break;
        }
      }
    }

    return exists;
  }

}
