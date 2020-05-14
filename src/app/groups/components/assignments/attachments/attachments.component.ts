import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AttachmentService} from '../../../../core/services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserResponseModel} from '../../../../core/models';
import {Attachment} from '../../../../core/models/attachment.model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public openCreateModal: boolean = false;
  public imageSrc: string = '';
  public acceptConfig: string[] = [
    'image/png',
    'image/jpeg',
    '.doc',
    '.docx'
  ];

  @Input() attachments;

  constructor(
    private Alert: AlertService,
    private attachService: AttachmentService
  ) { }

  ngOnInit() {
    this.openCreateModal = false;
    this.form = new FormGroup({
      comment: new FormControl(null, Validators.required),
      file_content: new FormControl(null, Validators.required)
    });
  }


  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern) && file.size > 2097152) {
      this.Alert.warning('Можно загружать файлы форматов png,jpeg,doc,docx размер которых не перевышает 2mb')
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }


    const Attachment: Attachment = {
      comment: this.form.value.comment,
      file_name: this.form.value.file_content.substr( 12),
      file_content: this.imageSrc
    };
    this.attachService.createAttachment(Attachment).subscribe(res =>{
      console.log(res);
      console.log(this.attachments);
    })
  }








  ngOnDestroy(){
    this.openCreateModal = false;
  }

}
