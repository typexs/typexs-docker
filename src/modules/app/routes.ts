import {Routes} from '@angular/router';
import {DemosComponent} from './demos/demos.component';
import {
  AdminComponent,
  AuthGuardService,
  StorageModule,
  TasksModule
} from '@typexs/ng-base';
import {DockerModule} from '../docker/module';


export const APP_ROUTES: Routes = [
  {
    path: 'demo',
    component: DemosComponent,
    data: {label: 'Demo'},
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuardService],
    data: {label: 'Admin', group: 'admin'},
    children: [
      ...DockerModule.getRoutes(),
      ...TasksModule.getRoutes(),
      ...StorageModule.getRoutes(),
    ]
  },
  {
    path: '', redirectTo: 'demo', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'demo'
  }

];





