import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppLoaderModule} from './app-loader.module';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {NgxPaginationModule} from 'ngx-pagination';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {SignInComponent} from './shared/components/sign-in/sign-in.component';
import {ResPasswordComponent} from './shared/components/res-password/res-password.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SignInComponent,
    ResPasswordComponent


  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    AppLoaderModule,
    NgxUiLoaderModule,
    NgxPaginationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
