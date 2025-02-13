import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component'; 
import { HomeComponent } from './home/home.component';
import { CustomCursorDirective } from './directives/custom-cursor.directive';
import { MainPageDirective } from './directives/main-page-directive.directive';
import { CheckoutAccordionDirective } from './directives/checkout-accordion.directive';
import { InsuranceProgressRangeDirective } from './directives/insurance-progress-range.directive';
import { DynamicYearDirective } from './directives/dynamic-year.directive';
import { CountBarDirective } from './directives/count-bar.directive';
import { CountBoxDirective } from './directives/count-box.directive';
import { FormValidatorDirective } from './directives/form-validate.directive';
import { InsuranceComponent } from './insurance/insurance.component';
import { StickyHeaderCloneDirective } from './directives/sticky-header-clone.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CustomCursorDirective,
    MainPageDirective,
    CheckoutAccordionDirective,
    InsuranceProgressRangeDirective,
    DynamicYearDirective,
    CountBarDirective,
    CountBoxDirective,
    FormValidatorDirective,
    InsuranceComponent,
    StickyHeaderCloneDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
