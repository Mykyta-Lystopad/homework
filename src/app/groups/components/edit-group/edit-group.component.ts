import { SubjectModel } from './../../../core/models/subject.model';

import { GroupModel } from './../../../core/models/groupModel';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {GroupsService} from "../../../core/services";
import {Location} from "@angular/common";
import {Group} from "../../../core/models/group.model";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  @Input() group: Group
  currentGroup = new GroupModel() 
  subjects: SubjectModel[] = []
  @ViewChild('editTitleEl') editTitleEl: ElementRef
  @ViewChild('editSubjectEl') editSubjectEl: ElementRef 
  showEditTitle = false
  showEditSubject = false
  

  constructor(private groupService: GroupsService,
              public location: Location) {
  }

  ngOnInit(): void {
    this.groupService.getGroup(this.group.id).subscribe(res => {
      this.group = res['data']
    })
    this.groupService.getSubjects().subscribe(response => {
      this.subjects = response.data
    })
  }
  copyData(){
    this.currentGroup.id = this.group.id
    this.currentGroup.model_code = this.group.model_code
    this.currentGroup.qr_code_link = this.group.qr_code_link
    this.currentGroup.subject = this.group.subject
    this.currentGroup.title = this.group.title
    this.currentGroup.users = this.group.users
  }

  toShowEditTitle(){
    this.copyData() 
    this.showEditTitle = true
    setTimeout(()=>{this.editTitleEl.nativeElement.focus()},0)
  }
  toShowEditSubject(){
    this.copyData() 
    this.showEditSubject = true
    setTimeout(()=>{this.editSubjectEl.nativeElement.focus()},0)
  }
  saveGroup(){
    let obj = {
      id: this.currentGroup.id,
      title: this.currentGroup.title,
      subject_id: +this.currentGroup.subject
    } 
    if (!obj.subject_id){
      let index = this.subjects.findIndex(elem => elem.title == this.currentGroup.subject)
      obj.subject_id = this.subjects[index].id
    }


    this.showEditTitle = false 
    this.showEditSubject = false
  

    this.groupService.changeGroup(obj).subscribe(res => {
      this.group.title = res['data']['title']
      this.group.subject = res['data']['subject']
    })
  }
  subjChange(event:any){
    this.currentGroup.subject = event.target.value;
    this.saveGroup()
  }

  delete() {
    if (confirm('Ви справды бажаэте выдалити групу?')){
      this.groupService.remove(this.group.id)
    }
  }
  initials(user:object){
    let str = ""
    str = user['first_name'].charAt(0) + user['last_name'].charAt(0)
    str.toUpperCase
    return str
  }
}
