import {NgModule} from '@angular/core';
import {APP_ROUTES} from './routes';
import {ImagesListComponent} from './components/images/list.component';
import {ContainerListComponent} from './components/containers/list.component';
import {CommonModule} from '@angular/common';
import {DockerService} from './docker.service';


@NgModule({
  declarations: [ImagesListComponent, ContainerListComponent],
  exports: [ImagesListComponent, ContainerListComponent],
  imports: [
    CommonModule
  ],
  providers: [DockerService]
})
export class DockerModule {

  static getRoutes() {
    return APP_ROUTES;
  }

  constructor() {

  }


}
