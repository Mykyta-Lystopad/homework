import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptors/http.token.interceptor';

import {
  AlertService,
  ApiService,
  ArticlesService, AttachmentService,
  AuthGuard,
  CommentsService,
  JwtService,
  NamesService,
  ProfilesService,
  TagsService,
  UserService,
  RoleService,
  GroupsService
} from './services';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    AlertService,
    NamesService,
    RoleService,
    AttachmentService,
    GroupsService
  ],
  declarations: []
})
export class CoreModule {
}
