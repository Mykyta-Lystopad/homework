import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../core/models';
import {ApiService, ProfilesService, UserService} from '../../../core/services';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  public curentUser: User;

  form: FormGroup;

  public openChangeBlock: boolean;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private profileService: ProfilesService
  ) {
  }

  ngOnInit() {
    this.openChangeBlock = true;
    this.userSub = this.userService.currentUser
      .subscribe(res => {
        this.curentUser = res;
      });

    this.form = new FormGroup({
      firstName: new FormControl(this.curentUser.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(this.curentUser.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(this.curentUser.email, [Validators.required, Validators.email, Validators.maxLength(50)]),

    });
  }


  ngOnDestroy() {
    this.openChangeBlock = false;
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      email: this.form.value.email,
    };
    /*
    this.profileService.updateInfoUser(user).subscribe(res => {
    })
*/
  }
}
