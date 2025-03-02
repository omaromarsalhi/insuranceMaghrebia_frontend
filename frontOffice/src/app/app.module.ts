import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PreloaderComponent } from './shared/ui/preloader/preloader.component';
import { MagnificPopupDirective } from './directives/magnific-popup.directive';
import { NiceSelectDirective } from './directives/nice-select.directive';
import { AnimationDirective } from './directives/animation.directive';
import { BackToTopComponent } from './shared/ui/back-to-top/back-to-top.component';
import { CounterComponent } from './shared/ui/counter/counter.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CamplaintComponent } from './camplaint/camplaint.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShowComplaintComponent } from './show-complaint/show-complaint.component';
import { ResponseComplaintComponent } from './response-complaint/response-complaint.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PreloaderComponent,
    MagnificPopupDirective,
    NiceSelectDirective,
    AnimationDirective,
    BackToTopComponent,
    CounterComponent,
    CamplaintComponent,
    ShowComplaintComponent,
    ResponseComplaintComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SlickCarouselModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
