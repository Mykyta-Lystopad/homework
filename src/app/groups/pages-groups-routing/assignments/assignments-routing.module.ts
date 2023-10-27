import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AssignmentsLayoutComponent} from './components/assignments-layout/assignments-layout.component';
import {MyAssignmentsComponent} from './components/my-assignments/my-assignments.component';


const routes: Routes = [
  {
    path: '', component: AssignmentsLayoutComponent, children: [
      {path: '' , redirectTo: 'myAssignments', pathMatch: 'full'},
      {path: 'myAssignments' , component: MyAssignmentsComponent},
    ]
  },
  {path: 'solution', loadChildren: () => import('../solution/solution.module').then(m => m.SolutionModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule {
}
