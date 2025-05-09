import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { MagnificPopupDirective } from './directives/magnific-popup.directive';
import { NiceSelectDirective } from './directives/nice-select.directive';
import { AnimationDirective } from './directives/animation.directive';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { CounterComponent } from './shared/counter/counter.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddClaimPageComponent } from './claim/pages/add-claim-page/add-claim-page.component';
import { MapComponent } from './claim/pages/map/map.component';
import { ImageEditorComponent } from './claim/pages/image-editor/image-editor.component';
import { ImageSliderComponent } from './claim/pages/image-slider/image-slider.component';
import { ClaimsPageComponent } from './claim/pages/claims-page/claims-page.component';
import { ClaimDetailsPageComponent } from './claim/pages/claim-details-page/claim-details-page.component';
import { ImageSliderV2Component } from './claim/pages/image-slider-v2/image-slider-v2.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailChangeDialogComponent } from './user/email-change-dialog/email-change-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { JobsComponent } from './hr/jobs/jobs.component';
import { JobComponent } from './hr/job/job.component';
import { CandidateComponent } from './hr/candidate/candidate.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { SharedModule } from './shared/shared.module';
import { InsuranceModule } from './insurances/insurance.module';
import { PaymentModule } from './payment/payment.module';

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
    ProfileComponent,
    EditProfileComponent,
    EmailChangeDialogComponent,
    ChangePasswordComponent,
    JobsComponent,
    JobComponent,
    CandidateComponent,
    CounterComponent,
    AddClaimPageComponent,
    MapComponent,
    ImageEditorComponent,
    ImageSliderComponent,
    ClaimsPageComponent,
    ClaimDetailsPageComponent,
    ImageSliderV2Component,
    CounterComponent,
    HomeFooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule, // Add RouterModule here
    AppRoutingModule, // Add the routing module here
    SlickCarouselModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InsuranceModule,
    PaymentModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
