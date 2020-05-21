import { Solution } from './../../../../core/models/solution.model';
import { Problem } from './../../../../core/models/problem.model';
import { User } from '../../../../core/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
 
  @Input() problem: Problem;
  @Input() user: User;
  @Input() studentId: number;
  @Output() emitDel: EventEmitter<{}> = new EventEmitter();
  @Output() emitEdit: EventEmitter<Problem> = new EventEmitter(); 
  @Output() emitSolve: EventEmitter<{}> = new EventEmitter();

  private emptySolution:Solution = {
    id: null,
    teacher_mark : null,
    completed : false
  }
  
  editProblemFlag = false;
  editedProblem: Problem = {
 
    title : '',
    description : ''
  }
  constructor() { }

  ngOnInit(): void {
    if (isNaN(this.studentId))
    {
      this.studentId = undefined
    }
    if (!this.problem.userSolution){
      this.problem.userSolution = this.emptySolution
    }
    console.log(this.problem);
    //if (!this.problem.userSolution.teacher_mark) this.problem.userSolution.teacher_mark = 0;
    
  }

  onSolve(){
    this.emitSolve.emit({problem_id: this.problem.id, completed: !this.problem.userSolution.completed})
  }

  onEdit(){
    this.editedProblem.id = this.problem.id;
    this.emitEdit.emit(this.editedProblem)    
    this.editProblemChange();
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
      this.editedProblem.description = this.problem.description
    }    
  }
}
