import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutGroupComponent} from './components/layout-group/layout-group.component';
import {CreateGroupComponent} from './components/create-group/create-group.component';
import {MyGroupsComponent} from './components/my-groups/my-groups.component';
import {AuthGuard} from '../core/services';




const routes: Routes = [
  {
    path: '', component: LayoutGroupComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'myGroups', pathMatch: 'full'},
      {path: 'myGroups',  component: MyGroupsComponent},
      {path: 'createGroup',  component: CreateGroupComponent},
    ]
  },
  {path: 'subject', loadChildren: () => import('./pages-groups-routing/subject/subject.module').then(m => m.SubjectModule)},




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
