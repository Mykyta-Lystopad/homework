import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LayoutAssignmentsComponent } from './layout-assignments/layout-assignments.component';
import {CommonModule} from "@angular/common";


const routes: Routes = [
  {
    path: '', component: LayoutAssignmentsComponent, children: [
      {path: '' , component: AssignmentsComponent},
      {path: 'assignments/:id' , component: AssignmentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  CommonModule],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule {}
