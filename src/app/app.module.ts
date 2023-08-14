import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { P404Component } from './views/public/error/p404/p404.component';
import { DefaultLayoutComponent } from './shared/containers/default-layout/default-layout.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, P404Component, DefaultLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
