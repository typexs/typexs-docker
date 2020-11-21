import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {APP_MODULES} from './app.used.modules';
import {DemosComponent} from './demos/demos.component';
import {AuthService, NavigatorService, StorageService} from '@typexs/ng-base';


@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
  ],
  imports: APP_MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authService: AuthService,
              private navigatorService: NavigatorService,
              private storageService: StorageService) {

    storageService.setNgUrlPrefix('/admin/storage');
    this.navigatorService.addGroupEntry('admin/storage/.*', {label: 'Storage', group: 'admin'});
    this.navigatorService.addGroupEntry('admin/docker/.*', {label: 'Docker', group: 'admin'});
    authService.init();
  }


}
