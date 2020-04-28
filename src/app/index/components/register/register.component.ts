import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserResponseModel, User} from '../../../core/models';
import {Router} from '@angular/router';
import {ApiService, UserService} from '../../../core/services';


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
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });

  }


  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.apiService.post('api/auth/register', user).subscribe((res: UserResponseModel) => {
        if (res.success) {
          this.userService.setAuth(res.data);
          this.router.navigate([`/user/${res.data.id}`]);
        }


        this.form.reset();
      }
    );
  }
}
