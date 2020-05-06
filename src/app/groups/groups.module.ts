import {NgModule} from '@angular/core';
import { LayoutGroupComponent } from './components/layout-group/layout-group.component';
import {SharedModule} from '../shared/shared.module';
import {GroupsRoutingModule} from './groups-routing.module';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { StudentsComponent } from './components/students/students.component';


@NgModule({
  declarations: [LayoutGroupComponent, CreateGroupComponent, MyGroupsComponent, AssignmentsComponent, StudentsComponent],
  imports: [
    SharedModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule {

}
