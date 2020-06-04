import { User } from './../../../../core/models/user.model';
import { Attachment } from './../../../../core/models/attachment.model';
import { AttachmentModel } from './../../../../core/models/attachmentModel';
import {Component, Input, OnInit} from '@angular/core';
import {AlertService, ApiService, AttachmentService} from '../../../../core/services';
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  public openCreateModal: boolean = false;
  public imageSrc: string = '';
  public imageUrl: string = '';
  public modalEditor: boolean = false;
  public acceptConfig: string[] = [
    'image/png',
    'image/jpeg',
    '.doc',
    '.docx'
  ];
  public colors = {
    ['black']: 'red'
  };
  private currentAttachment = new AttachmentModel()
  private objForSend = {
    attachments: []
  } 
  @Input() attachments: Attachment[];
  @Input() assignID: number;
  @Input() displayMode: boolean;
  @Input() user: User;

  constructor(
    private Alert: AlertService,
    private attachService: AttachmentService,
    private apiService: ApiService
  ) {
  }
  ngOnInit() {
  }
  handleInputChange(e:any) {
    console.log(e.target.value);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern) && file.size > 2097152) {
      this.Alert.warning('Можно загружать файлы форматов png,jpeg,doc,docx размер которых не перевышает 2mb');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    console.log(file)
    this.currentAttachment.file_name = file.name   
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
   // файл а bise64
    this.imageSrc = reader.result;
    this.currentAttachment.file_content = this.imageSrc
    this.currentAttachment.comment = "some comment"
    this.submit()
  }

  submit() {
    this.attachments.forEach(item=>{this.objForSend.attachments.push(item.id)})
    this.attachService.createAttachment(this.currentAttachment).subscribe(res => {
      console.log(res['data']['id'])
      this.currentAttachment.id = res['data']['id']
      this.objForSend.attachments.push(res['data']['id'])
      this.attachService.updateColection(this.assignID, this.objForSend).subscribe(resr => {
        debugger
        this.attachments = resr['data']['attachments']
        console.log(this.attachments);         
       });
    });

    this.openCreateModal = false;
  }

  openEditor(attach: Attachment) {
    this.modalEditor = true;
    this.imageUrl = attach.file_link;
    this.currentAttachment.id = attach.id
    this.currentAttachment.comment = attach.comment
    this.currentAttachment.file_name = attach.file_name
    this.currentAttachment.file_content = attach.file_content
    this.currentAttachment.file_link = attach.file_link    
  }

  save($event: Blob) {
    var reader = new FileReader();
    var base64data:any
    reader.readAsDataURL($event); 
    reader.onloadend = function() {
      base64data = reader.result;
    }    
    this.currentAttachment.file_content = base64data;
  }
  deleteAttach(id:number){
    if (!confirm('Do you really want delete image?')) return;
    this.attachments.forEach(item=>{this.objForSend.attachments.push(item.id)})    
    let index = this.objForSend.attachments.findIndex(item => item == id)    
    this.objForSend.attachments.splice(index,1)
    this.attachService.updateColection(this.assignID, this.objForSend).subscribe(resr => {
      index = this.attachments.findIndex(item => item.id == id)
      this.attachments.splice(index,1)
    });

  }
  cancel() {
    this.modalEditor = false;
  }
}
