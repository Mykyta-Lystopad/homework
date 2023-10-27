import { Attachment } from '../../../../core/models/attachment.model';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  //@Output ('editor') editor: EventEmitter<any> = new EventEmitter<any>();
  @Input () attachment: Attachment;

  
  @ViewChild ('canvas') canvas: ElementRef
  @ViewChild ('source') source: ElementRef
  private ctx: any
  drag: boolean = false

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.canvas.nativeElement.height = this.source.nativeElement.height
      this.canvas.nativeElement.width = this.source.nativeElement.width
      this.ctx.drawImage(this.source.nativeElement, 0, 0, this.source.nativeElement.width, this.source.nativeElement.height);
      this.ctx.strokeStyle = "red"
    },0)
  }
  mouseDown(e){
    this.drag = true
    this.ctx.beginPath();
    this.mouseMove(e)
  }
  mouseUp(){
    this.drag = false
  }
  mouseMove(event:any){
    if (this.drag){
      this.ctx.lineWidth = 10
      this.ctx.lineCap = 'round'
      this.ctx.lineTo(event.clientX, event.clientY)
      this.ctx.stroke()
      this.ctx.beginPath();
      this.ctx.moveTo(event.clientX, event.clientY)
    }
    
  }
}
