import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService, ApiService, AttachmentService} from '../../../../core/services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserResponseModel} from '../../../../core/models';
import {Attachment} from '../../../../core/models/attachment.model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit, OnDestroy {
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

  @Input() attachments;
  @Input() assignID;

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

    const Attachment: Attachment = {
      comment: this.form.value.comment,
      file_name: this.form.value.file_content.substr(12),
      file_content: this.imageSrc
    };
    this.attachService.createAttachment(Attachment).subscribe(res => {
      console.log(JSON.stringify(res) + " Reader")
      this.attachments[this.attachments.length - 1].push(res.data);

      let ids = this.attachments[this.attachments.length - 1].map(attach => attach.id);

      const col = {
        attachments: ids
      };
      this.attachService.updateColection(this.assignID, col).subscribe(resr => {
        if (this.attachments[this.attachments.length - 1].length < 5) {
          this.attachments[this.attachments.length - 1].map(attach => attach.id);
        } else {
          this.attachments.push([]);
          this.attachments[this.attachments.length - 1].map(attach => attach.id);
        }

      });
    });

    this.openCreateModal = false;
  }


  ngOnDestroy() {
    this.openCreateModal = false;
  }

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
