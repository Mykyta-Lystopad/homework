import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AssignmentsRoutingModule} from './assignments-routing.module';
import {AssignmentsLayoutComponent} from './components/assignments-layout/assignments-layout.component';
import {MyAssignmentsComponent} from './components/my-assignments/my-assignments.component';

@NgModule({
  declarations: [AssignmentsLayoutComponent, MyAssignmentsComponent],
  imports: [
    SharedModule,
    AssignmentsRoutingModule
  ]
})
export class AssignmentsModule {

}
