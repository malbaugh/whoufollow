
// ANGULAR
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from 'src/app/Services/Interceptors/error.interceptor';
import { JwtInterceptor } from 'src/app/Services/Interceptors/jwt.interceptor';
// Custom
import { AppComponent } from '../Components/app/app.component';
import { LandingComponent } from '../Components/landing/landing.component';
import { CurrentUserService } from '../Services/CurrentUser/current-user.service';
import { UsersService } from '../Services/Users/users.service';
import { AppRoutingModule } from './app-routing.module';
// MODULES
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },   
    CurrentUserService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
