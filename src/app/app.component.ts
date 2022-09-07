import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FunctionUtility, MediaUploaderComponent, OperationResult } from 'ngx-spa-utilities';
import { NgxNotiflixService } from 'ngx-spa-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren('srcUploader') srcUploaders!: QueryList<MediaUploaderComponent>;
  modelA: Model = <Model>{ src: 'https://res.cloudinary.com/khanhvuongnh/image/upload/v1661236257/GitHubPage/background_portfolio_ijmwkx.jpg' };
  modelB: Model = <Model>{};

  constructor(
    private fu: FunctionUtility,
    private notiflixService: NgxNotiflixService) {
    notiflixService.init({});
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