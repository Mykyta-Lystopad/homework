import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from 'ngx-ui-loader';
import {NgModule} from '@angular/core';

const colorLoader: string = '#3498DB'; // change color loader All

const ngxUiLoaderConfig: NgxUiLoaderConfig = {

  bgsColor: colorLoader,
  blur: 10,
  bgsSize: 100,
  pbThickness: 5,
  fgsColor: colorLoader, // spinner color
  pbColor: colorLoader, // load color
  bgsType: SPINNER.cubeGrid, // background spinner type
  fgsType: SPINNER.cubeGrid, // foreground spinner type
};

@NgModule({
  imports: [
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],

})
export class AppLoaderModule {

}



