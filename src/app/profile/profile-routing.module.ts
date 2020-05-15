import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutProfileComponent} from './components/layout-profile/layout-profile.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {AuthGuard} from '../core/services';


const routes: Routes = [
  {path: '', component: LayoutProfileComponent, children: [
      {path: '', component: ProfileComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: ProfileSettingsComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: '/'}
    ]}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {

}
