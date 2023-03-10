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
import { ImageDrawingComponent } from './image-drawing/image-drawing.component';
import {NgxImageCompressService} from 'ngx-image-compress';


@NgModule({
  declarations: [
    LayoutAssignmentsComponent,
    AssignmentComponent,
    AssignmentsComponent,
    MessageComponent,
    ProblemComponent,
    AttachmentComponent,
    SolutionComponent,
    AttachmentsComponent,
    ImageDrawingComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AssignmentsRoutingModule, 
  ],
  exports: [ 
    ImageDrawingComponent,
  ],
  providers: [
    DatePipe,
    NgxImageCompressService
  ]
})
export class AssignmentsModule {

}
