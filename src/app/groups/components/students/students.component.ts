import {Component, Input, OnInit} from '@angular/core';
import {RelationshipsService} from '../../../core/services/relationships.service';
import {User} from '../../../core/models';
import {ApiService} from '../../../core/services';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  users: User[] = [];
  id$ = this.relationshipsService.getIdObservable();


  constructor(
    private relationshipsService: RelationshipsService,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.id$.subscribe(idGroup => {
      if (idGroup === null) { return; }
      this.apiService.get(`api/groups/${idGroup}`)
        .pipe(map(response => {
          return response.data.users;
        })).subscribe(users => {
        this.users = users;
      });
    });
  }

}
