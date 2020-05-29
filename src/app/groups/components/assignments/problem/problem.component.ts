import { AlertService } from './../../../../core/services/alert.service';
import { AssignmentService } from './../../../../core/services/assigntments.service';
import { UserSolution } from './../../../../core/models/solution.model';
import { Problem } from './../../../../core/models/problem.model';
import { User } from '../../../../core/models';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
 
  @Input() problem: Problem;
  @Input() user: User;
  @Input() studentId: number;
  //editMark = false;
  currentMark: number;
  @Output() emitDel: EventEmitter<{}> = new EventEmitter();
  @Output() emitEdit: EventEmitter<Problem> = new EventEmitter(); 
  @Output() emitSolve: EventEmitter<{}> = new EventEmitter();
  @ViewChild('editProbEl') editProbEl: ElementRef;
  @ViewChild('markSliderEl') markSliderEl: any;
  
  enableMarkSlider = false;

  private emptySolution:UserSolution = {
    id: null,
    teacher_mark : null,
    completed : false
  }
  
  editProblemFlag = false;
  editedProblem: Problem = {
     title : '',
  }
  constructor(
    private assignSvc: AssignmentService,
    private alertSvc: AlertService) { }

  ngOnInit(): void {
    if (isNaN(this.studentId))
    {
      this.studentId = undefined
    }
    if (!this.problem.userSolution){
      this.problem.userSolution = this.emptySolution
    }    
  }
  ngAfterViewInit(){
    console.log('asdasdasddsc');
    debugger
    
    // if (this.problem.userSolution.completed){
    //   if (this.problem.userSolution.teacher_mark){
    //     this.markSliderEl.setValue(this.problem.userSolution.teacher_mark)  
    //   } else {
    //     this.markSliderEl.setValue(12)
    //   }
    // }
  }

  onSolve(){
      if (!this.problem.userSolution.teacher_mark){
        this.emitSolve.emit({problem_id: this.problem.id, completed: !this.problem.userSolution.completed})  
      } else this.alertSvc.warning(`This problem already marked by teacher`)
  }

  onEdit(){
    if (this.problem.title !== this.editedProblem.title && this.editedProblem.title){
      this.editedProblem.id = this.problem.id;
      this.emitEdit.emit(this.editedProblem)   
    }     
    if (this.editedProblem.title === '') this.onDelete()
    this.editProblemChange();
    
  }
  setSliderValue(){
    
  }

  onDelete(){
    if (confirm(`You really want to delete ${this.problem.title} problem?`)){
      this.emitDel.emit(this.problem.id)
    }
  }

  editProblemChange(){
    if (this.user.role == 'teacher' && this.studentId == undefined){
      this.editProblemFlag = !this.editProblemFlag
      this.editedProblem.title = this.problem.title      
      setTimeout(()=>{ this.editProbEl.nativeElement.focus()},0);   
    }    
  }
  // showEditMark(){
  //   if (this.problem.userSolution.completed){
  //     this.currentMark = this.problem.userSolution.teacher_mark
  //   this.editMark = !this.editMark
  //   } else this.alertSvc.warning(`You can't mark uncompleted problem`) 
 
  //   }
  saveMark(){
    this.assignSvc.changeMark(this.problem.userSolution.id, {"teacher_mark": this.currentMark}).subscribe(res => {
      this.problem.userSolution.teacher_mark = +res['data']['teacher_mark']
    })

    this.currentMark = null
    // this.editMark = false
  }

}
