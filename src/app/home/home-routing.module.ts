import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {LayoutHomeComponent} from './components/layout-home/layout-home.component';
import {UserComponent} from './components/user/user.component';
import {AuthGuard} from '../core/services';

const routes: Routes = [
  {
    path: '', component: LayoutHomeComponent, children: [
      {path: ':id', component: UserComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
