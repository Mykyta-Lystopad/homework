import { Attachment } from '../../../../core/models/attachment.model';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Output ('editor') editor: EventEmitter<any> = new EventEmitter<any>();
  @Input () attachment: Attachment;
  constructor() {}

  ngOnInit() {

  }

  openEditor() {
   this.editor.emit(this.attachment);
  }
}
