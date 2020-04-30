import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserResponseModel, User} from '../../../core/models';
import {ApiService, UserService} from '../../../core/services';
import {Router} from '@angular/router';

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
    private userService: UserService
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
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.apiService.post('api/auth/login', user).subscribe((res: UserResponseModel) => {
      if(res.success){
        this.userService.setAuth(res.data);
        this.router.navigate([`/user/${res.data.id}`]);
      }
      this.form.reset();
    });
  }

  redirectRegister() {
    this.router.navigate(['/register']);
  }
}
