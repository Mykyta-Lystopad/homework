import { UserModel } from './../../../core/models/userModel';
import { User } from './../../../core/models/user.model';
import { AlertService } from './../../../core/services/alert.service';
import { SubjectModel } from './../../../core/models/subject.model';
import { GroupModel } from './../../../core/models/groupModel';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {GroupsService} from "../../../core/services";
import {Group} from "../../../core/models/group.model";
import { debug } from 'console';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  @Input() group: Group
  @Input() createMode = false
  @Output() closeCreateMode = new EventEmitter()
  currentGroup = new GroupModel() 
  subjects: SubjectModel[] = []
  @ViewChild('editTitleEl') editTitleEl: ElementRef
  @ViewChild('editSubjectEl') editSubjectEl: ElementRef 
  showEditTitle = false
  showEditSubject = false
  studentCode = null
  

  constructor(private groupService: GroupsService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    if (this.createMode){
      this.group = new GroupModel() 
    } else {
      this.groupService.getGroup(this.group.id).subscribe(res => {
        this.group = res['data']
      })
    }
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
    
    setTimeout(()=>{
      let index = this.subjects.findIndex(elem => elem.title == this.currentGroup.subject)
      if (index>0)
      this.editSubjectEl.nativeElement.options[this.subjects[index].id].selected = true
      //this.editSubjectEl.nativeElement.autofocus = true
      // this.editSubjectEl.nativeElement.show().focus() 
    },0)
  }
  saveGroup(){
    if (!this.createMode){
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
    } else {
      this.group.title = this.currentGroup.title
      
      console.log(this.group);
      this.showEditTitle = false 
      this.showEditSubject = false
    }
  }
  subjChange(event:any){
    if (!event.target.value) return
    if (!this.createMode){
      this.currentGroup.subject = event.target.value;
      this.saveGroup()
    }else{
      this.group.subject = this.subjects[event.target.value].title
      this.saveGroup()
    }
    
  }
  createGroup(){
    if (this.group.title && this.group.subject){
      let obj = {
        title: this.group.title,
        subject_id: null
      } 
      let index = this.subjects.findIndex(elem => elem.title == this.group.subject)
      obj.subject_id = this.subjects[index].id
      this.groupService.createGroup(obj).subscribe(res => {
        this.closeCreateGroup()
      })
    } else {
      this.alertService.warning('Для створення групи заповніть всі поля')
    }    
  }

  delete() {
    if (confirm('Ви справды бажаэте выдалити групу?')){
      this.groupService.remove(this.group.id)
    }
  }
  initials(user:User){
    let str = ""
    str = user['first_name'].charAt(0) + user['last_name'].charAt(0)
    str.toUpperCase
    return str
  } 

  closeCreateGroup(){
    this.closeCreateMode.emit(false)
  }
  addStudent(){
    if (!this.studentCode) return
    this.groupService.addStudentByCode(this.group.id,this.studentCode).subscribe(res => {
      let user = new UserModel()  
      user = res['data']   
      this.group.users.push(user) 
      this.studentCode = ""
    })
  }
  removeStudent(student:User){
    if(!confirm(`Ви справді бажаєте видалитикористувача ${student.first_name} ${student.last_name}`)) return
    this.groupService.removeStudent(this.group.id, student.id).subscribe(res => {
      let index = this.group.users.findIndex(item => item.id == student.id)
      this.group.users.splice(index,1)
    })
  }
}
