import { Attachment } from './attachment.model';
import { Message } from './message.model';
export interface UserAnswer {
    messages?: Message[];
    attachments: Attachment[];
}