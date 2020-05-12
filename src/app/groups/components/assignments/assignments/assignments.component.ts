import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../../../../core/services/assigntments.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "../../../../core/models/assignment.model";
import {AssignmentModel} from "../../../../core/models/assignmentModel";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../core/services";



@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  form: FormGroup;
  assignments: Assignment[];
  group_id: number = 1;
  currentAssignment: Assignment = new AssignmentModel(this.group_id);

  constructor(
    private assignSvc: AssignmentService,
    private activeRoute: ActivatedRoute,
    private apiServive: ApiService
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(response => {
      this.group_id = response.id
    })

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
      description: new FormControl('', [Validators.minLength(3), Validators.maxLength(200)])
    })
    this.apiServive.get(`api/assignments?page=1&group_id=${this.group_id}`)
      .subscribe(res => {
        console.log(res)
      this.assignments = res['data']['collection'];
    })
  }

  onSubmit() {
    if (this.assignSvc.addAssign(this.currentAssignment)) {
      alert('Добавлено успешно')
    }
    this.currentAssignment.title = '';
    this.currentAssignment.description = '';
  }
}
