import {Component, OnInit} from '@angular/core';
import {ApiService, GroupsService} from "../../../core/services";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {SubjectModel} from "../../../core/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  // title = '';
  // subjects: SubjectModel[] = []
  // idSubject: number
  // form: FormGroup

  // constructor(private groupService: GroupsService,
  //             private apiService: ApiService,
  //             public location: Location) {
  // }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   select: new FormControl('', Validators.required),
    //   title: new FormControl('', Validators.required)
    // })
    // this.apiService.get('api/subjects').subscribe(response => {
    //   this.subjects = response.data
    // })
  }

 
  // submit() {
  //   this.groupService.add(this.title, this.idSubject)
  //   this.title = ''
  //   this.location.back()
  // }
}
