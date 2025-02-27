import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MagnificPopupDirective } from './directives/magnific-popup.directive';
import { NiceSelectDirective } from './directives/nice-select.directive';
import { AnimationDirective } from './directives/animation.directive';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { CounterComponent } from './shared/counter/counter.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { InsuranceModule } from './insurances/insurance.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MagnificPopupDirective,
    NiceSelectDirective,
    AnimationDirective,
    BackToTopComponent,
    CounterComponent,
    HomeFooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule, 
    AppRoutingModule, 
    SlickCarouselModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    InsuranceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }