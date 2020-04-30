import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import { LayoutProfileComponent } from './components/layout-profile/layout-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [LayoutProfileComponent, ProfileComponent, ProfileSettingsComponent]
})
export class ProfileModule {

}
