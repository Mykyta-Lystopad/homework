import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutGroupComponent} from './components/layout-group/layout-group.component';
import {StudentsComponent} from "./components/students/students.component";
import {MyGroupsComponent} from "./components/my-groups/my-groups.component";
import {AssignmentsComponent} from "./components/assignments/assignments/assignments.component";
import {AssignmentComponent} from "./components/assignments/assignment/assignment.component";


const routes: Routes = [
  {
    path: '', component: LayoutGroupComponent, children: [
      {
        path: '', component: MyGroupsComponent, children: [
          {path: ':id', component: StudentsComponent},
          {
            path: ':id/allAssignments/:id', loadChildren: () =>
              import('../groups/components/assignments/assignments.module').then(m => m.AssignmentsModule)
          },
          {
            path: ':id/student/:idStudent', loadChildren: () =>
              import('../groups/components/assignments/assignments.module').then(m => m.AssignmentsModule)
          },
        ]
      },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
