import {Injectable} from "@angular/core";
import {constants} from "./app.constants";

@Injectable()
export class AppGlobal {
  
  private static data = {};
  
  public static hasData(key: string): boolean {
    return this.data.hasOwnProperty(key);
  }
  
  public static addData(key: string, value: any) {
    this.data[key] = value;
  }
  
  public static getData(key: string) {
    if (this.hasData(key)) {
      return this.data[key];
    }
    return null;
  }
  
  public static getDataAndRemove(key: string) {
    const value = this.getData(key);
    this.removeData(key);
    return value;
  }
  
  public static removeData(key: string) {
    if (this.hasData(key)) {
      delete this.data[key];
    }
  }
}
