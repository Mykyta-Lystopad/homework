import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../core/models';
import {ApiService, UserService} from '../../../core/services';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , OnDestroy {

  private userSub: Subscription;
  public curentUser: User;


  constructor(
    private userService: UserService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.userSub = this.userService.currentUser
      .subscribe(res => {
        this.curentUser = res;

      });
  }




  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  settings() {

  }
}
