import {NgModule} from '@angular/core';
import {LayoutHomeComponent} from './components/layout-home/layout-home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';


@NgModule({
  declarations: [
    LayoutHomeComponent,
    SidebarComponent,

  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgxUiLoaderModule
  ]
})
export class HomeModule {

}
