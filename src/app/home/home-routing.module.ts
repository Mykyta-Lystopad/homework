import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {LayoutHomeComponent} from './components/layout-home/layout-home.component';


const routes: Routes = [
  {
    path: '', component: LayoutHomeComponent, children: [
      {path: '', redirectTo: 'groups', pathMatch: 'full'},
      {path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},
      {path: 'groups', loadChildren: () => import('../groups/groups.module').then(m => m.GroupsModule)},

      {path: '**', redirectTo: '/'}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {



}

