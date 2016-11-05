import { DocumentsCanActivate } from './main/pages/documents/documents-can-activate';
import { EventsCanActivate } from './main/pages/events/events-can-activate';
import { DocumentsComponent } from './main/pages/documents/documents.component';
import { EventsComponent } from './main/pages/events/events.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { PageComponent } from './main/page/page.component';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './guards/can-activate-if-user.guard';
import { PagesResolve } from './main/pages/pages-resolve.guard';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/main'
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  {
    path: 'main', component: MainCenterComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfUser],
    children: [
      { path: '', pathMatch: 'full' },
      {
        path: ':id',
        component: PageComponent,
        resolve: { data: PagesResolve },
        children: [
          { path: '', component: EventsComponent, canActivate: [ EventsCanActivate ] },
          { path: '', component: DocumentsComponent, canActivate: [ DocumentsCanActivate ] }
        ]
      }
    ]
  },
];

export const routing = RouterModule.forRoot(appRoutes,
  { preloadingStrategy: PreloadAllModules });
  