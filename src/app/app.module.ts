import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostGridPageComponent } from './post-grid-page/post-grid-page.component';
import { PostCardComponent } from './components/post-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PostGridPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostCardComponent,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
