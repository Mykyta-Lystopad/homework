import { Message } from './message.model';
import { Attachment } from './attachment.model';
import { Problem } from './problem.model';

export interface Assignment {
    group_id?:number;
    id?: number;
    title:string;
    description?: string;
    problems?: Problem[];
    attachments?: Attachment[];
    messages?: Message[];
    createDate?: number;
    dueDate?: number;
}