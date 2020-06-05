import { AlertService } from './alert.service';
import { tap } from 'rxjs/operators';
import { Attachment } from './../models/attachment.model';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';


@Injectable()

export class AttachmentService {
  constructor(
    private apiService: ApiService,
    private alertSvc: AlertService
  ) {
  }

  collectErrors(errorObj:object):string{
    if (typeof(errorObj) == 'string'){
      return errorObj
    } else {
    let errors = ''
    for (const err in errorObj) {
        errors =  errors + `${err} : ${errorObj[err]} ` + '\n'        
      }
    return errors;
    }    
  }

  createAttachment(Attach: Attachment) {
    return this.apiService.post('api/attachments', Attach).pipe(tap(res => {
      this.alertSvc.success('Image added succesful')
    }, error => {
      this.alertSvc.danger(this.collectErrors(error['data']))
    }))
  }

  updateColection(assignmentId: number, attachmentsID) {
    return this.apiService.put(`api/assignments/${assignmentId}`, attachmentsID).pipe(tap(res => {
      this.alertSvc.success('Collection updated succesful')
    }, error => {
      this.alertSvc.danger(this.collectErrors(error['data']))
    }))
  }

  updeteAttachment(attach: Attachment){
    return this.apiService.put(`api/attachments/${attach.id}`, attach).pipe(tap(res => {
      this.alertSvc.success('Image update succesful')
    }, error => {
      this.alertSvc.danger(this.collectErrors(error['data']))
    }))
  }
}
