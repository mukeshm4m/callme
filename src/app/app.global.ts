import {Injectable} from "@angular/core";
import {constants} from "./app.constants";

@Injectable()
export class AppGlobal {
  
  private static direction: string = "ltr";
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
    let value = this.getData(key);
    this.removeData(key);
    return value;
  }
  
  public static removeData(key: string) {
    if (this.hasData(key)) {
      delete this.data[key];
    }
  }
  
  public static setLanguage(lang) {
    
    let langObj = {language: lang, direction: 'ltr', ltr: true};
    
    if(lang == "ar") {
      langObj.direction = 'rtl';
      langObj.ltr = false;
    }
  
    //$('body').attr('dir', langObj.direction);
    
    localStorage.setItem(constants.localStorageLanguageKey, JSON.stringify(langObj));
  }
  
  public static getLanguage() {
    if(localStorage.getItem(constants.localStorageLanguageKey)) {
      return JSON.parse(localStorage.getItem(constants.localStorageLanguageKey));
    }
    
    return null;
  }
  
}
