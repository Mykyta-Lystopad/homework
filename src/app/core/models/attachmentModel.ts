import { Attachment } from './attachment.model';


export class AttachmentModel implements Attachment{
     id: number;
     file_name: string;
     comment?: string;
     file_link?: string;
     thumb_link?: string
     file_content?: string;
 
     constructor(){
          this.id = null;
          this.file_name = "";
          this.comment = "";
          this.file_link = "";
          this.thumb_link = "";
          this.file_content = "";
     }
 
 }
