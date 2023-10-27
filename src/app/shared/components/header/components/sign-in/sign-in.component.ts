import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserResponseModel, User} from '../../../../../core/models';
import {AlertService, ApiService, UserService} from '../../../../../core/services';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private Alert: AlertService,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.ngxService.start();
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.router.navigate([`groups`]);

    this.apiService.post('api/auth/login', user).subscribe((res: UserResponseModel) => {

      if (res.success) {
        this.userService.setAuth(res.data);
        this.router.navigate([`groups`]);
        this.ngxService.stop();
      }
    }
    );
    this.ngxService.stop();
  }



  redirectRegister() {
    this.router.navigate(['/register']);
  }
}

