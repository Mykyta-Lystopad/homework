
//import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {AssignmentsRoutingModule} from './assignments-routing.module';
import {NgModule} from '@angular/core';
import {AssignmentComponent} from './assignment/assignment.component';
import {AssignmentsComponent} from './assignments/assignments.component';
import {ProblemComponent} from './problem/problem.component';
import {MessageComponent} from './message/message.component';
import {AttachmentComponent} from './attachment/attachment.component';
import {SolutionComponent} from './solution/solution.component';
import {LayoutAssignmentsComponent} from "./layout-assignments/layout-assignments.component";
import {CommonModule} from "@angular/common";
import { AttachmentsComponent } from './attachments/attachments.component';

@NgModule({
  declarations: [
    LayoutAssignmentsComponent,
    AssignmentComponent,
    AssignmentsComponent,
    MessageComponent,
    ProblemComponent,
    AttachmentComponent,
    SolutionComponent,
    AttachmentsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AssignmentsRoutingModule, 

    //FormsModule, 
   // BsDatepickerModule.forRoot(),
   // DatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class AssignmentsModule {

}
