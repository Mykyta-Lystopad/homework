import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../core/services';
import {Subscriber, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../core/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  public curentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userSub = this.userService.currentUser
    .subscribe(res => {
      this.curentUser = res;
      console.log(res);
    });
  }




  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  logout() {
    this.userService.logout();

  }
}
