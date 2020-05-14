import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Attachment} from '../models/attachment.model';

@Injectable()

export class AttachmentService {
  constructor(
    private apiService: ApiService
  ){}

  createAttachment(Attach: Attachment){
    return this.apiService.post('api/attachments', Attach);
  }
}
