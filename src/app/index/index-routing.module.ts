import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutIndexComponent} from './components/layout-index/layout-index.component';

import {ResPasswordComponent} from '../shared/components/res-password/res-password.component';
import {RegisterComponent} from './pages-index-routing/register/register.component';
import {IndexComponent} from './pages-index-routing/index/index.component';

const routes: Routes = [
  {
    path: '', component: LayoutIndexComponent, children: [
      {path: '', redirectTo: 'index', pathMatch: 'full'},
      {path: 'index', component: IndexComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'res-password', component: ResPasswordComponent},

    ],
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexRoutingModule {

}

