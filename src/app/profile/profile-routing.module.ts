import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutProfileComponent} from './components/layout-profile/layout-profile.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';


const routes: Routes = [{
  path: '', component: LayoutProfileComponent, children: [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: '', component: ProfileComponent},
    {path: 'settings', component: ProfileSettingsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {

}
