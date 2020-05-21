import { User } from './../models/user.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';

import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  storage: any = window.localStorage;
  readonly KEY: string = 'user-role';

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
   populate(): boolean {

    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.token) {
      this.apiService.get('api/profile').subscribe(
          data => {
            this.setAuth(data.data, this.jwtService.token);
            this.router.navigate([`groups`]);
            return true;
          },
          err => {
            this.purgeAuth();
            return false;
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      return false;
    }
  }

  setAuth(user: User, token?: string) {
    // Save JWT sent from server in localstorage
    if (token) {
      this.jwtService.setToken(token);
    } else {
      this.jwtService.setToken(user.api_token);
    }
   // Set role
    this.storage.setItem(this.KEY, user.role);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  isAuth(): boolean {
    return !!this.jwtService.token;
  }

  logout() {
    if (this.isAuth()) {
      this.apiService.post('api/auth/logout', '').subscribe(res => {
        if (res) {
          this.purgeAuth(); // стирание куки и стримов
          this.router.navigate(['/']); // редирект на главную
        }

      });
    }
    this.purgeAuth(); // стирание куки и стримов
    this.router.navigate(['/']); // редирект на главную
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', {user})
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

  getUserById(userId: number){

  }


}
