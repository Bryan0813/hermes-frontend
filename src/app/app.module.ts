import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {
  ActivityService,
  CategoryServiceService,
  PackageService,
  PermitsService,
  RolesService,
  ServiceService,
} from './shared/services/modules';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ReservationsFormComponent } from './shared/components/modules/reservations-form/reservations-form.component';

@NgModule({
  declarations: [AppComponent, ReservationsComponent, ReservationsFormComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
  ],

  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    PermitsService,
    CategoryServiceService,
    ServiceService,
    ActivityService,
    PackageService,
    RolesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
