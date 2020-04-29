import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutProfileComponent} from './components/layout-profile/layout-profile.component';


const routes: Routes = [{
  path: '', component: LayoutProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule {

}
