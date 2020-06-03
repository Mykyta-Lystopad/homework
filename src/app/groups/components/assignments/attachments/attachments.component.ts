import { Attachment } from './../../../../core/models/attachment.model';
import { AttachmentModel } from './../../../../core/models/attachmentModel';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService, ApiService, AttachmentService} from '../../../../core/services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserResponseModel} from '../../../../core/models';


@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  public form: FormGroup;
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

  constructor(
    private Alert: AlertService,
    private attachService: AttachmentService,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.openCreateModal = false;
    this.form = new FormGroup({
      comment: new FormControl(null, Validators.required),
      file_content: new FormControl(null, Validators.required)
    });

    console.log(this.attachments);
    console.log(this.assignID);
    debugger

    
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern) && file.size > 2097152) {
      this.Alert.warning('Можно загружать файлы форматов png,jpeg,doc,docx размер которых не перевышает 2mb');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    console.log(file)
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
   // файл а bise64
    this.imageSrc = reader.result;

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    debugger
    this.currentAttachment.comment = this.form.value.comment
    this.currentAttachment.file_name = this.form.value.file_content.substr(12)
    this.currentAttachment.file_content = this.imageSrc
    // const Attachment: Attachment = {
    //   comment: ,
    //   file_name: ,
    //   file_content: 
    // };
    this.attachments.forEach(item=>{this.objForSend.attachments.push(item.id)})
    this.attachService.createAttachment(this.currentAttachment).subscribe(res => {
      //console.log(JSON.stringify(res) + " Reader")
      console.log(res['data']['id'])
      this.currentAttachment.id = res['data']['id']
      this.objForSend.attachments.push(res['data']['id'])

      //this.attachments[this.attachments.length - 1].push(res.data);
      //this.objForSend.attachments = this.attachments[this.attachments.length - 1].map(attach => attach.id);

      this.attachService.updateColection(this.assignID, this.objForSend).subscribe(resr => {

        this.attachments.push(this.currentAttachment)
        // if (this.attachments[this.attachments.length - 1].length < 5) {
        //   this.attachments[this.attachments.length - 1].map(attach => attach.id);
        // } else {
        //   this.attachments.push([]);
        //   this.attachments[this.attachments.length - 1].map(attach => attach.id);
        // }
        
      });
    });

    this.openCreateModal = false;
  }


  // ngOnDestroy() {
  //   this.openCreateModal = false;
  // }

  openEditor(attach: Attachment) {
    this.modalEditor = true;
    this.imageUrl = attach.file_link;
  }

  save($event: Blob) {

  }

  cancel() {
    this.modalEditor = false;
  }
}
