import {NgModule} from '@angular/core';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { SolutionLayoutComponent } from './components/solution-layout/solution-layout.component';
import { SolutionMessagesComponent } from './components/solution-messages/solution-messages.component';
import {SharedModule} from '../../../shared/shared.module';
import {SolutionRoutingModule} from './solution-routing.module';

@NgModule({
  declarations: [SolutionsComponent, SolutionLayoutComponent, SolutionMessagesComponent],
  imports: [
    SharedModule,
    SolutionRoutingModule
  ]
})
export class SolutionModule {

}
