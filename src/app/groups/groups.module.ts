import {NgModule} from '@angular/core';
import { LayoutGroupComponent } from './components/layout-group/layout-group.component';
import {SharedModule} from '../shared/shared.module';
import {GroupsRoutingModule} from './groups-routing.module';
import { CreateGroupComponent } from './components/create-group/create-group.component';

@NgModule({
  declarations: [LayoutGroupComponent, CreateGroupComponent],
  imports: [
    SharedModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule {

}
