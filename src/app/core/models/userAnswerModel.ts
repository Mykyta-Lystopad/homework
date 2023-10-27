import { AttachmentModel } from './attachmentModel';
import { Attachment } from './attachment.model';
import { Message } from './message.model';
import { MessageModel } from './messageModel';

export class userAnswerModel {
    messages?: Message[];
    attachments: Attachment[];
    constructor(){
        this.messages = Array (new MessageModel());
        this.attachments = Array(new AttachmentModel())
    }
}
