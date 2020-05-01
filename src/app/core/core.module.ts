import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  AlertService,
  ApiService,
  ArticlesService,
  AuthGuard,
  CommentsService,
  JwtService, NamesService,
  ProfilesService,
  TagsService,
  UserService
} from './services';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    AlertService,
    NamesService

  ],
  declarations: []
})
export class CoreModule { }
