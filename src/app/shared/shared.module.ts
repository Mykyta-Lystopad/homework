import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShowAuthedDirective} from './directives/show-authed.directive';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    AlertComponent
  ],

})

export class SharedModule {

}
