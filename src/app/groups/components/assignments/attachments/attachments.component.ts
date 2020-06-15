import { NgxImageCompressService } from 'ngx-image-compress';
import { Attachment } from './../../../../core/models/attachment.model';
import { AttachmentModel } from './../../../../core/models/attachmentModel';
import { Component, Input, OnInit} from '@angular/core';
import {AlertService, AttachmentService} from '../../../../core/services';


@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  openCreateModal: boolean = false;
  showModalImage: boolean = false;
  imageSrc: string = '';
  imageUrl: string = '';
  modalEditor: boolean = false;
  zoom: boolean = false;
  wait = false
  acceptConfig: string[] = [
    'image/png',
    'image/jpeg',
    '.doc',
    '.docx'
  ];
  colors = {
    ['black']: 'red'
  };
  currentAttachment = new AttachmentModel()
  private objForSend = {
    attachments: []
  } 
  @Input() attachments: Attachment[];
  @Input() assignID: number;
  @Input() userAnswer: boolean;
  @Input() role: string;
  displayMode: boolean;
  index: number;
  canvaObjectsSize: number = null


  constructor(
    private Alert: AlertService,
    private attachService: AttachmentService,
    private imageCompress: NgxImageCompressService
  ) {
  }
  ngOnInit() {

    switch (this.role) {
      case 'teacher':
        if(this.userAnswer == true){
          this.displayMode = true
        }
        break;
      case 'student':
        if(this.userAnswer == true){
          this.displayMode = false
        } else {
          this.displayMode = true
        }
        break;      
     
      default:
        break;
    }

  }
  handleInputChange(e:any) {
    console.log(e.target.value);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    // const pattern = /image-*/;
    const reader = new FileReader();
    // if (!file.type.match(pattern) && file.size > 2097152) {
    //   this.Alert.warning('Можно загружать файлы форматов png,jpeg,doc,docx размер которых не перевышает 2mb');
    //   return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    this.currentAttachment.file_name = file.name   


    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    // console.log('width: ',e.width);
    // console.log('height: ',e.height);
    // debugger
   // файл а bise64
    this.imageSrc = reader.result;
    //console.log('before', this.imageSrc);

    this.imageCompress.compressFile(this.imageSrc,-1, 50, 50).then( res => {
      //console.log('after', res);
      this.currentAttachment.file_content = res
      this.currentAttachment.comment = "some comment"
      this.submit()
      })
  }

  submit() {    
    this.attachments.forEach(item=>{this.objForSend.attachments.push(item.id)})
    this.attachService.createAttachment(this.currentAttachment).subscribe(res => {
      this.currentAttachment.id = res['data']['id']
      this.objForSend.attachments.push(res['data']['id'])
      this.attachService.updateColection(this.assignID, this.objForSend).subscribe(resr => {
        this.attachments = resr['data']['attachments']
       });
    });

    this.openCreateModal = false;
  }

  openEditor(attach: Attachment) {
    this.zoom = false
    if (!this.modalEditor){
      this.modalEditor = true;
      this.imageUrl = attach.file_link;
      this.currentAttachment.id = attach.id
      this.currentAttachment.comment = attach.comment
      this.currentAttachment.file_name = attach.file_name
      this.currentAttachment.file_content = attach.file_content
      this.currentAttachment.file_link = attach.file_link   
    } else {
      this.cancel()
    }
     
  }

  save($event: Blob) {
    this.canvaObjectsSize = null
    this.wait = true
    let reader = new FileReader();
    let base64data:any
    reader.readAsDataURL($event); 
    let that = this; 
    reader.onloadend =  () => {
      base64data = reader.result;
      that.currentAttachment.file_content = base64data;
      this.attachService.updeteAttachment(this.currentAttachment).subscribe(res => {
        let index = that.attachments.findIndex(item => item.id == that.currentAttachment.id)
        that.attachments[index].file_link = res['data']['file_link']
        that.currentAttachment.file_link = res['data']['file_link']
        this.modalEditor = false
        this.wait = false
      })
    }
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
  
  showModal(image:Attachment){
    this.index = this.attachments.findIndex(item => item.id == image.id)
    this.currentAttachment.id = this.attachments[this.index].id
    this.currentAttachment.file_name = this.attachments[this.index].file_name
    this.currentAttachment.file_link = this.attachments[this.index].file_link
    this.showModalImage = true
  }
  closeModal(event:any){
    if (event.toElement.className == "modal-cotainer" || event.toElement.className =="modal-dialog-centered") this.closeBtn()
  }
  listImages(next:boolean){
    next ? this.index++ : this.index--; 
    this.currentAttachment.id = this.attachments[this.index].id
    this.currentAttachment.file_name = this.attachments[this.index].file_name
    this.currentAttachment.file_link = this.attachments[this.index].file_link
  } 
  calculateArraySize(flag?:string) {
    if (flag == 'number') return this.attachments.length
    if (this.index == this.attachments.length-1) return true
    else return false
  }
  closeBtn(){
    
    if(this.cancel()){
      this.showModalImage = false
      this.zoom = false
    }
    
  }
  cancel() {
    if (this.canvaObjectsSize){
      if (!confirm("Warning, you don't save changes!!! Your changes will be lost. Exit anyway?")) return false
    } 
    this.modalEditor = false
    return true
  }
  zoomChange(){
    this.zoom = !this.zoom
  }
  canvaObjects(size){
    this.canvaObjectsSize = size
    console.log(this.canvaObjectsSize);    
  }

}
