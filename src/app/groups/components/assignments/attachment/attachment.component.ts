import { Attachment } from '../../../../core/models/attachment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input () attachment: Attachment;
  constructor() {}

  ngOnInit(): void {

  }

}
