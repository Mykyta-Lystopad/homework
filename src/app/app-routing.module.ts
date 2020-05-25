import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {CreateGroupComponent} from "./groups/components/create-group/create-group.component";


const routes: Routes = [
  {
    path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'editGroups', component: CreateGroupComponent
  },
  {
    path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {
    path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
