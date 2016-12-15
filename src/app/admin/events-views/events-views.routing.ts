import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { EventsViewsCenterComponent } from './events-views-center/events-views-center.component';
import { EventsViewsListComponent } from './events-views-list/events-views-list.component';
import { EventsViewsFormComponent } from './events-views-form/events-views-form.component';
import { EventsViewsResolve } from './events-views-resolve.guard';
import { EventsViewsListResolve } from './events-views-list-resolve.guard';

export const eventsViewsRoutes: Routes = [
  {
    path: '', component: EventsViewsCenterComponent, children: [
      {
        path: '',
        component: EventsViewsListComponent,
        resolve: { list: EventsViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: EventsViewsCenterComponent, children: [
      {
        path: '',
        component: EventsViewsListComponent,
        resolve: { list: EventsViewsListResolve }
      },
      {
        path: '',
        component: EventsViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: EventsViewsCenterComponent, children: [
      {
        path: '',
        component: EventsViewsListComponent,
        resolve: { list: EventsViewsListResolve }
      },
      {
        path: '',
        component: EventsViewsFormComponent,
        resolve: { eventsViews: EventsViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const eventsViewsRouting = RouterModule.forChild(eventsViewsRoutes);
