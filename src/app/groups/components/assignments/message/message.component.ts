import { DatePipe } from '@angular/common';
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
  constructor(private datePipe: DatePipe) { }

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
  getDate(){
    const today = new Date().getTime()
    const createDate = new Date (this.message.created_at).getTime()
    const diffTime = Math.abs(today - createDate) ;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 

    const date = this.datePipe.transform(this.message.created_at , 'dd.MM.yyyy')
    switch (diffDays) {
      case 0: return ''
      case 1: return 'yesterday'
      default: return date
        break;
    }
  }
}
