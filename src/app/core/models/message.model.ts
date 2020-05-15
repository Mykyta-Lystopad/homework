import { Attachment } from './attachment.model';
import { User } from './user.model';
export interface Message{
    id: number;
    message: string;
    user?:User;
    attachments?:Attachment;
    created_at: Date;
    updated_at?: Date;
}