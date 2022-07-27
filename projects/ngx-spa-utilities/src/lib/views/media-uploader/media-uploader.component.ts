import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import IMAGE_TYPES from '../../constants/image-type.constant';
import VIDEO_TYPES from '../../constants/video-type.constant';
import { MediaItem as MediaItem } from '../../models/media-item.model';
import { MessageConfig } from '../../models/message-config.model';
import { FunctionUtility } from '../../utilities/fucntion-utility';
import { OperationResult } from '../../utilities/operation-result';
declare var bootstrap: any;

@Component({
  selector: 'media-uploader',
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MediaUploaderComponent implements OnInit, AfterViewInit {
  protected types: Map<string, string> = new Map();
  protected mediaItem: MediaItem = <MediaItem>{};
  protected acceptedExtensions: string = '';
  protected previewSrc: string = '';
  protected previewType: string = '';
  protected modal: any;
  protected id: string = '';

  @ViewChild('modalMediaVideo') modalMediaVideo: ElementRef | undefined;
  @Input() src: string = '';
  @Input() disabled: boolean = false;
  @Input() accept: string = 'image/*, video/*';
  @Input() maxSize: number = 999999999999999;
  @Input() preview: boolean = true;
  @Input() file!: File;
  @Input() message: MessageConfig = {
    fileRemovedMsg: 'File removed',
    fileUploadedMsg: 'File uploaded',
    invalidFileSizeMsg: 'File size is too big',
    invalidFileTypeMsg: 'Invalid file type',
  };
  @Output() fileChange: EventEmitter<File> = new EventEmitter();
  @Output() result: EventEmitter<OperationResult> = new EventEmitter();

  constructor(protected fu: FunctionUtility) {
    this.id = fu.nextID();
  }

  ngOnInit(): void {
    IMAGE_TYPES.forEach(type => this.types.set(type, 'img'));
    VIDEO_TYPES.forEach(type => this.types.set(type, 'video'));
    this.mediaItem = <MediaItem>{
      id: this.id,
      src: this.src,
      type: this.checkMediaType(this.src)
    };
    this.calculateAcceptedExtensions();
  }

  ngAfterViewInit(): void {
    this.initialModal();
  }

  initialModal(): void {
    const el: HTMLElement = document.getElementById('modal-media-' + this.id) as HTMLElement;
    this.modal = new bootstrap.Modal(el);
    el.addEventListener('hidden.bs.modal', () => this.modalMediaVideo?.nativeElement.load());
  }

  checkMediaType(src: string | undefined): string {
    if (!src || typeof src === 'object' || typeof src === 'number' || !src.trim())
      return 'img';

    const url: URL = new URL(src);
    const extension: string = url.pathname.split('.')[1];
    const type: string | undefined = this.types.get(extension);
    return type ? type : 'img';
  }

  onRemoveMediaClicked(): void {
    this.mediaItem = <MediaItem>{ id: this.id };
    this.fileChange.emit(this.mediaItem.file);
    this.result.emit({ isSuccess: true, error: this.message.fileRemovedMsg });
  }

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      let size: number = file.size;
      let extension: string | undefined = file.name.split('.').pop();

      if (!extension || !this.types.get(extension) || !this.acceptedExtensions.includes(extension))
        return this.result.emit({ isSuccess: false, error: this.message.invalidFileTypeMsg });

      if (size > this.maxSize)
        return this.result.emit({ isSuccess: false, error: this.message.invalidFileSizeMsg });

      let mediaItem: MediaItem = <MediaItem>{ id: this.id, file, type: this.types.get(extension) };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        mediaItem.src = e.target?.result?.toString();
        this.mediaItem = mediaItem;
        this.fileChange.emit(mediaItem.file);
        this.result.emit({ isSuccess: true, error: this.message.fileUploadedMsg });
      };
    }

    event.target.value = '';
  }

  calculateAcceptedExtensions(): void {
    let result: string = this.accept;

    if (!this.accept || !this.accept.trim())
      result += IMAGE_TYPES.map(type => `.${type}`).join(', ') + ', ' + VIDEO_TYPES.map(type => `.${type}`).join(', ');

    if (this.accept.includes('image/*'))
      result = result.replace('image/*', IMAGE_TYPES.map(type => `.${type}`).join(', '));

    if (this.accept.includes('video/*'))
      result = result.replace('video/*', VIDEO_TYPES.map(type => `.${type}`).join(', '));

    this.acceptedExtensions = result;
  }

  openModal() {
    console.log(this.mediaItem);

    if (this.preview && this.mediaItem && this.mediaItem.src && this.mediaItem.type) {
      this.previewSrc = this.mediaItem.src;
      this.previewType = this.mediaItem.type;
      this.modal.show();
    }
  }
}
