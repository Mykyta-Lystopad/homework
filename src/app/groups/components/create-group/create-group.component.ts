import { UserService } from './../../../core/services/user.service';
import { User } from './../../../core/models/user.model';
import { GroupModel } from './../../../core/models/groupModel';
import { SubjectModel } from './../../../core/models/subject.model';
import { FormGroup} from '@angular/forms';
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
  currentUser:User
  groups$: Observable<Group[]>
  role: string;
  subjects: SubjectModel[] = []
  form: FormGroup
  createGroupFlag = false
  editTitle = false
  editSubject = false
  bindToGroup = false
  groupCodeToBind = null
  @ViewChild('editTitleEl') editTitleEl : ElementRef
  @ViewChild('editSubjectEl') editSubjectEl : ElementRef  
  @ViewChild('codeEl') codeEl: ElementRef
  
  currentGroup = new GroupModel()
  constructor(
    private groupService: GroupsService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.role = this.userService.getCurrentUser().role;
    this.groups$ = this.groupService.group
    if (this.role == 'teacher'){
      this.groupService.getSubjects().subscribe(response => {
        this.subjects = response.data
      })
    }    
  }
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

  showBindToGroup(){
    this.groupCodeToBind = null
    this.bindToGroup = true
    setTimeout( _ => this.codeEl.nativeElement.focus(),0)
  }

  bindGroup(){
    
    this.groupService.bindGroup(this.groupCodeToBind).subscribe(res => {
      if (res['data'] !== 'Wrong code.'){
        
      }
    })

    this.bindToGroup = false
    
  }
}
