import { UserAnswer } from './userAnsver.model';
import { Attachment } from './attachment.model';
import { Problem } from './problem.model';
import { Assignment } from './assignment.model';

export class AssignmentModel implements Assignment{
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

    constructor(group_id: number){
        this.group_id = group_id;
        this.student_id = null;
        this.id = null;
        this.title = '';
        this.description = '';
        this.created_at = Date.now();
        this.dueDate = null;
        this.problems = [];
        this.attachments = [];
        this.userAnswer = null;
    }

}