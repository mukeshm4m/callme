import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {TranslateService} from "@ngx-translate/core";
import {constants} from "./app.constants";
import {ToasterConfig} from "angular2-toaster";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  toasterConfig = new ToasterConfig(constants.toasterConfig);
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title, private translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.addLangs(["en"]);
    this.translate.setDefaultLang('en');
    
    /* let langObj = AppGlobal.getLanguage();
    if (AppUtils.isUndefinedOrNull(langObj)) {
      AppGlobal.setLanguage('en');
    } else {
      this.translate.use(langObj.language);
      $('body').attr('dir', langObj.direction);
    } */
    
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
