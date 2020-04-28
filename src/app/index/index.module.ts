import {NgModule} from '@angular/core';

import {LayoutIndexComponent} from './components/layout-index/layout-index.component';
import {ResPasswordComponent} from './components/res-password/res-password.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {IndexRoutingModule} from './index-routing.module';
import { IndexComponent } from './components/index/index.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ResPasswordComponent,
    LayoutIndexComponent,
    IndexComponent,
  ],
  imports: [
    SharedModule,
    IndexRoutingModule
   ]


})
export class IndexModule {

}
