import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {SignInComponent} from './shared/components/header/components/sign-in/sign-in.component';
import {ResPasswordComponent} from './shared/components/res-password/res-password.component';
import {DropdownMenuComponent} from './shared/components/header/components/dropdown-menu/dropdown-menu.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SignInComponent,
    ResPasswordComponent,
    DropdownMenuComponent,
    // BrowserAnimationsModule,
    // BsDatepickerModule.forRoot(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    NgbModule

  ],
  bootstrap: [AppComponent, ]
})
export class AppModule {
}
