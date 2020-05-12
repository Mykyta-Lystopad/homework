import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models';
import {ApiService} from '../../../core/services';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  idGroup: number
  users: User[] = [];

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(idGroup => {
      this.idGroup = idGroup.id
      this.apiService.get(`api/groups/${idGroup.id}`)
        .subscribe(response => {
          this.users = response.data.users;
        });
    });
  }

}
