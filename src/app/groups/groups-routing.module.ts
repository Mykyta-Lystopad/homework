import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutGroupComponent} from './components/layout-group/layout-group.component';
import {CreateGroupComponent} from './components/create-group/create-group.component';
import {MyGroupsComponent} from './components/my-groups/my-groups.component';




const routes: Routes = [
  {
    path: '', component: LayoutGroupComponent, children: [
      {path: '', redirectTo: 'myGroups', pathMatch: 'full'},
      {path: 'myGroups',  component: MyGroupsComponent},
      {path: 'createGroup',  component: CreateGroupComponent},
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
