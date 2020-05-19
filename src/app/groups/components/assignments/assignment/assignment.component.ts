import { Location } from '@angular/common';
import { Problem } from './../../../../core/models/problem.model';
import {User} from '../../../../core/models';
import {AssignmentModel} from '../../../../core/models/assignmentModel';
import {Assignment} from '../../../../core/models/assignment.model';
import {Component, OnInit} from '@angular/core';
import {AssignmentService} from '../../../../core/services/assigntments.service';
import {ActivatedRoute} from '@angular/router';
import {AttachmentService, UserService} from '../../../../core/services';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  showCreateProblem = false;
  showEditAssignment = false;
  user: User;
  private assignId: number;
  currentProblem: Problem = {
    id : undefined,
    title: '',
    description: '',
  }
  assign: Assignment = new AssignmentModel(this.assignId);
  attachments: [][];
  currentAssign: Assignment = new AssignmentModel(this.assignId);


  constructor(
    private attachmentService: AttachmentService,
    route: ActivatedRoute,
    private assingSvc: AssignmentService,
    private userSvc: UserService,
    private location: Location
    )
  {
    this.assignId = +route.snapshot.params.id;
    this.currentProblem.assignment_id = this.assignId;
    this.currentAssign.id = this.assignId;
    this.assignId = +route.snapshot.params.id;
    this.user = this.userSvc.getCurrentUser();
  }


  ngOnInit() {
    this.assingSvc.getAssign(this.assignId, this.user.id).subscribe(res => {
      this.assign = res['data'];

      this.attachments = this.attachmentService.createDoubleArray(res['data'].attachments, 5);

    });

  }
  assignDelete(){
    if (confirm(`Do you really want to delete ${this.assign.title} assignment?`))
    this.assingSvc.deleteAssignment(this.assignId).subscribe(res => {
    this.location.back();
    })
  }
  showEditAssign(){
    this.showEditAssignment = !this.showEditAssignment
    this.currentAssign.title = this.assign.title
    this.currentAssign.description = this.assign.description
  }
  assignmentEdit(){
    this.assingSvc.editAssignment(this.currentAssign).subscribe(res =>{
      this.assign.title = res.data.title
      this.assign.description = res.data.description
      this.showEditAssignment = false;
    })
  }


  createProblem(){
    this.assingSvc.createProblem(this.currentProblem).subscribe(res => {
      if (res.success === true){
        this.assign.problems.push(res['data'])
      }
    })
      this.showCreateProblem = !this.showCreateProblem
      this.currentProblem.title = ''
      this.currentProblem.description = ''
  }
  probDel(probId: number){
    this.assingSvc.deleteProblem(probId).subscribe(res => {
        let index = this.assign.problems.findIndex(prob => prob.id === probId)
        this.assign.problems.splice(index,1)
    })
  }
  probEdit(prob: Problem){
    this.assingSvc.updateProblem(prob).subscribe(res => {
      if (res.success){
        let index = this.assign.problems.findIndex(prob => prob.id == res.data.id)
        this.assign.problems[index].title = res.data.title;
        this.assign.problems[index].description = res.data.description;
      }
    })
  }

}
