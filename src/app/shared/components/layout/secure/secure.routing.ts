import {Routes} from "@angular/router";
import {DashboardComponent} from "../../../../dashboard/dashboard.component";
import {SoundComponent} from "../../../../sound/sound.component";
import {CampaignsComponent} from "../../../../campaigns/campaigns.component";
import {ContactListComponent} from "../../../../contact-list/contact-list.component";
import {AccountComponent} from "../../../../account/account.component";
import {SupportComponent} from "../../../../support/support.component";

export const SECURE_ROUTES: Routes = [

    {
        path: 'home',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Dashboard'}
    },
    {
        path: 'sound',
        component: SoundComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Sounds'}
    },
    {
        path: 'campaigns',
        component: CampaignsComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Campaigns'}
    },
    {
        path: 'contactlist',
        component: ContactListComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Contact List'}
    },
    {
        path: 'account',
        component: AccountComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Account Information'}
    },
    {
        path: 'support',
        component: SupportComponent,
        pathMatch: 'full',
        data: {title: 'Call My List | Support'}
    }
];
