import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserResponseModel, User} from '../../../core/models';
import {Router} from '@angular/router';
import {ApiService, UserService} from '../../../core/services';
import {AlertService} from '../../../core/services/alert.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private Alert: AlertService,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      role: new FormControl(null, Validators.required)
    });

  }


  submit() {
    if (this.form.invalid) {
      return;
    }
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    const user: User = {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.form.value.role,
      role_comment: 'student, parent, teacher, tutor'

    };

    this.apiService.post('api/auth/register', user).subscribe((res: UserResponseModel) => {
        if (res.success) {
          this.userService.setAuth(res.data);
          this.ngxService.stop();
          this.router.navigate([`groups`]);
          this.Alert.success('Вы успешно зарегистрировались');
        }

      }
    );
    this.form.reset({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName
    });
  }
}
