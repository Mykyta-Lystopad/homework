import {User} from '../../../../core/models';
import {AssignmentModel} from '../../../../core/models/assignmentModel';
import {Assignment} from '../../../../core/models/assignment.model';
import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../../../../core/services/assigntments.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../core/services";


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  private assignId: number;
  user: User;
  assign: Assignment = new AssignmentModel(this.assignId);


  constructor(
    route: ActivatedRoute,
    private assingSvc: AssignmentService,
    private userSvc: UserService)
  {
    this.assignId = +route.snapshot.params.id
    this.user = this.userSvc.getCurrentUser();
  }


  ngOnInit(): void {
    this.assingSvc.getAssign(this.assignId, this.user.id).subscribe(res => {
      this.assign = res['data']
    })

  }

}
