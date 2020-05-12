import {NgModule} from '@angular/core';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

import {LayoutIndexComponent} from './components/layout-index/layout-index.component';
import {RegisterComponent} from './pages-index-routing/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {IndexRoutingModule} from './index-routing.module';
import { IndexComponent } from './pages-index-routing/index/index.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LayoutIndexComponent,
    IndexComponent,
  ],
  imports: [
    SharedModule,
    IndexRoutingModule,
    NgxUiLoaderModule
  ]


})
export class IndexModule {

}
