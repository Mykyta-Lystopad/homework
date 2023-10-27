import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SolutionLayoutComponent} from './components/solution-layout/solution-layout.component';
import {SolutionsComponent} from './components/solutions/solutions.component';
import {SolutionMessagesComponent} from './components/solution-messages/solution-messages.component';


const routes: Routes = [
  {
    path: '', component: SolutionLayoutComponent, children: [
      {path: '', redirectTo: 'solutions', pathMatch: 'full'},
      {path: 'solutions', component: SolutionsComponent},
      {path: 'solution-messages', component: SolutionMessagesComponent}
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionRoutingModule {
}
