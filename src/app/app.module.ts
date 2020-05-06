import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {SignInComponent} from './shared/components/sign-in/sign-in.component';
import {RelationshipsService} from "./core/services/relationships.service";




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SignInComponent,


  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [RelationshipsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
