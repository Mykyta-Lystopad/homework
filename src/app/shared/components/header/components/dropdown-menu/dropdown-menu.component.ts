import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../../../core/models';
import {NamesService, UserService} from '../../../../../core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  public curentUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    public nameServise: NamesService
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

  logout() {
    this.userService.logout();
  }
}
