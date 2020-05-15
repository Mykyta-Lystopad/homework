import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {map} from "rxjs/operators";


@Injectable()
export class RoleService {

  constructor(private apiService: ApiService) {
  }

  getUserGroups(role: string){
    return this.apiService.get(`api/profile/${role ==='teacher'? 'my':'user'}Groups`)
      .pipe(map(response => {
        if ( role ==='teacher')return response.data.collection;
        else  return response.data;
      }))
  }

}
