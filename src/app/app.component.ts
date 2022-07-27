import { Component } from '@angular/core';
import { MessageConfig } from 'dist/ngx-spa-utilities/lib/models/message-config.model';
import { FunctionUtility, OperationResult } from 'ngx-spa-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fu: FunctionUtility) { }

  modal: Modal = <Modal>{};
  message: MessageConfig = {
    fileRemovedMsg: 'Xoá nè',
    fileUploadedMsg: 'Tải lên nè',
    invalidFileSizeMsg: 'Kích thước file quá lớn',
    invalidFileTypeMsg: 'Không hỗ trợ file này',
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
    console.log(this.modal);

  }
}

interface Modal {
  src: string;
  src2: string;
  file: File;
  file2: File;
}