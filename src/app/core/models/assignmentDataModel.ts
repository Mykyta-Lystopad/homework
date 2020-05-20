import { UserAnswer } from './userAnsver.model';
import { Attachment } from './attachment.model';
import { Problem } from './problem.model';
import { Assignment } from './assignment.model';
import { userAnswerModel } from './userAnswerModel';

export class AssignmentDataModel implements Assignment{
    group_id:number
    student_id?:number;
    id?: number;
    title:string;
    description?: string;
    created_at?: number;
    dueDate?: number;
    problems?: Problem[];
    attachments?: Attachment[];
    userAnswer?: UserAnswer;   

    constructor(data: object){
        debugger
        this.group_id = data['group_id'];
        this.student_id = data['student_id'];
        this.id = data['id'];
        this.title = data['title'];
        this.description = data['description'];
        this.created_at = data['created_at'];
        this.dueDate = data['dueDate'];
        this.problems = data['problems'];
        this.attachments = data['attachments'];
        this.userAnswer = new userAnswerModel();
    }

}