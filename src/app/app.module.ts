import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/helpers/token.interceptor';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { UserPlateComponent } from './components/user-plate/user-plate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserPlateComponent,
    AuthModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
