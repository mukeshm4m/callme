import {RouterModule, Routes} from "@angular/router";

import {ErrorComponent} from "./error/error.component";

import {PublicComponent} from "./shared/components/layout/public/public.component";
import {SecureComponent} from "./shared/components/layout/secure/secure.component";

import {PUBLIC_ROUTES} from "./shared/components/layout/public/public.routing";
import {SECURE_ROUTES} from "./shared/components/layout/secure/secure.routing";

const AP_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: {title: 'Call My List | Login'}
  },
  {
    path: '',
    component: PublicComponent,
    data: {title: 'Call My List'},
    children: PUBLIC_ROUTES
  },
  {
    path: '',
    component: SecureComponent,
    data: {title: 'Call My List'},
    children: SECURE_ROUTES
  },
  {
    path: 'error/:id',
    pathMatch: 'full',
    component: ErrorComponent,
    data: {title: 'Call My List - Error'}
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {title: 'Call My List - Page Not Found'}
  }
];

/*, {useHash: true}*/
export const AppRouting = RouterModule.forRoot(AP_ROUTES);
