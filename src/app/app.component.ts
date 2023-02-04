import {Component, OnInit} from '@angular/core';
import {UserService} from './core/services';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.ngxService.start();
    if (this.userService.populate()) {

    } else {
      this.ngxService.stop();
    }


  }
}
