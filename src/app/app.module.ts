import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { LoaderComponent } from 'app/components/loader/loader.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './home/home.module';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'app/interceptors/http-error.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoaderService } from 'app/services/loader.service';
import { LoaderInterceptor } from 'app/interceptors/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
      AppComponent,
      SignupComponent,
      NavbarComponent,
      FooterComponent,
      ProfileComponent,
      LoaderComponent,
      LoginComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        NgxDatatableModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3500
        }),
    ],
  providers: [
      LoaderService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
      },
      {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
