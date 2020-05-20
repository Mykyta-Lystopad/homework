import {Message} from '../../../../core/models/message.model';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message
  @Input() currentUserId: number
  @Output() editEmit = new EventEmitter;
  @Output() deleteEmit = new EventEmitter;
  editedMessage = ''
  editShow = false
  constructor() { }

  ngOnInit(): void {
   
  }
  deleteMessage(){
    if (confirm(`Do you really want to delete message: ${this.message.message}`)){
     this.deleteEmit.emit(this.message.id)   
    }     
  }  
  changeEditShow(){
    this.editShow = !this.editShow
    this.editedMessage = this.message.message
  }
  editMessage(){
    this.editEmit.emit({messageId: this.message.id, message: this.editedMessage})
    this.editShow = false
    this.editedMessage = '' 
  }
}
