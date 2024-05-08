import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostGridPageModule } from './post-grid-page/post-grid-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostGridPageModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
