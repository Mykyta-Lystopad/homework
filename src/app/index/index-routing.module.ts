import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutIndexComponent} from './components/layout-index/layout-index.component';

import {ResPasswordComponent} from './components/res-password/res-password.component';
import {RegisterComponent} from './components/register/register.component';
import {IndexComponent} from './components/index/index.component';

const routes: Routes = [
  {
    path: '', component: LayoutIndexComponent, children: [
      {path: '', redirectTo: '/index', pathMatch: 'full'},
      {path: 'index', component: IndexComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'res-password', component: ResPasswordComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexRoutingModule {

}

