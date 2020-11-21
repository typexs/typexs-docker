import {Routes} from '@angular/router';
import {ImagesListComponent} from './components/images/list.component';
import {AuthGuardService} from '@typexs/ng-base';
import {ContainerListComponent} from './components/containers/list.component';


export const APP_ROUTES: Routes = [
  {
    path: 'docker/images',
    component: ImagesListComponent,
    canActivate: [AuthGuardService],
    data: {label: 'Images'},

  },
  {
    path: 'docker/container',
    component: ContainerListComponent,
    data: {label: 'Containers'},
  },
];





