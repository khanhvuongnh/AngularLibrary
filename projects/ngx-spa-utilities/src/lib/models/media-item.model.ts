import { SafeResourceUrl } from "@angular/platform-browser";

export interface MediaItem {
  id?: string;
  src?: string | SafeResourceUrl;
  file: File;
  type?: string;
}