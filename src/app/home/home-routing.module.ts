import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {LayoutHomeComponent} from './components/layout-home/layout-home.component';
import {UserComponent} from './components/user/user.component';
import {AuthGuard} from '../core/services';

const routes: Routes = [
  {
    path: ':id', component: LayoutHomeComponent, children: [
      {path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},
      {path: 'groups', loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule)},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {



}
