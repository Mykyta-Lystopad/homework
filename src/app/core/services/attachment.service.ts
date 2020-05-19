import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Attachment} from '../models/attachment.model';

@Injectable()

export class AttachmentService {
  constructor(
    private apiService: ApiService
  ) {
  }

  createAttachment(Attach: Attachment) {
    return this.apiService.post('api/attachments', Attach);
  }

  updateColection(assignmentId: number, attachmentsID) {
    return this.apiService.put(`api/assignments/${assignmentId}`, attachmentsID);
  }

  createDoubleArray(attach, count) {
    let finisharr = [];
    let newarray = [];
    let c = count;
    let i = 0;
    for (let val of attach) {
      newarray.push(val);
      if (newarray.length === c) {
        finisharr.push(newarray);
        newarray = [];
      } else if (attach.length - 1 === i) {
        finisharr.push(newarray);
      }
      i++;
    }
    return finisharr;
  }
}
