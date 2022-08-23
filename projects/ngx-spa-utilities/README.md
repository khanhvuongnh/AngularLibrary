<a href="https://github.com/khanhvuongnh/AngularLibrary">
  <div style="text-align: center;">
    <img class="mx-auto center-block d-block" src="https://res.cloudinary.com/khanhvuongnh/image/upload/v1660891556/AngularLibrary/logo_angular_library_cujgix.svg" alt="ngx-spa-utilities-notiflix" width="200" height="200" />
    <h1 style="font-size: 3rem;">ngx-spa-utilities</h1> 
  </div>
</a>

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Installation

Install `ngx-spa-utilities` from `npm`:

```
npm install bootstrap notiflix ngx-spa-utilities
```

Install `ngx-spa-utilities` from `yarn`:

```
yarn add bootstrap notiflix ngx-spa-utilities
```

## Destroy Service
```typescript
@Component({
  ...
  providers: [DestroyService]
})
export class ProductComponent implements OnInit {
  
  constructor(
    private cartService: CartService,
    private destroy: DestroyService) { }

  ngOnInit(): void {
    this.cartService.getCart()
      .pipe(takeUntil(this.destroy.destroyed$))
      .subscribe({...});
  }
}
```

## Notiflix Service


```typescript
@Component({
  ...
})
export class AppComponent implements OnInit {
  
  constructor(private notiflixService: NgxNotiflixService) { }

  ngOnInit(): void {
    this.notiflixService.init({
      // Custom OK button
      okButton: 'Okie', 

      // Custom Cancel button
      cancelButton: 'Oh No',

      // Custom loading svg
      loadingSvgUrl: 'assets/img/loading.svg',

      // Custom loading style
      loadingType: 'custom',

      // Custom loading color
      loadingColor: '#ff5549'
    });

    // Fire to show a success notification
    this.notiflixService.success('Hello, World.');
  }
```

### All Functions

```typescript
// Init
init(custom?: NotiflixCustom): void

// Notify
success(message: string): void
error(message: string): void
warning(message: string): void
info(message: string): void

// Confirm
confirm(title: string, message: string, okButtonCallback: () => void, cancelButtonCallback?: () => void): void
ask(title: string, question: string, answer: string, okButtonCallback?: () => void, cancelButtonCallback?: () => void): void
prompt(title: string, question: string, defaultAnswer: string, okButtonCallback?: (clientAnswer: string) => void, cancelButtonCallback?: (clientAnswer: string) => void): void

// Loading
showLoading(): void
hideLoading(): void

// Report
successReport(title: string, message: string, callback?: () => void): void
errorReport(title: string, message: string, callback?: () => void): void
warningReport(title: string, message: string, callback?: () => void): void
infoReport(title: string, message: string, callback?: () => void): void

// Block
showBlock(el: string | HTMLElement[] | NodeListOf<HTMLElement>): void
hideBlock(el: string | HTMLElement[] | NodeListOf<HTMLElement>): void
```

### Interfaces

```typescript
export interface NotiflixCustom {
  okButton?: string;
  cancelButton?: string;
  loadingSvgUrl?: string;
  loadingType?: 'standard' | 'hourglass' | 'circle' | 'arrows' | 'dots' | 'pulse' | 'custom';
  loadingColor?: string;
}
```

## Function Utilitity

```typescript
@Component({...})
export class ProductComponent implements OnInit {
  id: string = '';

  constructor(private fu: FunctionUtility) { }

  ngOnInit(): void {
    this.id = this.fu.nextID();
  }
}
```

### All Functions

```typescript
today(): string
nextID(): string
toSeq(input: Date): string
toStringDate(input: Date): string
toStringTime(input: Date): string
toStringDateTime(input: Date): string
toStringYearMonth(input: Date): string
toStringShortMonth(input: Date): string
getParentUrl(url: string, backLevel: number = 1): string
toStringLeadingZeros(input: number, targetLength: number): string

toDate(input: string): Date
toUTCDate(input: Date): Date
toEndDate(input: Date): Date
toBeginDate(input: Date): Date
toLastDateOfYear(input: Date): Date
toLastDateOfMonth(input: Date): Date
toFirstDateOfYear(input: Date): Date
toFirstDateOfMonth(input: Date): Date

toParams(formValue: any): HttpParams

toFormData(formValue: any): FormData

calculatePagination(pagination: Pagination): void
```

## Key Value Utility

```typescript
export interface KeyValueUtility {
  key?: any;
  value?: string;
  value_vi?: string;
  value_en?: string;
  value_zh?: string;
  optional?: any;
}
```

## Operation Result

```typescript
export interface OperationResult {
  error?: string;
  isSuccess?: boolean;
  data?: any;
}
```

## Pagination Utility

```typescript
export interface Pagination {
  totalCount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  skip: number;
  isPaging: boolean;
}

export interface PaginationParam {
  pageNumber: number;
  pageSize: number;
  isPaging: boolean;
}

export class PaginationResult<T> {
  result: T[] = [];
  pagination: Pagination = <Pagination>{};
}
```

## Media Uploader

### Installation

In `angular.json`:

```json
{
  ...
  "architect": {
    "build": {
      "options": {
        "assets": [
          "src/favicon.ico",
          "src/assets",
          {
            "glob": "**/*",
            "input": "node_modules/ngx-spa-utilities/assets",
            "output": "assets"
          }
        ],
        "styles": [
          "node_modules/bootstrap/scss/bootstrap.scss",
          "node_modules/notiflix/dist/notiflix-3.2.5.min.css",
          "src/styles.scss"
        ],
        "scripts": [
          "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
          "node_modules/notiflix/dist/notiflix-3.2.5.min.js"
        ]
      }
    }
  }
  ...
}
```

In `*.module.ts`:

```typescript
import { MediaUploaderComponent } from 'ngx-spa-utilities';

@NgModule({
  imports: [
    ...
    MediaUploaderComponent,
    ...
  ]
})
```

In `*.component.html`:

```html
<media-uploader
  #mediaUploader
  [height]="10"
  [maxSize]="50000"
  [message]="message"
  [preview]="true"
  [copyable]="true"
  [disabled]="false"
  [confirmRemove]="true"
  [accept]="'.jpg, .jpeg, .png, .svg'"
  [src]="modal.src"
  [(file)]="modal.file"
  (result)="handleResult($event)">
</media-uploader>
```

In `*.component.ts`:

```typescript
@Component({...})
export class AppComponent {
  @ViewChild('mediaUploader') mediaUploader!: MediaUploaderComponent;
  
  model: Model = <Model>{};
  message: MessageConfig = {
    fileRemovedMsg: 'Custom file removed message',
    fileUploadedMsg: 'Custom file uploaded message',
    fileResetMsg: 'Custom file reset message',
    invalidFileSizeMsg: 'Custom invalid file size message',
    invalidFileTypeMsg: 'Custom invalid file type message',
  }

  handleResult(event: OperationResult): void {
    // Do something here...
  }

  reset(): void {
    // Reset uploader
    this.mediaUploader.reset();

    // Do something here...
  }
}

interface Model {
  src: string;
  file: File;
}
```