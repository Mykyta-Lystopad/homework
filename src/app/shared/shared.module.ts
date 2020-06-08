import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShowAuthedDirective} from './directives/show-authed.directive';
import {AppLoaderModule} from '../app-loader.module';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlertComponent } from './components/header/components/alert/alert.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {ImageDrawingModule} from 'ngx-image-drawing';



@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppLoaderModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    NgbModule,
   // ImageDrawingModule
  ],
  declarations: [
    ShowAuthedDirective,
    AlertComponent,


  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShowAuthedDirective,
    AlertComponent,
    AppLoaderModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    NgbModule,
   // ImageDrawingModule
  ],

})

export class SharedModule {

}
