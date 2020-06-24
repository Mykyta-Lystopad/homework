import { AlertService } from './../../../core/services/alert.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AttachmentModel } from './../../../core/models/attachmentModel';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../core/models';
import {ApiService, UserService} from '../../../core/services';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  currentUser: User;
  private resolution = 640;
  avatar = new AttachmentModel
  acceptConfig: string[] = [
    'image/png',
    'image/jpeg',
  ];

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router,
    private imageCompress: NgxImageCompressService
  ) {
  }

  ngOnInit() {
    this.userSub = this.userService.currentUser
      .subscribe(res => {
        this.currentUser = res;
      });
  }


  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  settings() {

  }
  loadAvatar(event:any){
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    let that = this
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this, that);
    this.avatar.file_name = file.name  
    this.avatar.comment = "avatar"
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(this, that){
    const reader = event.target;
    let image = new Image()
    let maxSideSize: number
    let koef: number
    let w = null
    let h = null
    let res = that['resolution']
    image.src = event.target['result']
    image.onload = function() {
      w =  this['width']
      h = this['height']
      w > h ? maxSideSize = w : maxSideSize = h
      maxSideSize > res ? koef = res/maxSideSize*100 : koef = 100
      that.imageSrc = reader['result'];
      that.imageCompress.compressFile(that.imageSrc,-1, koef, 50).then( res => {
        that.avatar.file_content = res
        that.saveAvatar()
        })
    }  
  }
  saveAvatar(){
    this.apiService.post('api/attachments', this.avatar).subscribe (res =>{
      this.currentUser.avatar = res['data']['file_link']
    }, error => {
      this.alertService.danger(error['data'])
    })
  }

}
