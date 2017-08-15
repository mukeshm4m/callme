import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, Injector, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {BusyConfig, BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//third party
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ChartsModule} from "ng2-charts";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ToasterModule} from "angular2-toaster";
import {SimpleTimer} from "ng2-simple-timer";


import {HttpFactory} from "./shared/factories/http.factory";
//Modules
import {AppRouting} from "./app.routing";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
// Components
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {ErrorComponent} from "./error/error.component";
import {SessiontimeoutComponent} from "./shared/components/dialogs/sessiontimeout/sessiontimeout.component";
//Services
import {CommonService} from "./shared/services/common.service";
import {AuthService} from "./shared/services/auth.service";
// Utilities
import {EmitterUtil} from "./shared/utils/emitter.util";
import {SessiontimeoutUtil} from "./shared/utils/sessiontimeout.util";
//Guards
import {AuthGuard} from "./shared/guards/auth.guard";
import {PublicComponent} from "./shared/components/layout/public/public.component";
import {SecureComponent} from "./shared/components/layout/secure/secure.component";
import {IsvalidPipe} from "./shared/pipes/isvalid.pipe";
import {TruncatePipe} from "./shared/pipes/truncate.pipe";
import {RemoveSpacesPipe} from "./shared/pipes/removespaces.pipe";
import {PatternDirective} from "./shared/directives/pattern/pattern.directive";
import {ErrorHandlingService} from "./shared/services/error-handling.service";
import {DatexPipe} from "./shared/pipes/datex.pipe";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SoundComponent } from './sound/sound.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { MyCampaignComponent } from './dashboard/my-campaign/my-campaign.component';
import { MyContactListComponent } from './dashboard/my-contact-list/my-contact-list.component';
import { MySoundComponent } from './dashboard/my-sound/my-sound.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SupportComponent } from './support/support.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AccountComponent } from './account/account.component';
import { DonutChartComponent } from './shared/components/donut-chart/donut-chart.component';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    PublicComponent,
    SecureComponent,
    IsvalidPipe,
    TruncatePipe,
    RemoveSpacesPipe,
    DatexPipe,
    SessiontimeoutComponent,
    PatternDirective,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    DashboardComponent,
    SoundComponent,
    MyAccountComponent,
    MyCampaignComponent,
    MyContactListComponent,
    MySoundComponent,
    ContactListComponent,
    SupportComponent,
    CampaignsComponent,
    AccountComponent,
    DonutChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    BusyModule.forRoot(<BusyConfig>{
        message: 'Loading...',
        backdrop: true,
        template: '<div class="loader">{{message}}</div>',
        wrapperClass: 'ng-busy'
      }
    ),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRouting,
    ChartsModule
  ],
  providers: [
    CommonService,
    AuthService,
    AuthGuard,
    SessiontimeoutUtil,
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    SimpleTimer,
    EmitterUtil,
    {provide: ErrorHandler, useClass: ErrorHandlingService}
  ],
  bootstrap: [AppComponent],
  entryComponents: [SessiontimeoutComponent]
})
export class AppModule {
  /**
   * Allows for retrieving services using `AppModule.injector.get(MyService)`
   * This is good to prevent injecting the service as constructor parameter.
   **/
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
