import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import IMAGE_TYPES from '../../constants/image-type.constant';
import VIDEO_TYPES from '../../constants/video-type.constant';
import { MediaItem as MediaItem } from '../../models/media-item.model';
import { FunctionUtility } from '../../utilities/fucntion-utility';
import { OperationResult } from '../../utilities/operation-result';
declare var bootstrap: any;

@Component({
  selector: 'media-uploader',
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class MediaUploaderComponent implements OnInit {
  protected types: Map<string, string> = new Map();
  protected mediaItem: MediaItem = <MediaItem>{};
  protected acceptedExtensions: string = '';
  protected previewSrc: string = '';
  protected previewType: string = '';
  protected modal: any;

  @ViewChild('videoSrc') videoSrc: any;
  @Input() src: string = '';
  @Input() disabled: boolean = false;
  @Input() accept: string = 'image/*, video/*';
  @Input() maxSize: number = 999999999999999;
  @Input() preview: boolean = true;
  @Input() file!: File;
  @Output() fileChange: EventEmitter<File> = new EventEmitter();
  @Output() result: EventEmitter<OperationResult> = new EventEmitter();

  constructor(private fu: FunctionUtility) { }

  ngOnInit(): void {
    IMAGE_TYPES.forEach(type => this.types.set(type, 'img'));
    VIDEO_TYPES.forEach(type => this.types.set(type, 'video'));
    this.mediaItem.src = this.src;
    this.mediaItem.type = this.checkMediaType(this.src);
    this.initialModal();
    this.calculateAcceptedExtensions();

    console.log(this.videoSrc);
    
  }


  initialModal(): void {
    const el: HTMLElement = document.getElementById('media-uploader-modal') as HTMLElement;
    this.modal = new bootstrap.Modal(el);
    el.addEventListener('hidden.bs.modal', (event: any) => {
      // do something...
      console.log(event.target.childNodes);
    })
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
    this.mediaItem = <MediaItem>{};
    this.fileChange.emit(this.mediaItem.file);
    this.result.emit(<OperationResult>{ success: true, message: 'File removed' });
  }

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = event.target.files;
      for (let i = 0; i < files.length; i++) {
        let file: File = files[i];
        let size: number = file.size;
        let extension: string | undefined = file.name.split('.').pop();

        if (!extension || !this.types.get(extension) || !this.acceptedExtensions.includes(extension))
          return this.result.emit(<OperationResult>{ success: false, message: 'Invalid file type' });

        if (size > this.maxSize)
          return this.result.emit(<OperationResult>{ success: false, message: 'File size is too big' });

        let mediaItem: MediaItem = <MediaItem>{ id: this.fu.nextID(), file, type: this.types.get(extension) };
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          mediaItem.src = e.target?.result?.toString();
          this.mediaItem = mediaItem;
          this.fileChange.emit(mediaItem.file);
          this.result.emit(<OperationResult>{ success: true, message: 'File uploaded' });
        };
      }
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
    if (this.preview && this.mediaItem && this.mediaItem.src && this.mediaItem.type) {
      this.previewSrc = this.mediaItem.src;
      this.previewType = this.mediaItem.type;
      this.modal.show();
    }
  }
}
