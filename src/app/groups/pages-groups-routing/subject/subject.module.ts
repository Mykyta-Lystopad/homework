import {NgModule} from '@angular/core';
import { SubjectLayoutComponent } from './components/subject-layout/subject-layout.component';
import {SharedModule} from '../../../shared/shared.module';
import {SubjectRoutingModule} from './subject-routing.module';
import { MySubjectComponent } from './components/my-subject/my-subject.component';

@NgModule({
  declarations: [SubjectLayoutComponent, MySubjectComponent],
  imports: [
    SharedModule,
    SubjectRoutingModule
  ],

})
export class SubjectModule {

}
