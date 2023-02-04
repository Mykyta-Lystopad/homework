import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutGroupComponent} from './components/layout-group/layout-group.component';
import {StudentsComponent} from "./components/students/students.component";
import {MyGroupsComponent} from "./components/my-groups/my-groups.component";
import {CreateGroupComponent} from "./components/create-group/create-group.component";
import {EditGroupComponent} from "./components/edit-group/edit-group.component";
import {NewGroupComponent} from "./components/new-group/new-group.component";


const routes: Routes = [
  {
    path: '', component: LayoutGroupComponent, children: [
      {
        path: 'edit', component: CreateGroupComponent
      },
      {
        path:'edit/newGroup', component: NewGroupComponent
      },
      {
        path: 'edit/:id', component: EditGroupComponent
      },
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
        ],

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
