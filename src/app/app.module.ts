import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImagesComponent } from './components/images/images.component';

import { HttpClientModule } from '@angular/common/http';
import { ImagesService } from './services/images.service';

import { ReactiveFormsModule } from '@angular/forms';
import { appRouting } from './app.routes';
import { ModalComponent } from './components/modal/modal.component';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    appRouting
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
