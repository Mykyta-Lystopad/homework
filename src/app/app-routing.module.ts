import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';


const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
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
