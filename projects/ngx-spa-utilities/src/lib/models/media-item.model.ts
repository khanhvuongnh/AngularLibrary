import { SafeResourceUrl } from '@angular/platform-browser';

export interface MediaItem {
  id?: string;
  srcSafe?: SafeResourceUrl;
  file: File;
  blob?: Blob;
  type?: string;
  fileName?: string;
}
