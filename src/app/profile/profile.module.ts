import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import { LayoutProfileComponent } from './components/layout-profile/layout-profile.component';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [LayoutProfileComponent]
})
export class ProfileModule {

}
