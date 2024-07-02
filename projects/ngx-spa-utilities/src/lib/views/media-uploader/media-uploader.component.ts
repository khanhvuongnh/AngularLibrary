import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMAGE_TYPES_CONST, MEDIA_TYPE_CONST, VIDEO_TYPES_CONST } from '../../constants/media-type.constant';
import { MSG_CONST, TITLE_CONST } from '../../constants/notification.constant';
import { MediaItem as MediaItem } from '../../models/media-item.model';
import { NgxNotiflixService } from '../../services/ngx-notiflix.service';
import { FunctionUtility } from '../../utilities/function-utility';
import { OperationResult } from '../../utilities/operation-result';
import { ImageCroppedEvent, ImageCropperModule, ImageTransform } from "ngx-image-cropper";
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'media-uploader',
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCropperModule]
})
export class MediaUploaderComponent implements OnInit, AfterViewInit {
  protected types: Map<string, string> = new Map();
  protected mediaItem: MediaItem = <MediaItem>{};
  protected acceptedExtensions: string = '';
  protected previewSrcSafe: SafeResourceUrl = '';
  protected previewType: string = '';
  protected modal: any;
  protected cropModal: any;
  protected id: string = '';
  protected tooltips: any[] = [];
  protected mediaType: typeof MEDIA_TYPE_CONST = MEDIA_TYPE_CONST;
  protected imagePlusUrl: string = 'assets/ngx-spa-utilities/image-plus.svg';
  protected imageErrorUrl: string = 'assets/ngx-spa-utilities/image-error.svg';
  protected imagePreviewUrl: string = 'assets/ngx-spa-utilities/view.svg';
  protected imageCopyUrl: string = 'assets/ngx-spa-utilities/copy.svg';
  protected imageDeleteUrl: string = 'assets/ngx-spa-utilities/delete.svg';
  protected imageCropUrl: string = 'assets/ngx-spa-utilities/crop.svg';
  protected cropEditImage: string = 'assets/ngx-spa-utilities/edit.svg';
  protected cropFlipHorizontalImage: string = 'assets/ngx-spa-utilities/flip-horizontal.svg';
  protected cropFlipVerticalImage: string = 'assets/ngx-spa-utilities/flip-vertical.svg';
  protected cropResetChangesImage: string = 'assets/ngx-spa-utilities/reset-changes.svg';
  protected cropRotateLeftImage: string = 'assets/ngx-spa-utilities/rotate-left.svg';
  protected cropRotateRightImage: string = 'assets/ngx-spa-utilities/rotate-right.svg';
  protected cropZoomInImage: string = 'assets/ngx-spa-utilities/zoom-in.svg';
  protected cropZoomOutImage: string = 'assets/ngx-spa-utilities/zoom-out.svg';
  protected cropRotateImage: string = 'assets/ngx-spa-utilities/rotate.svg';
  protected cropRatioImage: string = 'assets/ngx-spa-utilities/ratio.svg';
  protected selectionCropImage: string = 'assets/ngx-spa-utilities/selection.svg';
  protected cropImage: MediaItem = <MediaItem>{};
  protected canvasRotation: number = 0;
  protected transform: ImageTransform = <ImageTransform>{};
  protected rotation: number = 0;
  protected scale: number = 1;
  protected containWithinAspectRatio: boolean = false;
  protected fileName: string = '';
  protected maintainAspectRatio: boolean = false;
  protected aspectRatio: number = 0;
  protected isRoundCropper: boolean = false;
  protected textToCompare: string = 'false';

  @ViewChild('videoSrcModal') protected modalMediaVideo: ElementRef | undefined;
  @Input() public src: string = '';
  @Input() public accept: string = 'image/*, video/*';
  @Input() public height: number = 10;
  @Input() public maxSize: number = 999999999999999;
  @Input() public file: File = new File([], '');
  @Input() public copy: boolean = false;
  @Input() public crop: boolean = false;
  @Input() public remove: boolean = false;
  @Input() public preview: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public confirmRemove: boolean = false;
  @Input() public requestInit: RequestInit = {};
  @Output() protected fileChange: EventEmitter<File> = new EventEmitter();
  @Output() protected result: EventEmitter<OperationResult> = new EventEmitter();

  constructor(
    protected fu: FunctionUtility,
    protected sanitizer: DomSanitizer,
    protected notiflixService: NgxNotiflixService) {
    this.id = fu.nextID();
  }

  public ngOnInit(): void {
    IMAGE_TYPES_CONST.forEach(type => this.types.set(type, MEDIA_TYPE_CONST.IMG));
    VIDEO_TYPES_CONST.forEach(type => this.types.set(type, MEDIA_TYPE_CONST.VIDEO));
    this.initialMediaItem();
    this.calculateAcceptedExtensions();
  }

  public ngAfterViewInit(): void {
    this.initialModal();
    this.initCropModal();
  }

  public reset(): void {
    this.mediaItem = <MediaItem>{
      id: this.id,
      srcSafe: this.sanitizer.bypassSecurityTrustUrl(this.src),
      src: this.src,
      type: this.checkMediaType(this.src)
    };
    this.fileChange.emit(undefined);
    this.result.emit({ isSuccess: true, data: 'RESET' });
  }

  protected async initialMediaItem(): Promise<void> {
    let file: File = new File([], '');

    if (this.src) {
      const extension: string | undefined = this.src.split('.').pop();
      const mineType: string = this.getMineType(extension as string);
      const url = this.src;
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      file = await this.urltoFile(this.src, fileName, mineType);
    }

    this.mediaItem = <MediaItem>{
      id: this.id,
      srcSafe: this.sanitizer.bypassSecurityTrustUrl(this.src),
      src: this.src,
      type: this.checkMediaType(this.src),
      file: file
    };
  }

  protected initialModal(): void {
    if (typeof bootstrap !== 'undefined') {
      const el: HTMLElement = document.getElementById('modalMedia' + this.id) as HTMLElement;
      this.modal = new bootstrap.Modal(el);
      el.addEventListener('hidden.bs.modal', () => this.modalMediaVideo?.nativeElement.load());
    }
  }

  protected initCropModal(): void {
    if (typeof bootstrap !== 'undefined') {
      const el: HTMLElement = document.getElementById('modalCrop' + this.id) as HTMLElement;
      this.cropModal = new bootstrap.Modal(el);
      el.addEventListener('hidden.bs.modal', () => this.modalMediaVideo?.nativeElement.load());
    }
  }

  protected checkMediaType(src: string | undefined): string {
    if (!src || typeof src === 'object' || typeof src === 'number' || !src.trim())
      return MEDIA_TYPE_CONST.IMG;

    const url: URL = new URL(src);
    const extension: string = url.pathname.split('.')[1];
    const type: string | undefined = this.types.get(extension);
    return type ? type : MEDIA_TYPE_CONST.IMG;
  }

  protected onRemoveMediaClicked(): void {
    this.confirmRemove ?
      this.notiflixService.confirmError(TITLE_CONST.DELETE, MSG_CONST.DELETE, () => this.removeMedia()) :
      this.removeMedia();
  }

  protected removeMedia(): void {
    this.mediaItem = <MediaItem>{ id: this.id };
    this.resetImage();
    this.fileChange.emit(this.mediaItem.file);
    this.result.emit({ isSuccess: true, data: 'REMOVE' });
  }

  protected onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      let size: number = file.size;
      let extension: string | undefined = file.name.split('.').pop();
      this.fileName = file.name;
      if (!extension || !this.types.get(extension) || !this.acceptedExtensions.includes(extension?.toLowerCase())) {
        event.target.value = '';
        return this.result.emit({ isSuccess: false, data: 'BROWSE', error: 'INVALID_FILE_TYPE' });
      }

      if (size > this.maxSize) {
        event.target.value = '';
        return this.result.emit({ isSuccess: false, data: 'BROWSE', error: 'INVALID_FILE_SIZE' });
      }
      let mediaItem: MediaItem = <MediaItem>{ id: this.id, file, type: this.types.get(extension?.toLowerCase()) };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        mediaItem.srcSafe = this.sanitizer.bypassSecurityTrustResourceUrl(e.target?.result?.toString() ?? '');
        mediaItem.src = e.target?.result?.toString() ?? '';
        this.mediaItem = mediaItem;
        this.fileChange.emit(mediaItem.file);
        this.result.emit({ isSuccess: true, data: 'BROWSE' });
      };
    }

    event.target.value = '';
  }

  protected calculateAcceptedExtensions(): void {
    let result: string = this.accept;

    if (!this.accept || !this.accept.trim())
      result += IMAGE_TYPES_CONST.map(type => `.${type}`).join(', ') + ', ' + VIDEO_TYPES_CONST.map(type => `.${type}`).join(', ');

    if (this.accept.includes('image/*'))
      result = result.replace('image/*', IMAGE_TYPES_CONST.map(type => `.${type}`).join(', '));

    if (this.accept.includes('video/*'))
      result = result.replace('video/*', VIDEO_TYPES_CONST.map(type => `.${type}`).join(', '));

    this.acceptedExtensions = result;
  }

  protected openModal() {
    if (typeof this.modal !== 'undefined' && this.preview && this.mediaItem && this.mediaItem.srcSafe && this.mediaItem.type) {
      this.previewSrcSafe = this.mediaItem.srcSafe;
      this.previewType = this.mediaItem.type;
      this.modal.show();
    }
  }

  protected copySrc() {
    navigator.clipboard.writeText(this.src);
    this.result.emit({ isSuccess: true, data: 'COPY' });
  }

  protected openCropModal() {
    if (typeof this.cropModal !== 'undefined' && this.crop && this.mediaItem && this.mediaItem.file && this.mediaItem.type) {
      this.cropImage = { ... this.mediaItem };
      this.cropModal.show();
    }
  };

  protected imageCropped(event: ImageCroppedEvent) {
    this.cropImage.src = event.base64 ?? '';
    this.cropImage.srcSafe = this.sanitizer.bypassSecurityTrustResourceUrl(event.base64 ?? '');
  }

  protected rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  protected rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  protected flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  protected flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  protected resetImage() {
    this.canvasRotation = 0;
    this.transform = {};
    this.rotation = 0;
    this.scale = 1;
    this.containWithinAspectRatio = false;
    this.fileName = '';
    this.maintainAspectRatio = false;
    this.aspectRatio = 0;
    this.textToCompare = 'false';
    this.updateCropper();
  }

  protected zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  protected zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  protected toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  protected updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  protected updateRatio() {
    this.maintainAspectRatio = this.aspectRatio > 0;
  }

  protected updateCropper() {
    if (this.textToCompare === 'true') {
      this.maintainAspectRatio = true;
      this.aspectRatio = 1;
      this.isRoundCropper = true;
    } else {
      this.maintainAspectRatio = false;
      this.isRoundCropper = false;
      this.aspectRatio = 0;
    }
  }

  protected async saveImage() {
    this.mediaItem.file = await this.urltoFile(this.cropImage.src as string, this.mediaItem.file.name, this.mediaItem.file.type);
    this.mediaItem.srcSafe = this.cropImage.srcSafe;
    this.fileChange.emit(this.mediaItem.file);
    this.result.emit({ isSuccess: true, data: 'CROP' });
    this.cropModal.hide();
  }

  protected async urltoFile(url: string, fileName: string, mimeType: string): Promise<File> {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    const res = await fetch(url, this.requestInit);
    const buf = await res.arrayBuffer();
    return new File([buf], fileName, { type: mimeType });
  }

  protected async urlToFile(url: string): Promise<File> {
    const res = await fetch(url, this.requestInit);
    const buf = await res.arrayBuffer();
    return new File([buf], 'fileName');
  }

  protected getMineType(extension: string): string {
    const isImage = IMAGE_TYPES_CONST.includes(extension?.toLowerCase());
    return `${isImage ? 'image' : 'video'}/${extension}`;
  }
}