import { Component, ViewChild } from '@angular/core';
import { MessageConfig } from 'dist/ngx-spa-utilities/lib/models/message-config.model';
import { FunctionUtility, MediaUploaderComponent, OperationResult } from 'ngx-spa-utilities';
import { NgxNotiflixService } from 'ngx-spa-utilities-notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('srcUploader') srcUploader!: MediaUploaderComponent;

  constructor(
    private fu: FunctionUtility,
    private notiflixService: NgxNotiflixService) {
    notiflixService.init({});
  }

  modal: Modal = <Modal>{
    src: 'https://www.digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg',
  };
  message: Partial<MessageConfig> = {
    fileRemovedMsg: 'Xoá nè',
    fileUploadedMsg: 'Tải lên nè',
    fileResetMsg: 'Làm mới nè',
    invalidFileSizeMsg: 'Kích thước file quá lớn nè',
    invalidFileTypeMsg: 'Không hỗ trợ file này nè',
  }

  title = 'angular-library';
  files: File[] = [];
  images: string[] | any = [
    'http://localhost:4200/assets/ngx-spa-utilities/samples/square.jpg',
    'http://localhost:4200/assets/ngx-spa-utilities/samples/tall.jpg',
    'http://localhost:4200/assets/ngx-spa-utilities/samples/fat.jpg',
    'http://localhost:4200/assets/ngx-spa-utilities/samples/video.mp4',
    'http://localhost:4200/assets/ngx-spa-utilities/samples/image-error.png',
    'http://localhost:4200/assets/ngx-spa-utilities/samples/video-error.mp4',
    null,
    undefined,
    '',
    '                ',
    { hello: 'world' },
    ['a', 'b', 'c'],
    new Date(),
    9999999
  ]

  handleResult(event: OperationResult): void {
    console.log(event);
  }

  reset(): void {
    this.srcUploader.reset();
  }

  save(): void {
    this.notiflixService.showBlock('.container');
    console.log(this.modal);
  }
}



interface Modal {
  src: string;
  src2: string;
  file: File;
  file2: File;
}