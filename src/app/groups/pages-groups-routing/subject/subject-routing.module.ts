import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SubjectLayoutComponent} from './components/subject-layout/subject-layout.component';
import {MySubjectComponent} from './components/my-subject/my-subject.component';

const routes: Routes = [
  {
    path: '', component: SubjectLayoutComponent, children: [
      {path: '', redirectTo: 'mySubject', pathMatch: 'full'},
      {path: 'mySubject', component: MySubjectComponent}
    ],
  },
  {path: 'assignments', loadChildren: () => import('../assignments/assignments.module').then(m => m.AssignmentsModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
