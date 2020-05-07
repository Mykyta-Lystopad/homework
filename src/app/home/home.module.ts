import {NgModule} from '@angular/core';
import {LayoutHomeComponent} from './components/layout-home/layout-home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import { UserComponent } from './components/user/user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
    declarations: [
        LayoutHomeComponent,
        UserComponent,
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule {

}
