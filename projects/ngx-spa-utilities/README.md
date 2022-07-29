# NgxSpaUtilities

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Installation

Install `ngx-spa-utilities` from `npm`:

```
npm install ngx-spa-utilities
```

Install `ngx-spa-utilities` from `yarn`:

```
yarn add ngx-spa-utilities
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

## Function Utilitity

```typescript
@Component({...})
export class ProductComponent implements OnInit {
  id: string = '';

  constructor(
    private cartService: CartService,
    private fu: FunctionUtility) { }

  ngOnInit(): void {
    this.id = this.fu.nextID();
  }
}
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
}

export interface PaginationParam {
  pageNumber: number;
  pageSize: number;
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
            "input": "dist/ngx-spa-utilities/assets",
            "output": "assets"
          }
        ],
        "styles": [
          "node_modules/bootstrap/scss/bootstrap.scss",
          "src/styles.scss"
        ],
        "scripts": [
          "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
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
  [src]="model.src"
  [disabled]="false"
  [accept]="'.png, .jpg, .mp4'"
  [maxSize]="5000000"
  [preview]="true"
  [(file)]="model.file"
  (result)="handleResult($event)"
  [message]="message">
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