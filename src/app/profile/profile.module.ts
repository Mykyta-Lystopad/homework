import { NgxImageCompressService } from 'ngx-image-compress';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import { LayoutProfileComponent } from './components/layout-profile/layout-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    NgxUiLoaderModule
  ],

  declarations: [LayoutProfileComponent, ProfileComponent, ProfileSettingsComponent],
  providers: [
    NgxImageCompressService
  ]
})
export class ProfileModule {

}
