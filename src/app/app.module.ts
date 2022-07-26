import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MediaUploaderComponent } from 'ngx-spa-utilities';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MediaUploaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
