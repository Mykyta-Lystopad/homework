import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutGroupComponent} from './components/layout-group/layout-group.component';
import {CreateGroupComponent} from './components/create-group/create-group.component';




const routes: Routes = [
  {
    path: '', component: LayoutGroupComponent, children: [
      {path: '', redirectTo: 'createGroup', pathMatch: 'full'},
      {path: 'createGroup',  component: CreateGroupComponent},
      /*{path: 'subject', loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule)},*/
    ],
  },




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
