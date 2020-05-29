import {Message} from '../../../../core/models/message.model';

import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild ('editMessageEl') editMessageEl : ElementRef
  constructor() { }

  ngOnInit(): void {
   
  }
  deleteMessage(){
    if (confirm(`Do you really want to delete message: ${this.message.message}`)){
     this.deleteEmit.emit(this.message.id)   
    }     
  }  
  changeEditShow(){
    if (this.message.user.id == this.currentUserId){
      this.editShow = !this.editShow
      this.editedMessage = this.message.message
      setTimeout(()=>{ this.editMessageEl.nativeElement.focus()},0);
    }    
  }
  editMessage(){
    if (this.editedMessage === '') {
      this.deleteMessage()
    } else {
      if (this.message.message != this.editedMessage){
        this.editEmit.emit({messageId: this.message.id, message: this.editedMessage})
      }  
    }
    this.editShow = false
    this.editedMessage = '' 
  }
}
