import { AttachmentModel } from './attachmentModel';
import { Attachment } from './attachment.model';
import { User } from './user.model';
export class MessageModel{
    id: number;
    message: string;
    user?:User;    
    attachments?:Attachment[];
    created_at?: Date;
    updated_at?: Date;
    student_id?: number;
    assignment_id?: number;
    constructor(){
        this.id = null;
        this.message = null;
        this.user = null;
        this.attachments = Array(new AttachmentModel());
        this.created_at = null;
        this.updated_at = null;
        this.student_id = null;
        this.assignment_id = null;
    }
}