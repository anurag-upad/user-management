import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SortByDepttPipe } from './pipes/sort-by-deptt.pipe';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { UsersComponent } from './components/users/users.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoggingInterceptorService } from './services/logging-interceptor.service';
import { EmailvalidatorDirective } from './directives/emailvalidator.directive';
import { AuthComponent } from './components/auth/auth.component';
import { BgStyleDirective } from './directives/bg-style.directive';
import { InitialPaymentComponent } from './components/initial-payment/initial-payment.component';

@NgModule({
  declarations: [
    AppComponent, 
    SortByDepttPipe, 
    FilterByNamePipe, 
    UsersComponent, 
    UnauthorizedComponent,
    PageNotFoundComponent,
    EmailvalidatorDirective,
    AuthComponent,
    BgStyleDirective,
    InitialPaymentComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, //identifier
      useClass : AuthInterceptorService,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS, //identifier
      useClass : LoggingInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
