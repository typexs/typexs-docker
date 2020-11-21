// generated by @typexs/ng
import {APP_ROUTES} from './routes';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ModuleWithProviders, Type} from '@angular/core';
import {
  AdminModule,
  BaseAdminThemeModule,
  BaseModule,
  FormsModule,
  NavigatorModule,
  StorageModule,
  ViewsModule
} from '@typexs/ng-base';
import {HttpClientModule} from '@angular/common/http';
import {DockerModule} from '../docker/module';


export const APP_MODULES: Array<Type<any> | ModuleWithProviders | any[]> = [
  BrowserModule,
  HttpClientModule,
  NavigatorModule,
  FormsModule,
  ViewsModule,
  RouterModule.forRoot(APP_ROUTES),
  AdminModule,
  BaseModule.forRoot(),
  BaseAdminThemeModule,
  StorageModule,
  DockerModule

];