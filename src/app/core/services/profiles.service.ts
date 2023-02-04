import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import {Profile, User} from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  updateInfoUser(user: User){
    return this.apiService.put('api/profile', user);
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
}

}
