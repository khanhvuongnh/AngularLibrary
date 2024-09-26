import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FunctionUtility, MediaUploaderComponent, MediaUploaderService, OperationResult } from 'ngx-spa-utilities';
import { NgxNotiflixService } from 'ngx-spa-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren('srcUploader') srcUploaders!: QueryList<MediaUploaderComponent>;
  modelA: Model = <Model>{ src: 'https://raw.githubusercontent.com/khanhvuongnh/AngularLibrary/master/src/assets/imgs/logo.jpg' };
  modelB: Model = <Model>{};
  requestInit: RequestInit = {
    mode: 'no-cors'
  };

  constructor(
    private functionUtlity: FunctionUtility,
    private notiflixService: NgxNotiflixService,
    private service: MediaUploaderService) {
  }
  ngOnInit(): void {
    this.service.notificationTitle = {
      ...this.service.notificationTitle,
      Delete: "Usuń przedmiot?"
    };
    this.service.notificationMessage = {
      ...this.service.notificationMessage,
      Delete: "Bạn có chắc chắn muốn xoá không?",
      DeleteFailed: "削除に失敗しました!",
      DeleteSuccessful: "Eliminazione riuscita!",
    }
    this.notiflixService.init({
      // fontFamily: 'Alexandria',
      okButton: 'Đồng ý',
      cancelButton: 'Huỷ bỏ',
      notifyOptions: {
        position: 'center-top',
      },
      confirmOptions: {
        position: 'center-bottom'
      }
    });
    // this.notiflixService.confirmSuccess('Hello!', 'Hi!', () => { });
    // this.notiflixService.reportInfo('Xác nhận', 'Nostrud laborum laboris deserunt laboris enim nulla proident sint aute incididunt veniam est.', () => { });
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
    this.srcUploaders.forEach(item => item.reset());
  }

  save(): void {
    console.log('modelA', this.modelA);
    console.log('modelB', this.modelB);
  }
}



interface Model {
  src: string;
  file: File;
}