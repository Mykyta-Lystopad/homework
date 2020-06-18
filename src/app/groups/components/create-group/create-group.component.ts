import { GroupModel } from './../../../core/models/groupModel';
import { SubjectModel } from './../../../core/models/subject.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Observable} from "rxjs";
import {Group} from "../../../core/models/group.model";
import {GroupsService} from "../../../core/services";


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  groups$: Observable<Group[]>
  role: string;
  activeAccordion: boolean;
  title = ''
  currentTitle = ""
  currentSubjectId = null
  subjects: SubjectModel[] = []
  form: FormGroup
  createGroupFlag = false
  editTitle = false
  editSubject = false
  @ViewChild('editTitleEl') editTitleEl : ElementRef
  @ViewChild('editSubjectEl') editSubjectEl : ElementRef
  currentGroup = new GroupModel()

  constructor(
    private groupService: GroupsService) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupService.group
    this.activeAccordion = false
    this.groupService.getSubjects().subscribe(response => {
      this.subjects = response.data
    })
  }
  // submit() {
  //   this.currentTitle = this.form.controls['title'].value
  //   this.groupService.add(this.currentTitle, this.currentSubjectId)
  //   this.currentTitle = ''
  //   this.currentSubjectId = 0
  //   this.createGroupFlag = false
  // }

  delete(id: number) {
    this.groupService.remove(id)
  }
  closeCreateGroup(flag: boolean){
    this.createGroupFlag = flag
  }
  toShowGroup(groupId:number){
    this.groups$.source['value'].forEach(elem => elem.id == groupId ? elem.show = true : elem.show = false);
  }
  toShowEditTitle(){
    this.editTitle = true
    this.editTitleEl.nativeElement.value = ""
    setTimeout(_ => this.editTitleEl.nativeElement.focus(),0)
  }
  toShowEditSubject(){
    this.editSubject = true
    this.editSubjectEl.nativeElement.value = 0
    setTimeout(_ => this.editSubjectEl.nativeElement.focus(),0)
  }
  getSubject(id:string){
    if (id){
      let num = +id
      return this.subjects.find(elem => elem.id == num).title
    }
  }
}
