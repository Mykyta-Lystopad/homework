import { UserAnswer } from './userAnsver.model';
import { Attachment } from './attachment.model';
import { Problem } from './problem.model';

export interface Assignment {
    group_id?:number;
    student_id?:number;
    id?: number;
    title:string;
    description?: string;
    problems?: Problem[];
    attachments?: Attachment[];
    userAnswer?: UserAnswer;    
    created_at?: number;
    due_date?: number;
}